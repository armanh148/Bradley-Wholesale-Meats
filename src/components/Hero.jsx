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
    <section id="home" className="relative pt-6 sm:pt-8 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Ambient Glows & Mesh Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[500px] bg-gradient-to-b from-red-500/10 via-zinc-200/30 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-[320px] h-[320px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Hero Column: Headings & Dual CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Top Small Label Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm text-xs font-semibold text-zinc-900 transition-all hover:border-red-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-red-600 font-black uppercase tracking-wider text-[10px] sm:text-[11px]">
                Pure Halal
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-700 font-medium text-[11px] sm:text-xs">
                Concord Cold Distribution Hub (445 Edgeley Blvd)
              </span>
            </div>

            {/* Main Heading with Balanced Normal Typography */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight text-zinc-950 leading-[1.12]">
                Next Generation.{' '}
                <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                  Wholesale Meat.
                </span>
              </h1>
            </div>

            {/* Editorial Subtext */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Ethically raised, 100% hand-slaughtered halal meats. Master cases and custom fabricated cuts curated for executive chefs, commercial catering kitchens, and discerning households across Concord & the Greater Toronto Area.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              {/* Primary Shimmer Red Button */}
              <button
                type="button"
                onClick={onShopClick}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white font-bold text-sm sm:text-base shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Shop Wholesale Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Frosted Outline Button */}
              <button
                type="button"
                onClick={onCustomCutClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/95 backdrop-blur-md text-zinc-900 border border-zinc-300 font-bold text-sm sm:text-base shadow-sm hover:border-zinc-900 hover:bg-zinc-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Scissors className="w-4 h-4 text-red-600" />
                <span>Chef Custom Cut Sheet</span>
              </button>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-zinc-200/80 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm p-2.5 rounded-xl border border-zinc-200/70 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="font-black text-sm text-zinc-950">4.8 / 5.0</div>
                  <div className="text-[11px] text-zinc-500 font-medium">137 Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm p-2.5 rounded-xl border border-zinc-200/70 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-black text-sm text-zinc-950">100% Halal</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Hand-Cut Slaughter</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1 bg-white/70 backdrop-blur-sm p-2.5 rounded-xl border border-zinc-200/70 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/20">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-black text-sm text-zinc-950">Daily GTA Fleet</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Reefer 1.8°C Monitored</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Professional Butcher Visual & Floating Badges (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Backlight Glow for Depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/15 via-transparent to-amber-500/15 rounded-3xl blur-xl transform scale-105 pointer-events-none" />

              {/* Full-Cover Framing Card (Image covers the entire frame edge-to-edge) */}
              <div className="relative h-[380px] sm:h-[430px] xl:h-[460px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.14)] border-2 border-white ring-1 ring-zinc-200/80 group bg-zinc-950">
                
                {/* Master Butcher Portrait covering the entire frame */}
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85" 
                  alt="Bradley Wholesale Meats Master Butcher in White Jacket & Apron inspecting fresh cut of meat with knife"
                  className="w-full h-full object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Cinematic Gradient Overlays for High Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

                {/* In-Frame Status Badges (Positioned cleanly without badge collision) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10 pointer-events-none">
                  {/* Left spacer so the floating 1.8°C cold badge doesn't cover text on larger screens */}
                  <div className="hidden sm:block w-[180px] shrink-0" />

                  {/* Right Master Butcher Badge */}
                  <div className="text-right ml-auto bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-lg">
                    <span className="text-[10px] uppercase tracking-wider font-black text-red-400 block">
                      Master Butcher Cut
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-white mt-0.5">
                      Hand-Trimmed Halal
                    </h4>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-[9px] font-black text-emerald-300 uppercase tracking-wider">
                      Daily Fresh
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Location Card Floating on Top-Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-zinc-200/90 max-w-[260px] animate-float transition-all hover:scale-105">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-red-600">
                      Concord Distribution Hub
                    </div>
                    <div className="font-black text-xs text-zinc-950 leading-snug mt-0.5">
                      445 Edgeley Blvd Unit 4
                    </div>
                    <div className="text-[11px] text-zinc-500 font-medium">
                      Concord, ON L4K 4G1
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Dock Open Mon–Fri
                      </span>
                      <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="text-zinc-900 hover:text-red-600 font-black underline ml-2">
                        Call Hub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Temperature & Cold Chain Seal on Bottom-Left */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-zinc-950/95 backdrop-blur-xl text-white rounded-2xl p-3 shadow-xl border border-zinc-800 max-w-[220px] hidden sm:block transition-all hover:scale-105">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <ThermometerSnowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">Cold-Chain Monitored</div>
                    <div className="font-black text-sm text-white font-mono text-cyan-300">1.8°C Guaranteed</div>
                    <div className="text-[10px] text-zinc-400">Cryovac Sealed Fresh</div>
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
