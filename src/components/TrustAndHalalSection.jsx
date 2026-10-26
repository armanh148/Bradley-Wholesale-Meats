import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  CheckCircle2, 
  Building2, 
  ChefHat, 
  Quote,
  Sparkles,
  Percent
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export function TrustAndHalalSection() {
  const testimonials = [
    {
      quote: "Bradley Wholesale has been our primary meat purveyor in Concord for over 4 years. Their ribeye marbling is consistent, the hand-trimming saves our prep cooks 10 hours a week, and delivery is never late.",
      author: "Chef Marco Rossi",
      role: "Executive Chef, Edgeley Prime Steakhouse",
      rating: 5,
      location: "Concord, ON"
    },
    {
      quote: "Finding true 100% hand-cut halal meat with genuine wholesale master box pricing in York Region was tough until we connected with Bradley. Their lamb frenched cutlets are the gold standard.",
      author: "Tariq Mansoor",
      role: "Owner & Operator, Richmond Hill Halal Bistro",
      rating: 5,
      location: "Richmond Hill, ON"
    },
    {
      quote: "The custom cut sheet is a game changer for our catering menus. Whether we need 200kg of 1.5-inch bone-in cuts or specific vacuum skin packing, the quality is top tier.",
      author: "Gianluigi V.",
      role: "Culinary Director, Vaughan Hospitality Group",
      rating: 5,
      location: "Vaughan, ON"
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-zinc-200/90 relative overflow-hidden">
      <div className="site-container">
        
        {/* Rating Hero Banner */}
        <div className="bg-gradient-to-br from-zinc-950 via-[#111116] to-zinc-950 rounded-[2.5rem] p-8 sm:p-14 text-white relative overflow-hidden mb-16 shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-zinc-800">
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider">
                <Star className="w-4 h-4 fill-red-400" />
                <span>Highest Rated Wholesale Butcher in Concord</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                4.8 Out of 5.0 Stars Across 137 Google Reviews
              </h3>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Trusted by Greater Toronto Area executive chefs, banquet halls, boutique butcher shops, and households who demand uncompromising halal integrity and pristine butchery.
              </p>

              <div className="pt-2 flex flex-wrap gap-5 text-xs sm:text-sm font-bold text-zinc-300">
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  100% Hand-Slaughtered Halal
                </span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  HACCP & CFIA Inspected
                </span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Air-Chilled Ontario Poultry
                </span>
              </div>
            </div>

            {/* Right Big Score Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 border border-white/15 text-center max-w-md w-full shadow-2xl">
                <div className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tight">
                  4.8<span className="text-red-500 text-4xl">/5</span>
                </div>
                <div className="flex justify-center gap-1.5 text-amber-400 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]" />
                  ))}
                </div>
                <div className="text-xs sm:text-sm font-black text-zinc-200 uppercase tracking-wider">
                  137 Verified Google Reviews
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-semibold">
                  Facility: 445 Edgeley Blvd Unit 4, Concord, ON
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-16">
          <div className="p-7 rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-13 h-13 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg text-zinc-950">Pure Halal Certified</h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Every carcass is certified hand-slaughtered in accordance with strict halal criteria. Zero machine slaughtering or stunning compromises.
            </p>
          </div>

          <div className="p-7 rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-13 h-13 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-3">
              <Percent className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg text-zinc-950">Wholesale Volume Tiers</h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Save up to 15% on bulk master boxes and pallet-level orders. Net-15 and Net-30 credit terms available for qualified GTA restaurants.
            </p>
          </div>

          <div className="p-7 rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-13 h-13 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-3">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg text-zinc-950">Ontario Pasture Raised</h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Direct farm partnerships across Ontario and Western Canada ensure ethical animal husbandry, superior marbling, and zero added hormones.
            </p>
          </div>

          <div className="p-7 rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-13 h-13 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-3">
              <ChefHat className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg text-zinc-950">Bespoke Kitchen Trimming</h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Exact portion cutting, bone frenching, vacuum skin packaging, and personalized kitchen labeling tailored to your menu cost targets.
            </p>
          </div>
        </div>

        {/* Real Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white p-7 sm:p-8 rounded-[2rem] border border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 italic leading-relaxed mb-6 font-medium">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <div className="font-black text-xs sm:text-sm text-zinc-950">{t.author}</div>
                <div className="text-xs text-zinc-500 font-semibold">{t.role} • {t.location}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
