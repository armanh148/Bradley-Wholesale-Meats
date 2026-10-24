import React, { useState } from 'react';
import { 
  Phone, 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Monitor, 
  Store,
  ChevronRight,
  Clock
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
      {/* Top Notification / Trust Bar */}
      <div className="bg-zinc-950 text-white text-xs py-2.5 px-4 border-b border-zinc-800">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-400 font-bold text-[11px] border border-red-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              York Region Central Hub
            </span>
            <span className="text-zinc-300 font-medium">
              445 Edgeley Blvd Unit 4, Concord, ON • Mon–Fri: 7:00 AM – 5:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <div className="flex items-center gap-1.5 text-amber-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-white">4.8</span>
              <span className="text-zinc-400 text-[11px] font-medium">(137 Google Reviews)</span>
            </div>
            <span className="hidden md:inline text-zinc-700">|</span>
            <a 
              href={`tel:${BUSINESS_INFO.cleanPhone}`} 
              className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-red-400 font-bold hover:underline transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>+1 905-669-7583</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-[#F4F4F5]/95 backdrop-blur-md border-b border-zinc-200/90 transition-all">
        <div className="site-container">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-4">
              <a 
                href="#home" 
                onClick={(e) => { 
                  if (currentView !== 'store') { 
                    e.preventDefault(); 
                    setCurrentView('store'); 
                  }
                }}
                className="group flex items-center gap-3.5 text-left focus:outline-none"
              >
                {/* Bold Red Icon Logo */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-600 via-red-600 to-red-700 flex items-center justify-center text-white shadow-xl shadow-red-600/30 group-hover:scale-105 transition-transform duration-200">
                  <span className="font-black text-2xl sm:text-3xl tracking-tighter">B</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-950 group-hover:text-red-600 transition-colors">
                      Bradley Wholesale
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] uppercase font-extrabold tracking-wider bg-zinc-200/90 text-zinc-800 rounded-md">
                      Meats
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>Concord, ON • Pure Halal Wholesale Butcher</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Center: Navigation Links */}
            {currentView === 'store' ? (
              <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
                <a 
                  href="#home" 
                  className="px-4 py-2 text-sm font-bold text-zinc-900 hover:text-red-600 rounded-xl hover:bg-zinc-200/60 transition-colors"
                >
                  Home
                </a>
                <a 
                  href="#catalog" 
                  className="px-4 py-2 text-sm font-bold text-zinc-700 hover:text-red-600 rounded-xl hover:bg-zinc-200/60 transition-colors"
                >
                  Wholesale Catalog
                </a>
                <a 
                  href="#custom-cuts" 
                  className="px-4 py-2 text-sm font-bold text-zinc-700 hover:text-red-600 rounded-xl hover:bg-zinc-200/60 transition-colors"
                >
                  Custom Cut Sheet
                </a>
                <a 
                  href="#delivery-zones" 
                  className="px-4 py-2 text-sm font-bold text-zinc-700 hover:text-red-600 rounded-xl hover:bg-zinc-200/60 transition-colors"
                >
                  Delivery Areas (GTA)
                </a>
                <a 
                  href="#contact" 
                  className="px-4 py-2 text-sm font-bold text-zinc-700 hover:text-red-600 rounded-xl hover:bg-zinc-200/60 transition-colors"
                >
                  Contact Us
                </a>
              </nav>
            ) : (
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-200/90 text-xs font-bold text-zinc-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Concord POS & Meat Invoicing Terminal Active</span>
              </div>
            )}

            {/* Right: Actions & View Switcher */}
            <div className="flex items-center gap-3">
              
              {/* Dual Mode Switcher Pill */}
              <div className="bg-zinc-200/90 p-1.5 rounded-2xl flex items-center shadow-inner border border-zinc-300/70">
                <button
                  type="button"
                  onClick={() => setCurrentView('store')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentView === 'store'
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  title="Switch to Customer Online Ordering Website"
                >
                  <Store className="w-3.5 h-3.5 text-red-600" />
                  <span className="hidden sm:inline">Storefront</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('pos')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentView === 'pos'
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  title="Switch to Wholesale Desktop POS & ERP Dashboard"
                >
                  <Monitor className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">Desktop POS</span>
                  <span className="sm:hidden">POS</span>
                </button>
              </div>

              {/* Direct Call Button (Desktop) */}
              <a
                href={`tel:${BUSINESS_INFO.cleanPhone}`}
                className="hidden xl:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-white text-zinc-900 border border-zinc-200 shadow-sm hover:border-red-600 hover:text-red-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>+1 905-669-7583</span>
              </a>

              {/* Search Button */}
              {currentView === 'store' && (
                <button 
                  type="button"
                  onClick={onSearchClick}
                  className="w-11 h-11 rounded-xl bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-900 transition-colors shadow-sm"
                  aria-label="Search Catalog"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              {/* Cart Button */}
              {currentView === 'store' && (
                <button 
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95"
                  aria-label="View Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-zinc-950 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-11 h-11 rounded-xl bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-6 pt-3 pb-6 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs text-zinc-500 font-medium">
              <span>Bradley Wholesale Meats • Concord, ON</span>
              <span className="text-emerald-600 font-bold">● Open Now (Dock 4)</span>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-bold">
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
                <span>Wholesale Catalog ($/Box & $/kg)</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#custom-cuts" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Chef Custom Cut Sheet</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#delivery-zones" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>GTA Delivery Schedule & Checker</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a 
                href="#contact" 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('store'); }}
                className="px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 flex items-center justify-between"
              >
                <span>Contact & Concord Hub Location</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.cleanPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md shadow-red-600/30"
              >
                <Phone className="w-4 h-4" />
                <span>Call Wholesale Desk: +1 905-669-7583</span>
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
                <span>Switch to {currentView === 'store' ? 'Wholesale POS & B2B Dashboard' : 'Storefront Website'}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
