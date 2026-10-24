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
    <section id="home" className="relative pt-10 sm:pt-14 pb-28 md:pb-40 lg:pb-52 overflow-hidden">
      {/* Background Subtle Gradient Blobs for 1600px Dribbble aesthetics */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[520px] bg-gradient-to-tr from-red-100/40 via-zinc-200/50 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-16 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-zinc-300/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Hero Column: Headings & Dual CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-9 text-center lg:text-left pt-2">
            
            {/* Top Small Label Pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-zinc-200/90 shadow-sm text-xs sm:text-sm font-bold text-zinc-900">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-red-600 font-extrabold uppercase tracking-wider text-[11px] sm:text-xs">
                Pure Halal
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-800 font-semibold">
                Farm Fresh Wholesale in York Region
              </span>
            </div>

            {/* Main Heading (Expansive Dribbble-tier styling) */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-zinc-950 leading-[1.03]">
                Next Generation.{' '}
                <span className="block lg:inline text-zinc-950 underline decoration-red-600 decoration-wavy decoration-from-font underline-offset-8">
                  Wholesale Meat.
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-lg sm:text-xl lg:text-2xl text-zinc-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience ethically raised, hand-cut halal meat curated for modern households, commercial kitchens, and premier restaurants across Concord & the Greater Toronto Area.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              {/* 1. Primary Red Button with slight hover glow & shadow */}
              <button
                type="button"
                onClick={onShopClick}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-9 py-4.5 rounded-2xl bg-red-600 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-red-600/35 hover:bg-red-700 hover:shadow-2xl hover:shadow-red-600/45 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
              >
                <span>Shop Wholesale Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* 2. Secondary Outline Button */}
              <button
                type="button"
                onClick={onCustomCutClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-white text-zinc-900 border-2 border-zinc-200 font-extrabold text-base sm:text-lg shadow-sm hover:border-zinc-900 hover:bg-zinc-50 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
              >
                <Scissors className="w-5 h-5 text-red-600" />
                <span>Request Custom Cut</span>
              </button>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-zinc-200/90 max-w-2xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 border border-amber-500/20">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="font-black text-base text-zinc-950">4.8 / 5.0</div>
                  <div className="text-xs text-zinc-500 font-medium">137 Google Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-black text-base text-zinc-950">100% Halal</div>
                  <div className="text-xs text-zinc-500 font-medium">Hand-Slaughtered Cert</div>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/20">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-black text-base text-zinc-950">Daily GTA Cold</div>
                  <div className="text-xs text-zinc-500 font-medium">Reefer 1.8°C Fleet</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Professional Butcher Visual & Floating Badges (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Clean White Framing Card with Soft Shadows */}
              <div className="relative rounded-[2.5rem] overflow-hidden bg-white p-3.5 shadow-2xl shadow-zinc-300/70 border border-zinc-200">
                <div className="relative h-[480px] sm:h-[540px] xl:h-[580px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-950">
                  
                  {/* Master Butcher / Chef Cutout Portrait */}
                  <img 
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85" 
                    alt="Bradley Wholesale Meats Master Butcher in White Jacket & Apron inspecting fresh cut of meat with knife"
                    className="w-full h-full object-cover object-top opacity-95 hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay for Clean Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Bottom Text inside the photo frame */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider font-extrabold text-red-400">
                          Master Butcher Cut
                        </span>
                        <h4 className="font-extrabold text-xl text-white mt-0.5">
                          Hand-Trimmed Ontario Halal Meats
                        </h4>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                        Daily Fresh
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Badge 1: Location Card Floating on the Right */}
              {/* "445 Edgeley Blvd Unit 4, Concord, ON" with small map pin icon & "Closest Distribution Hub" */}
              <div className="absolute -top-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-zinc-200/90 max-w-[310px] animate-fade-in hover:scale-102 transition-transform">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/35">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
                      Closest Distribution Hub
                    </div>
                    <div className="font-extrabold text-base text-zinc-950 leading-snug mt-0.5">
                      445 Edgeley Blvd Unit 4
                    </div>
                    <div className="text-xs text-zinc-500 font-medium">
                      Concord, ON L4K 4G1
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-bold">● Open Mon–Fri 7AM</span>
                      <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="text-zinc-800 hover:text-red-600 font-extrabold underline">
                        Call Hub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Temperature & Cold Chain Seal */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-zinc-950 text-white rounded-3xl p-4.5 shadow-2xl border border-zinc-800 max-w-[260px] hidden sm:block">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <ThermometerSnowflake className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Cold-Chain Monitored</div>
                    <div className="font-black text-base text-white font-mono">1.8°C Guaranteed</div>
                    <div className="text-xs text-zinc-400">Vacuum Sealed Fresh</div>
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
