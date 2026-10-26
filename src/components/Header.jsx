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
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-300 text-[11px] sm:text-xs py-2.5 px-4 border-b border-zinc-800/80">
        <div className="site-container flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white tracking-wide">Pure 100% Hand-Cut Halal</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline">Concord Cold Distribution Hub (445 Edgeley Blvd)</span>
            <span className="text-zinc-600 hidden md:inline">•</span>
            <span className="text-amber-400/90 font-medium hidden md:inline">CFIA & HACCP Inspected</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400 hidden lg:inline">Mon–Fri: 7:00 AM – 5:00 PM EST</span>
            <a 
              href={`tel:${BUSINESS_INFO.cleanPhone}`}
              className="inline-flex items-center gap-2 text-white hover:text-red-400 font-bold transition-all group"
            >
              <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-2.5 h-2.5" />
              </span>
              <span className="tracking-wide">+1 905-669-7583</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Frosted Glass Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-zinc-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
        <div className="site-container">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* Left: Brand Logo (Letter 'B' + "Bradley Wholesale") */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a 
                href="#home"
                onClick={(e) => {
                  if (currentView !== 'store') {
                    e.preventDefault();
                    setCurrentView('store');
                  }
                }}
                className="group flex items-center gap-2 sm:gap-3 focus:outline-none"
              >
                {/* 3D-Styled Crimson Emblem Logo */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 ring-1 ring-white/30 group-hover:scale-105 transition-all shrink-0">
                  <span className="font-black text-lg sm:text-2xl tracking-tighter text-white drop-shadow-sm">B</span>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-black text-sm sm:text-xl md:text-2xl tracking-tight text-zinc-950 group-hover:text-red-600 transition-colors whitespace-nowrap">
                      Bradley Wholesale
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-extrabold tracking-wider bg-red-50 text-red-700 border border-red-200/60 rounded-md">
                      Meats
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase -mt-0.5 hidden sm:block">
                    Halal Purveyors • York Region
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Clean Floating Pill Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/80 backdrop-blur-md p-1.5 rounded-full border border-zinc-200/80 shadow-inner">
              <a 
                href="#home" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-xs font-bold text-zinc-900 hover:text-red-600 rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                Home
              </a>
              <a 
                href="#catalog" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-red-600 rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                Wholesale Catalog
              </a>
              <a 
                href="#custom-cuts" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-red-600 rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                Chef Cut Sheet
              </a>
              <a 
                href="#delivery-zones" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-red-600 rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                Delivery Fleet
              </a>
              <a 
                href="#contact" 
                onClick={() => { if (currentView !== 'store') setCurrentView('store'); }}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-red-600 rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                Concord Hub
              </a>
            </nav>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Search Icon */}
              <button 
                type="button"
                onClick={onSearchClick}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
                aria-label="Search Catalog"
                title="Search Meat Catalog"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Cart Button with Counter */}
              <button 
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative h-8 sm:h-10 px-2 sm:px-3.5 rounded-xl sm:rounded-2xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs active:scale-95 group"
                aria-label="View Cart"
                title="View Wholesale Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-800 group-hover:text-red-600 transition-colors" />
                <span className="text-xs font-black tracking-tight hidden sm:inline">Order</span>
                {cartCount > 0 ? (
                  <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-black min-w-[18px] h-4.5 sm:min-w-[20px] sm:h-5 px-1 sm:px-1.5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                ) : (
                  <span className="text-[11px] text-zinc-400 font-bold hidden sm:inline">0</span>
                )}
              </button>

              {/* B2B Desktop Switch Button */}
              <button
                type="button"
                onClick={() => setCurrentView(currentView === 'store' ? 'pos' : 'store')}
                className={`hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all shadow-sm border active:scale-95 ${
                  currentView === 'pos'
                    ? 'bg-zinc-950 text-white border-zinc-900 shadow-zinc-950/25 ring-2 ring-red-500/30'
                    : 'bg-zinc-900 hover:bg-zinc-950 text-white border-zinc-800 shadow-sm'
                }`}
                title="Toggle Storefront / B2B Desktop POS Terminal"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <Monitor className={`w-3.5 h-3.5 ${currentView === 'pos' ? 'text-red-400' : 'text-zinc-300'}`} />
                <span>{currentView === 'pos' ? 'Storefront' : 'B2B POS'}</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-200 transition-all shadow-xs"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
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
