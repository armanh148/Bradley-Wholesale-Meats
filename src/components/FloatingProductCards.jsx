import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Flame, 
  ShoppingBag,
  Info,
  Truck
} from 'lucide-react';
import { FEATURED_HERO_PRODUCTS } from '../data/mockData';

export function FloatingProductCards({ onAddToCart, onProductClick }) {
  const [addedIds, setAddedIds] = useState({});

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section className="relative z-10 site-container pt-8 sm:pt-10 pb-12 sm:pb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Executive Chef Selection
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-0.5">
            Featured Wholesale Master Cases
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md">
          High-velocity commercial cuts in cryovac master cartons, ready for immediate refrigerated GTA dispatch.
        </p>
      </div>

      {/* 3-Column Product Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {FEATURED_HERO_PRODUCTS.map((product) => {
          const isAdded = addedIds[product.id];
          return (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-zinc-200/80 hover:border-red-500/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Thumbnail + Category & Halal Tag */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200/60 shadow-xs">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-zinc-950/85 backdrop-blur-md text-[9px] font-black text-white tracking-wider uppercase border border-white/20">
                      {product.badge}
                    </span>
                  </div>

                  <div className="flex-1 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black border border-emerald-200/70 mb-1.5 shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Halal Certified</span>
                    </span>
                    <div className="text-xs font-bold text-zinc-700">
                      {product.origin}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5 font-bold">
                      {product.unitWeight}
                    </div>
                  </div>
                </div>

                {/* Product Title & Subtitle */}
                <div className="space-y-1 mb-4">
                  <h3 className="font-black text-lg sm:text-xl text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Specs Pill */}
                <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 mb-5 flex items-center justify-between">
                  <span className="font-semibold text-zinc-500">Packaging Spec</span>
                  <span className="font-bold text-zinc-900 truncate max-w-[200px]">{product.specs.split(',')[0]}</span>
                </div>
              </div>

              {/* Bottom Row: Price & Circular Red Action Button */}
              <div className="pt-4 border-t border-zinc-100 flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] text-zinc-400 line-through font-bold">
                    ${product.oldPrice.toFixed(2)}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase">
                      / {product.unit}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-red-600 mt-0.5">
                    ≈ ${product.pricePerKg.toFixed(2)} / kg
                  </div>
                </div>

                {/* Red Circular Arrow Action Button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                      : 'bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-red-600/30 hover:shadow-red-600/40 hover:scale-105 active:scale-95'
                  }`}
                  title={isAdded ? "Added to wholesale order!" : "Add to wholesale order"}
                  aria-label={`Order ${product.name}`}
                >
                  {isAdded ? (
                    <Check className="w-5 h-5 animate-scale-in" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Sub-hero Commercial Kitchen Program Benefits Strip */}
      <div className="mt-8 rounded-2xl bg-white p-4 sm:p-6 border border-zinc-200/90 shadow-md">
        {/* Top Header / Announcement */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-zinc-100">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0 ring-4 ring-red-100"></span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-950">
              Commercial Kitchen Program
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold border border-red-200/80 shrink-0">
              Up to 15% Volume Discount
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium">
            Direct wholesale pricing for Concord, Vaughan & GTA restaurants.
          </p>
        </div>

        {/* 3 Value Pillars with Icons instead of plain bullet dots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pt-3.5">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-800 bg-zinc-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-zinc-200/60 sm:border-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <span>Free GTA Cold Freight over $350 CAD</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-800 bg-zinc-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-zinc-200/60 sm:border-0">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>CFIA Federally Inspected Meat</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-800 bg-zinc-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-zinc-200/60 sm:border-0">
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200/60">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>100% Hand-Slaughtered Halal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
