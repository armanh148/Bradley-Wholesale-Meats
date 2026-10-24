import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Monitor, 
  Store,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export function Header({ 
  currentView, 
  setCurrentView, 
  cartCount, 
  setIsCartOpen,
  onSearchClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Sleek Minimal Top Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-[11px] sm:text-xs py-2 px-4 border-b border-zinc-800">
        <div className="site-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-semibold text-white">Pure Halal Wholesale Meat</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline">445 Edgeley Blvd Unit 4, Concord, ON</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400 hidden md:inline">Open Mon–Fri: 7AM – 5PM</span>
            <a 
              href={`tel:${BUSINESS_INFO.cleanPhone}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-red-400 font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span>+1 905-669-7583</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Dribbble Ultra-Clean Header */}
      <header className="sticky top-0 z-40 bg-[#F4F4F5]/90 backdrop-blur-xl border-b border-zinc-200/80 transition-all">
        <div className="site-container">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Brand Logo (Letter 'B' + "Bradley Wholesale") */}
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href="#home"
                onClick={(e) => {
                  if (currentView !== 'store') {
                    e.preventDefault();
                    setCurrentView('store');
                  }
                }}
                className="group flex items-center gap-3 focus:outline-none"
              >
                {/* Bold Red Icon Logo */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
                  <span className="font-black text-2xl tracking-tighter">B</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-950 group-hover:text-red-600 transition-colors">
                    Bradley Wholesale
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-zinc-200 text-zinc-700 rounded-md">
                    Meats
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Clean Navigation Links (Home, Products, Wholesale Pricing, Delivery, Contact Us) */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/70 shadow-sm">
              <a 
                href="#home" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-sm font-semibold text-zinc-900 hover:text-red-600 rounded-full hover:bg-zinc-100 transition-colors"
              >
                Home
              </a>
              <a 
                href="#catalog" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 rounded-full hover:bg-zinc-100 transition-colors"
              >
                Products
              </a>
              <a 
                href="#catalog" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 rounded-full hover:bg-zinc-100 transition-colors"
              >
                Wholesale Pricing
              </a>
              <a 
                href="#delivery-zones" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 rounded-full hover:bg-zinc-100 transition-colors"
              >
                Delivery
              </a>
              <a 
                href="#contact" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 rounded-full hover:bg-zinc-100 transition-colors"
              >
                Contact Us
              </a>
            </nav>

            {/* Right: Action Icons (Search, Cart with item badge, B2B Portal, Hamburger) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Search Icon */}
              <button 
                type="button"
                onClick={onSearchClick}
                className="w-10 h-10 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-all shadow-sm hover:text-zinc-950"
                aria-label="Search Catalog"
                title="Search Meat Catalog"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Cart Icon with Item Badge */}
              <button 
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 flex items-center justify-center transition-all shadow-sm hover:text-zinc-950 active:scale-95"
                aria-label="View Cart"
                title="View Wholesale Cart"
              >
                <ShoppingBag className="w-4 h-4 text-zinc-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* B2B Desktop Switch Pill */}
              <button
                type="button"
                onClick={() => setCurrentView(currentView === 'store' ? 'pos' : 'store')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm border ${
                  currentView === 'pos'
                    ? 'bg-zinc-950 text-white border-zinc-900 shadow-zinc-950/20'
                    : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                }`}
                title="Toggle Storefront / B2B Desktop POS Terminal"
              >
                <Monitor className={`w-3.5 h-3.5 ${currentView === 'pos' ? 'text-red-500' : 'text-zinc-600'}`} />
                <span>{currentView === 'pos' ? 'Storefront' : 'B2B POS'}</span>
              </button>

              {/* Mobile Menu Hamburger Icon */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-100 transition-colors shadow-sm"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-6 pt-4 pb-6 space-y-3 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs text-zinc-500 font-medium">
              <span>Bradley Wholesale Meats</span>
              <span className="text-emerald-600 font-bold">● Concord Dock 4 Open</span>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-semibold">
              <a 
                href="#home" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#catalog" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Products</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#catalog" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Wholesale Pricing</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#delivery-zones" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Delivery</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#contact" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.cleanPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md shadow-red-600/30"
              >
                <Phone className="w-4 h-4" />
                <span>Call Desk: +1 905-669-7583</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setCurrentView(currentView === 'store' ? 'pos' : 'store');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Monitor className="w-3.5 h-3.5 text-red-500" />
                <span>Switch to {currentView === 'store' ? 'B2B Desktop POS' : 'Storefront Website'}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
