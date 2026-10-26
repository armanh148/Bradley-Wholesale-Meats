import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Percent, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem,
  onClearCart,
  onCheckoutComplete 
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [restaurantName, setRestaurantName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [placedOrderRef, setPlacedOrderRef] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 350.00;

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    const rate = item.orderUnit === 'kg' ? item.pricePerKg : item.price;
    return acc + (rate * item.quantity);
  }, 0);

  // Volume discounts
  let discountPercent = 0;
  if (subtotal >= 2500) discountPercent = 0.15;
  else if (subtotal >= 1000) discountPercent = 0.10;
  else if (subtotal >= 500) discountPercent = 0.05;

  const discountAmount = subtotal * discountPercent;
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 35.00;
  const taxHST = 0.00; // 0% HST on wholesale fresh meat in Canada
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newRef = `ORD-BWM-${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrderRef(newRef);
    setCheckoutStep('success');

    if (onCheckoutComplete) {
      onCheckoutComplete({
        orderId: newRef,
        client: restaurantName || 'Concord Kitchen Customer',
        address: address || 'GTA Commercial Kitchen',
        phone: phone || '+1 905-669-7583',
        itemsCount: `${cartItems.length} items (${cartItems.reduce((a, b) => a + b.quantity, 0)} packages)`,
        totalAmount: `$${finalTotal.toFixed(2)} CAD`,
        items: cartItems,
        van: 'Reefer Van #1 (Concord / Vaughan)',
        temperature: '1.8°C',
        status: 'Staged in Cold Room (2°C)',
        timeEta: 'Morning Route (7:30 AM)',
        priority: 'Standard'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-zinc-900">
                  Wholesale Cart
                </h3>
                <div className="text-[11px] text-zinc-500 font-medium">
                  {cartItems.length} cuts / {cartItems.reduce((a, b) => a + b.quantity, 0)} units
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5 text-zinc-800">
                    <Truck className="w-3.5 h-3.5 text-red-600" />
                    <span>GTA Cold Freight Delivery:</span>
                  </span>
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-emerald-600 font-bold">FREE REEFER FREIGHT</span>
                  ) : (
                    <span className="text-zinc-600">
                      ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} away
                    </span>
                  )}
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Empty State */}
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-base text-zinc-800">Your wholesale cart is empty</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Browse our Concord wholesale inventory or select cuts from the pricing catalog to start an order.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs"
                >
                  Explore Wholesale Catalog
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              /* Item list */
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const rate = item.orderUnit === 'kg' ? item.pricePerKg : item.price;
                  const itemTotal = rate * item.quantity;

                  return (
                    <div 
                      key={item.id + (item.orderUnit || 'box')}
                      className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-start gap-3"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover bg-zinc-100 shrink-0 border border-zinc-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-bold text-xs text-zinc-900 truncate">
                            {item.name}
                          </h5>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-400 hover:text-red-600 transition-colors shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                          {item.orderUnit === 'kg' ? 'Per Kilogram' : item.unitWeight}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-zinc-700 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold font-mono px-1">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-zinc-700 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line total */}
                          <div className="text-right">
                            <span className="font-extrabold text-sm text-zinc-950 font-mono">
                              ${itemTotal.toFixed(2)}
                            </span>
                            <div className="text-[10px] text-zinc-400">
                              (${rate.toFixed(2)} / {item.orderUnit || 'box'})
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={onClearCart}
                  className="w-full py-2 text-center text-xs font-semibold text-zinc-400 hover:text-red-600 transition-colors"
                >
                  Empty Cart
                </button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              /* Checkout Form */
              <form id="cart-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 font-medium">
                  <strong>Commercial Wholesale Order:</strong> Orders are dispatched directly from 445 Edgeley Blvd Unit 4 in temperature-controlled reefer vans.
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Restaurant or Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Edgeley Bistro Concord"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Chef Marco"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Direct Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (905) 555-XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Delivery Address (GTA / York Region)</label>
                  <input
                    type="text"
                    required
                    placeholder="Unit / Street, Concord / Vaughan / Toronto"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Butcher & Dock Delivery Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Deliver to back kitchen loading dock before 9 AM"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="p-3 rounded-xl bg-zinc-100 text-zinc-600 text-[11px] space-y-1">
                  <div className="font-bold text-zinc-800">Wholesale Payment Terms:</div>
                  <div>• Existing Net-15 / Net-30 accounts billed automatically.</div>
                  <div>• New clients: Interac E-Transfer or Certified Cheque upon dock arrival.</div>
                </div>
              </form>
            ) : (
              /* Success Step */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-extrabold text-xl text-zinc-950">Wholesale Order Transmitted!</h4>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Reference Code: <strong className="font-mono text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">{placedOrderRef}</strong>.
                  Your order is now registered in our Concord Cold Room dispatch queue.
                </p>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-1.5">
                  <div className="font-bold text-zinc-900">Next Steps:</div>
                  <div>1. Cutting room assigns master butcher to inspect cuts.</div>
                  <div>2. Cold chain packaging sealed at 1.8°C.</div>
                  <div>3. Driver contacts {phone || '+1 905-669-7583'} prior to arrival.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-zinc-900 text-white font-bold text-xs"
                >
                  Return to Storefront
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer with Financials */}
          {cartItems.length > 0 && checkoutStep !== 'success' && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Wholesale Subtotal:</span>
                  <span className="font-mono font-medium text-zinc-900">${subtotal.toFixed(2)} CAD</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Volume Discount ({Math.round(discountPercent * 100)}%):</span>
                    <span>-${discountAmount.toFixed(2)} CAD</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GTA Cold Reefer Delivery:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${deliveryFee.toFixed(2)} CAD`}</span>
                </div>

                <div className="flex justify-between">
                  <span>HST (0% Raw Meat Wholesale):</span>
                  <span>$0.00 CAD (Tax Exempt)</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total Order CAD:</span>
                  <span className="font-mono text-red-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Dispatch Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-bold text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="cart-checkout-form"
                    className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Transmit Commercial Order (${finalTotal.toFixed(2)})</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
