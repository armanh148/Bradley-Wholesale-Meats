import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Flame, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  Truck, 
  ThermometerSnowflake,
  Scissors
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export function Hero({ onShopClick, onCustomCutClick }) {
  return (
    <section id="home" className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-red-600/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtext, CTAs, Proof */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-xs text-xs font-semibold text-zinc-900 transition-all hover:border-red-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-red-600 font-extrabold uppercase tracking-wider text-[11px]">
                100% Hand-Slaughtered Halal
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-600 font-medium text-[11px] sm:text-xs">
                Concord Distribution Hub (445 Edgeley Blvd)
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 leading-[1.12]">
                Next Generation.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                  Wholesale Meat.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Ethically raised, hand-slaughtered halal meats. Master cases and custom fabricated cuts curated for executive chefs, commercial catering kitchens, and discerning households across Concord & the Greater Toronto Area.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={onShopClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-sm sm:text-base shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Shop Wholesale Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onCustomCutClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 hover:border-zinc-900 font-bold text-sm sm:text-base shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Scissors className="w-4 h-4 text-red-600" />
                <span>Chef Custom Cut Sheet</span>
              </button>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-zinc-200/80 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="font-black text-sm text-zinc-950">4.8 / 5.0</div>
                  <div className="text-[11px] text-zinc-500 font-medium">137 Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-black text-sm text-zinc-950">100% Halal</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Hand-Cut Certified</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/20">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-black text-sm text-zinc-950">Daily GTA Fleet</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Reefer 1.8°C Monitored</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Premium Butcher Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 bg-zinc-950 h-[380px] sm:h-[420px] lg:h-[460px] group">
              
              {/* Premium Fresh Meat / Butcher Photo without blocking lamps */}
              <img 
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=85" 
                alt="Fresh prime halal wholesale meat cuts on butcher block"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* High Contrast Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />

              {/* Top Card Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-2 text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Concord Hub Live Dock</span>
                </div>

                <div className="bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-lg">
                  Ontario Grade AAA
                </div>
              </div>

              {/* Bottom Card Content Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md rounded-xl p-3.5 border border-white/15 text-white shadow-xl pointer-events-none">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block">
                      Master Butcher Selection
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-white mt-0.5">
                      Hand-Trimmed Halal Meats
                    </h3>
                    <p className="text-[11px] text-zinc-300 mt-0.5">
                      Cryovac sealed • 1.8°C Cold-Chain Guaranteed
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                      Daily Fresh
                    </span>
                    <div className="text-[10px] text-zinc-400 mt-1">GTA Delivery</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
