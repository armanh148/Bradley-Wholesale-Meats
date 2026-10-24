import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FloatingProductCards } from './components/FloatingProductCards';
import { WholesaleCatalog } from './components/WholesaleCatalog';
import { CustomCutSheet } from './components/CustomCutSheet';
import { DeliveryMapSection } from './components/DeliveryMapSection';
import { TrustAndHalalSection } from './components/TrustAndHalalSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { DesktopDashboard } from './components/dashboard/DesktopDashboard';
import { 
  INITIAL_INVOICES, 
  INITIAL_ACTIVE_ORDERS, 
  FEATURED_HERO_PRODUCTS 
} from './data/mockData';

export function App() {
  // Navigation view: 'store' or 'pos'
  const [currentView, setCurrentView] = useState('store');

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      ...FEATURED_HERO_PRODUCTS[0],
      quantity: 1,
      orderUnit: 'box'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Custom cut sheet pre-selection
  const [preSelectedCut, setPreSelectedCut] = useState(null);

  // B2B ERP States (shared between POS & Online Store)
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [activeOrders, setActiveOrders] = useState(INITIAL_ACTIVE_ORDERS);

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && (item.orderUnit || 'box') === (product.orderUnit || 'box')
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += (product.quantity || 1);
        return updated;
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1, orderUnit: product.orderUnit || 'box' }];
      }
    });
  };

  const handleUpdateQty = (itemId, newQty) => {
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // When customer completes checkout online, automatically stage in activeOrders for the Concord dispatch crew!
  const handleCheckoutComplete = (newOrder) => {
    setActiveOrders(prev => [newOrder, ...prev]);
  };

  // When POS invoice is saved
  const handleSaveInvoice = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
  };

  // When cashier/accountant records payment
  const handleRecordPayment = (invoiceId, paymentData) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'Paid',
          paymentMethod: paymentData.method,
          paidAt: paymentData.paidAt
        };
      }
      return inv;
    }));
  };

  // When order status is updated in tracker
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setActiveOrders(prev => prev.map(order => 
      order.orderId === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Total cart count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If user is in Desktop POS mode, show the full Electron-style B2B dashboard
  if (currentView === 'pos') {
    return (
      <DesktopDashboard
        onReturnToStore={() => setCurrentView('store')}
        invoices={invoices}
        onSaveInvoice={handleSaveInvoice}
        onRecordPayment={handleRecordPayment}
        activeOrders={activeOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDispatchOrder={(order) => setActiveOrders(prev => [order, ...prev])}
      />
    );
  }

  // Customer Online Ordering Website (PART 1)
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#18181B] selection:bg-red-500 selection:text-white">
      
      {/* Header & Navigation Bar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        onSearchClick={() => {
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onShopClick={() => {
            const catalogEl = document.getElementById('catalog');
            if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomCutClick={() => {
            const cutSheetEl = document.getElementById('custom-cuts');
            if (cutSheetEl) cutSheetEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Bottom Floating Product Cards (3 Cards overlapping Hero) */}
        <FloatingProductCards
          onAddToCart={handleAddToCart}
          onProductClick={(product) => setQuickViewProduct(product)}
        />

        {/* Wholesale Meat Catalog (Interactive Weight-based Pricing Grid) */}
        <WholesaleCatalog
          onAddToCart={handleAddToCart}
          onProductClick={(product) => setQuickViewProduct(product)}
          onCustomCutSelect={(product) => {
            setPreSelectedCut(product);
            const cutSheetEl = document.getElementById('custom-cuts');
            if (cutSheetEl) cutSheetEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Custom Cut Specification Form for Chefs */}
        <CustomCutSheet
          preSelectedProduct={preSelectedCut}
          onSubmitSuccess={(ticket) => {
            // Also stage cut ticket into active orders for demonstration
            setActiveOrders(prev => [{
              orderId: ticket.refCode,
              client: ticket.restaurantName,
              address: 'Concord / GTA Kitchen (Custom Cut Spec)',
              itemsCount: `Custom ${ticket.primal} (${ticket.weight})`,
              totalAmount: `$${ticket.total.toFixed(2)} CAD`,
              van: 'Reefer Van #1 (Concord)',
              driver: 'Dave Morrison (+1 905-555-8812)',
              temperature: '1.4°C',
              status: 'Cutting Room (Prep)',
              timeEta: 'Butcher Station 2 - Custom Fabricate',
              priority: 'High',
              cutSpecs: `${ticket.thickness} • ${ticket.trim} • ${ticket.packaging}`
            }, ...prev]);
          }}
        />

        {/* York Region & GTA Delivery Map & Postal Checker */}
        <DeliveryMapSection />

        {/* Pure Halal Standards, 4.8 Rating Proof & Testimonials */}
        <TrustAndHalalSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={(id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onCustomizeCut={(product) => {
            setPreSelectedCut(product);
            const cutSheetEl = document.getElementById('custom-cuts');
            if (cutSheetEl) cutSheetEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Floating B2B Switcher Widget in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setCurrentView('pos')}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-950 text-white border border-zinc-700 shadow-2xl hover:bg-zinc-900 hover:border-red-500 hover:scale-105 active:scale-95 transition-all text-xs font-bold"
          title="Open Wholesale POS & B2B Dashboard (PART 2)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          <span>Open Concord B2B POS & Invoicing</span>
          <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-[10px] font-mono px-1.5 py-0.5 rounded">
            ERP
          </span>
        </button>
      </div>

    </div>
  );
}

export default App;
