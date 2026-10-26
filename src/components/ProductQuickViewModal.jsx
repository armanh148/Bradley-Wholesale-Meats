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
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/75 backdrop-blur-md p-4 sm:p-6 md:p-8 flex items-center justify-center transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2.5rem] max-w-3xl w-full p-6 sm:p-8 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-zinc-200/90 relative text-zinc-900 transition-all duration-300 transform scale-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Light Bloom */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-950 flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm border border-zinc-200/70 z-20 active:scale-95"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-9 items-center">
          
          {/* Left Column: Image with Luxury Badges (5 cols) */}
          <div className="md:col-span-5 relative">
            <div className="relative h-72 sm:h-96 rounded-[2rem] overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-inner group">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

              {/* Top-Left Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-1 border border-white/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{product.badge}</span>
                  </span>
                )}
                <span className="px-3 py-1 rounded-xl bg-emerald-600/95 backdrop-blur-md text-white font-black text-xs flex items-center gap-1.5 shadow-md border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Halal</span>
                </span>
              </div>

              {/* Top-Right Rating Chip */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-zinc-950/85 backdrop-blur-md text-amber-400 font-black text-xs flex items-center gap-1 shadow-md border border-white/10 z-10">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating || '4.9'}</span>
              </div>

              {/* Bottom Origin Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-zinc-900 font-black text-xs shadow-md border border-zinc-200/60 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{product.origin || 'Ontario Farm Raised'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-zinc-950/85 backdrop-blur-md text-cyan-300 font-mono font-bold text-[11px] border border-white/10">
                  1.8°C Cold Stored
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Category & Title */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-200/60 mb-1.5">
                {product.category || 'WHOLESALE MEAT'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Packaging & Weight Specs Card */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-semibold flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Master Case Weight:</span>
                </span>
                <span className="font-mono font-black text-zinc-900 bg-white px-2 py-0.5 rounded-lg border border-zinc-200">
                  {product.unitWeight}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-semibold flex items-center gap-1.5">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Packaging Type:</span>
                </span>
                <span className="font-bold text-zinc-800">
                  {product.specs ? product.specs.split(',')[0] : 'Vacuum Sealed Master Carton'}
                </span>
              </div>
            </div>

            {/* Unit Selector (Apple Segmented Style) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 block">
                Select Purchase Mode
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('box')}
                  className={`p-3 rounded-2xl text-left border-2 transition-all relative ${
                    selectedUnit === 'box'
                      ? 'border-red-600 bg-red-50/70 shadow-sm ring-2 ring-red-600/20'
                      : 'border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100/80 hover:border-zinc-300 text-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-black text-zinc-900">Master Box</span>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      selectedUnit === 'box' ? 'border-red-600 bg-red-600' : 'border-zinc-300'
                    }`}>
                      {selectedUnit === 'box' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                  </div>
                  <div className="text-sm font-black font-mono text-red-600">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">Bulk Case Volume</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedUnit('kg')}
                  className={`p-3 rounded-2xl text-left border-2 transition-all relative ${
                    selectedUnit === 'kg'
                      ? 'border-red-600 bg-red-50/70 shadow-sm ring-2 ring-red-600/20'
                      : 'border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100/80 hover:border-zinc-300 text-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-black text-zinc-900">Per Kilogram</span>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      selectedUnit === 'kg' ? 'border-red-600 bg-red-600' : 'border-zinc-300'
                    }`}>
                      {selectedUnit === 'kg' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                  </div>
                  <div className="text-sm font-black font-mono text-red-600">
                    ${product.pricePerKg.toFixed(2)}/kg
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">Scaled Exact Weight</div>
                </button>
              </div>
            </div>

            {/* Price & Savings Display */}
            <div className="pt-2 border-t border-zinc-100 flex items-end justify-between">
              <div>
                {totalOldPrice > totalCurrentPrice && (
                  <div className="text-xs text-zinc-400 line-through font-bold">
                    ${totalOldPrice.toFixed(2)} CAD
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-zinc-950 font-mono tracking-tight">
                    ${totalCurrentPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-black text-zinc-500 uppercase">
                    CAD ({quantity} {selectedUnit}{quantity > 1 ? (selectedUnit === 'box' ? 'es' : 's') : ''})
                  </span>
                </div>
              </div>

              {savingsAmount > 0 && (
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Save ${savingsAmount.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Stepper & Add to Order CTA */}
            <div className="flex items-center gap-3 pt-1">
              {/* Stepper */}
              <div className="flex items-center gap-2 bg-zinc-100/90 rounded-2xl p-1 border border-zinc-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-800 shadow-xs active:scale-95 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-black font-mono px-3 text-zinc-950 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-800 shadow-xs active:scale-95 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Wholesale Order Button */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg active:scale-95 ${
                  isAdded
                    ? 'bg-emerald-600 text-white shadow-emerald-600/35 scale-102'
                    : 'bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-red-600/35 hover:shadow-red-600/50'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 animate-scale-in" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Wholesale Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Custom Cut studio link card */}
            <button
              type="button"
              onClick={() => {
                if (onCustomizeCut) onCustomizeCut(product);
                onClose();
              }}
              className="w-full p-3 rounded-2xl bg-zinc-50 hover:bg-red-50/70 border border-zinc-200 hover:border-red-300 text-xs font-bold text-zinc-700 hover:text-red-700 transition-all flex items-center justify-between group mt-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scissors className="w-3.5 h-3.5" />
                </span>
                <span>Need custom thickness, bone specs, or vacuum skin pack?</span>
              </div>
              <span className="text-red-600 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Cut Sheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
