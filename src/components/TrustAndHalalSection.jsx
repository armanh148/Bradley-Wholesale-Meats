import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  CheckCircle2, 
  Building2, 
  ChefHat, 
  Quote,
  Sparkles,
  Percent,
  ChevronLeft,
  ChevronRight,
  BadgeCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export function TrustAndHalalSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
    },
    {
      quote: "We order 500kg+ weekly for weekend banquet services. Their refrigerated fleet pulls right into our receiving dock at 7:00 AM sharp with temperatures logged at 1.8°C. Outstanding halal integrity.",
      author: "Chef Hamza Al-Masri",
      role: "Executive Chef, Royal Grand Banquet Hall",
      rating: 5,
      location: "Mississauga, ON"
    },
    {
      quote: "Their Ontario AAA strip loins and pasture-raised veal chops elevated our dinner tasting menu. Bradley's pricing per kilogram beats general food distributors by 15% with far superior freshness.",
      author: "Sarah & Kenji Tanaka",
      role: "Chef-Owners, Kanso Dining Club",
      rating: 5,
      location: "Toronto, ON"
    }
  ];

  // Responsive slides calculation
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - slidesToShow);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-zinc-200/90 relative overflow-hidden">
      <div className="site-container">
        
        {/* Rating Hero Banner */}
        <div className="bg-gradient-to-br from-zinc-950 via-[#111116] to-zinc-950 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 lg:p-14 text-white relative overflow-hidden mb-8 sm:mb-14 shadow-xl border border-zinc-800">
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-red-400" />
                <span>Highest Rated Wholesale Butcher in Concord</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                4.8 Out of 5.0 Stars Across 137 Google Reviews
              </h3>
              <p className="text-zinc-400 text-xs sm:text-base leading-relaxed max-w-2xl font-normal">
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

        {/* 4 Core Pillars (2 per line on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-7 mb-12 sm:mb-16">
          <div className="p-3.5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl lg:rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-1.5 sm:space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-2 sm:mb-3">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-black text-xs sm:text-base lg:text-lg text-zinc-950 leading-snug">
                Pure Halal Certified
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs lg:text-sm text-zinc-600 leading-relaxed mt-1">
              Every carcass is certified hand-slaughtered in accordance with strict halal criteria. Zero machine slaughtering or stunning compromises.
            </p>
          </div>

          <div className="p-3.5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl lg:rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-1.5 sm:space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-2 sm:mb-3">
                <Percent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-black text-xs sm:text-base lg:text-lg text-zinc-950 leading-snug">
                Wholesale Volume Tiers
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs lg:text-sm text-zinc-600 leading-relaxed mt-1">
              Save up to 15% on bulk master boxes and pallet-level orders. Net-15 and Net-30 credit terms available for qualified GTA restaurants.
            </p>
          </div>

          <div className="p-3.5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl lg:rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-1.5 sm:space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-2 sm:mb-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-black text-xs sm:text-base lg:text-lg text-zinc-950 leading-snug">
                Ontario Pasture Raised
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs lg:text-sm text-zinc-600 leading-relaxed mt-1">
              Direct farm partnerships across Ontario and Western Canada ensure ethical animal husbandry, superior marbling, and zero added hormones.
            </p>
          </div>

          <div className="p-3.5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl lg:rounded-[2rem] bg-zinc-50/90 border border-zinc-200/90 space-y-1.5 sm:space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-2 sm:mb-3">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-black text-xs sm:text-base lg:text-lg text-zinc-950 leading-snug">
                Bespoke Kitchen Trimming
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs lg:text-sm text-zinc-600 leading-relaxed mt-1">
              Exact portion cutting, bone frenching, vacuum skin packaging, and personalized kitchen labeling tailored to your menu cost targets.
            </p>
          </div>
        </div>

        {/* Interactive Reviews Slider */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slider Header with Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] sm:text-xs font-bold border border-amber-200/80 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>Verified GTA Foodservice Accounts</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-semibold">• 4.8★ Google Certified</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 tracking-tight">
                What Executive Chefs & Operators Say
              </h3>
            </div>

            {/* Slider Controls: Page Counter + Prev/Next Buttons */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-mono font-bold text-zinc-400">
                <span className="text-zinc-950 font-black">0{currentIndex + 1}</span> / 0{maxIndex + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-700 flex items-center justify-center transition-all border border-zinc-200 shadow-xs"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-950 hover:bg-zinc-800 active:scale-95 text-white flex items-center justify-center transition-all shadow-md shadow-zinc-950/20"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Slider Carousel Track */}
          <div 
            className="overflow-hidden rounded-2xl sm:rounded-3xl cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out -mx-1.5 sm:-mx-2.5"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 p-1.5 sm:p-2.5"
                >
                  <div className="h-full bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Top: 5 Stars & Verified Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                          <BadgeCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verified Client</span>
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-xs sm:text-sm text-zinc-700 italic leading-relaxed mb-5 sm:mb-6 font-medium">
                        "{t.quote}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-black text-xs sm:text-sm text-zinc-950 truncate">{t.author}</div>
                        <div className="text-[11px] text-zinc-500 font-semibold truncate">{t.role}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-400 px-2 py-1 rounded bg-zinc-50 border border-zinc-200/60 shrink-0">
                        {t.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Pagination Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-7">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-7 sm:w-8 h-2 bg-red-600 shadow-sm shadow-red-600/40' 
                    : 'w-2 h-2 bg-zinc-200 hover:bg-zinc-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
