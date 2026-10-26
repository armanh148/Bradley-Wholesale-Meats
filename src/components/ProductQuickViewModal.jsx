import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Check, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Scissors, 
  Scale, 
  Truck,
  Sparkles,
  Box,
  ThermometerSnowflake,
  ArrowRight,
  MapPin
} from 'lucide-react';

export function ProductQuickViewModal({ product, onClose, onAddToCart, onCustomizeCut }) {
  const [selectedUnit, setSelectedUnit] = useState('box');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentPrice = selectedUnit === 'box' ? product.price : product.pricePerKg;
  const oldPricePerUnit = selectedUnit === 'box' ? (product.oldPrice || product.price * 1.35) : ((product.oldPrice || product.price * 1.35) / (product.price / product.pricePerKg));
  const totalCurrentPrice = currentPrice * quantity;
  const totalOldPrice = oldPricePerUnit * quantity;
  const savingsAmount = Math.max(0, totalOldPrice - totalCurrentPrice);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      orderUnit: selectedUnit,
      quantity
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center py-3 sm:py-6">
        <div 
          className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-zinc-200 relative text-zinc-900 transition-all duration-300 transform scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Ambient Light Bloom */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Close Button - elevated z-30 with dark glass so it's always distinct and never collides with badges */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-zinc-950 backdrop-blur-md text-white flex items-center justify-center transition-all z-30 shadow-lg active:scale-95 border border-white/20"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
            
            {/* Left Column: Image with Clean Badges (5 cols) */}
            <div className="md:col-span-5 relative">
              <div className="relative h-48 sm:h-64 md:h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                {/* Badges placed on top-left with safe right-14 clearance so they never touch top-right close button */}
                <div className="absolute top-2.5 left-2.5 right-14 flex items-center gap-1.5 z-10 pointer-events-none flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] sm:text-xs flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3" />
                    <span>100% Halal</span>
                  </span>
                  
                  {product.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase border border-white/20 shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Origin & Cold Chain Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2 border border-white/15 text-white shadow-lg pointer-events-none flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 min-w-0">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="font-semibold text-[10px] sm:text-[11px] truncate">{product.origin || 'Ontario Pasture Raised'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-300 font-mono font-bold text-[10px] sm:text-[11px] shrink-0 ml-1.5">
                    <ThermometerSnowflake className="w-3 h-3" />
                    <span>1.8°C Reefer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Actions (7 cols) */}
            <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
              
              {/* Category & Title */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[9px] sm:text-[10px] font-black uppercase tracking-wider border border-red-200">
                    {product.category || 'WHOLESALE MEAT'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-400 font-semibold">• B2B Master Case</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-zinc-950 tracking-tight leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed line-clamp-2">
                  {product.subtitle}
                </p>
              </div>

              {/* Packaging & Weight Specs */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                <div>
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">Case Net Weight</span>
                  <span className="font-mono font-black text-zinc-900 text-xs mt-0.5 block">{product.unitWeight}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">Packaging Spec</span>
                  <span className="font-semibold text-zinc-800 text-xs mt-0.5 block truncate">
                    {product.specs ? product.specs.split(',')[0] : 'Cryovac Vacuum Sealed'}
                  </span>
                </div>
              </div>

              {/* Unit Selector */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                  Select Purchase Unit
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUnit('box')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedUnit === 'box'
                        ? 'border-red-600 bg-red-50/60 shadow-xs ring-1 ring-red-600/30'
                        : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <span className="text-xs font-bold text-zinc-900 truncate">Master Box</span>
                      <span className="text-xs font-mono font-black text-red-600">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate mt-0.5">Bulk Wholesale Carton</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedUnit('kg')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedUnit === 'kg'
                        ? 'border-red-600 bg-red-50/60 shadow-xs ring-1 ring-red-600/30'
                        : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <span className="text-xs font-bold text-zinc-900 truncate">Per Kilogram</span>
                      <span className="text-xs font-mono font-black text-red-600">${product.pricePerKg.toFixed(2)}/kg</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate mt-0.5">Scaled Exact Weight</div>
                  </button>
                </div>
              </div>

              {/* Price & Savings Display */}
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2 flex-wrap">
                <div>
                  {totalOldPrice > totalCurrentPrice && (
                    <div className="text-[10px] text-zinc-400 line-through font-bold">
                      ${totalOldPrice.toFixed(2)} CAD
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-2xl font-black text-zinc-950 font-mono tracking-tight">
                      ${totalCurrentPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-zinc-500">
                      CAD ({quantity} {selectedUnit.toUpperCase()})
                    </span>
                  </div>
                </div>

                {savingsAmount > 0 && (
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shadow-xs shrink-0">
                    Save ${savingsAmount.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stepper & Primary Action Button */}
              <div className="flex items-center gap-2 pt-0.5">
                {/* Stepper */}
                <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1 border border-zinc-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-800 shadow-xs active:scale-95 transition-all"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black font-mono px-2 text-zinc-950 min-w-[22px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-800 shadow-xs active:scale-95 transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Wholesale Cart Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 min-w-0 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-md active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-red-600/30'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 animate-scale-in shrink-0" />
                      <span className="truncate">Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 shrink-0" />
                      <span className="truncate">Add to Wholesale Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Custom Cut Concierge Bar */}
              <button
                type="button"
                onClick={() => {
                  if (onCustomizeCut) onCustomizeCut(product);
                  onClose();
                }}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 transition-all flex items-center justify-between gap-2 group mt-0.5"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-white border border-zinc-200 text-red-600 flex items-center justify-center shrink-0">
                    <Scissors className="w-3 h-3" />
                  </span>
                  <span className="text-zinc-600 text-[11px] truncate">Need custom thickness or bone specs?</span>
                </div>
                <span className="text-red-600 font-bold flex items-center gap-1 shrink-0 text-[11px]">
                  <span>Cut Sheet</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
