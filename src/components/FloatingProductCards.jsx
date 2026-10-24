import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Flame, 
  ShoppingBag,
  Info
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
    <section className="relative z-20 site-container -mt-20 sm:-mt-28 lg:-mt-36">
      {/* 3-Column Floating Product Card Grid (1600px Max-Width Canvas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
        {FEATURED_HERO_PRODUCTS.map((product) => {
          const isAdded = addedIds[product.id];
          return (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="group cursor-pointer bg-white rounded-[2.25rem] p-7 sm:p-8 shadow-xl shadow-zinc-200/80 border border-zinc-200/90 hover:border-zinc-300 hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Thumbnail + Category & Halal Tag */}
                <div className="flex items-start justify-between gap-5 mb-5">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-zinc-950/85 backdrop-blur-sm text-[10px] font-extrabold text-white tracking-wider uppercase">
                      {product.badge}
                    </span>
                  </div>

                  <div className="flex-1 text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Halal Certified</span>
                    </span>
                    <div className="text-xs font-bold text-zinc-600">
                      {product.origin}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 mt-0.5 font-medium">
                      {product.unitWeight}
                    </div>
                  </div>
                </div>

                {/* Product Title & Subtitle */}
                <div className="space-y-1.5 mb-5">
                  <h3 className="font-black text-xl sm:text-2xl text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Specs Pill */}
                <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 mb-6 flex items-center justify-between">
                  <span className="font-semibold text-zinc-700">Packaging Spec</span>
                  <span className="font-bold text-zinc-900 truncate max-w-[210px]">{product.specs.split(',')[0]}</span>
                </div>
              </div>

              {/* Bottom Row: Price & Circular Red Arrow Button */}
              <div className="pt-5 border-t border-zinc-100 flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs text-zinc-400 line-through font-semibold mb-0.5">
                    ${product.oldPrice.toFixed(2)}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 uppercase">
                      / {product.unit}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-red-600 mt-1">
                    ≈ ${product.pricePerKg.toFixed(2)} / kg
                  </div>
                </div>

                {/* Red Circular Arrow Action Button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 shadow-xl ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/40 hover:scale-110 active:scale-95'
                  }`}
                  title={isAdded ? "Added to wholesale order!" : "Add to wholesale order"}
                  aria-label={`Order ${product.name}`}
                >
                  {isAdded ? (
                    <Check className="w-6 h-6 animate-scale-in" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Sub-hero Wholesale Benefits Strip (1600px width) */}
      <div className="mt-10 rounded-3xl bg-white/80 backdrop-blur-md p-6 border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-3 text-zinc-900 font-extrabold">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span>Commercial Kitchen Wholesale Program:</span>
          <span className="font-normal text-zinc-600">Volume tiers up to 15% off for Concord, Vaughan & GTA restaurants.</span>
        </div>
        <div className="flex items-center gap-6 text-zinc-700 font-bold shrink-0">
          <span>● Free GTA Cold Freight over $350 CAD</span>
          <span>● CFIA Federally Inspected</span>
          <span>● 100% Hand-Slaughtered</span>
        </div>
      </div>
    </section>
  );
}
