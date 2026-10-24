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
  Sparkles
} from 'lucide-react';

export function ProductQuickViewModal({ product, onClose, onAddToCart, onCustomizeCut }) {
  const [selectedUnit, setSelectedUnit] = useState('box');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentPrice = selectedUnit === 'box' ? product.price : product.pricePerKg;

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative text-zinc-900 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Image */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-3 py-1 rounded-lg bg-zinc-950/85 backdrop-blur-sm text-white font-extrabold text-xs uppercase tracking-wider">
                {product.badge}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Halal
              </span>
            </div>
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-zinc-900 font-bold text-xs shadow-sm">
              {product.origin}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight mt-1">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Packaging & Weight Specs */}
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Master Case Weight:</span>
                <span className="font-mono font-bold text-zinc-900">{product.unitWeight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Packaging Type:</span>
                <span className="font-semibold text-zinc-800">{product.specs.split(',')[0]}</span>
              </div>
            </div>

            {/* Price Selection */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('box')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'box'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-zinc-200 text-zinc-600'
                  }`}
                >
                  Master Box (${product.price.toFixed(2)})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('kg')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'kg'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-zinc-200 text-zinc-600'
                  }`}
                >
                  Per Kilogram (${product.pricePerKg.toFixed(2)}/kg)
                </button>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-black text-zinc-950 font-mono">
                  ${(currentPrice * quantity).toFixed(2)}
                </span>
                <span className="text-xs text-zinc-500">
                  CAD ({quantity} {selectedUnit}{quantity > 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-zinc-100 rounded-xl p-1 border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-50 shadow-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold font-mono px-3">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-50 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to order */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Wholesale Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Custom Cut link */}
            <button
              type="button"
              onClick={() => {
                onCustomizeCut(product);
                onClose();
              }}
              className="w-full py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center justify-center gap-1.5 underline"
            >
              <Scissors className="w-3.5 h-3.5 text-red-600" />
              <span>Or specify custom thickness & fat trim for kitchen</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
