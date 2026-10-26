import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  Scale, 
  Check, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Scissors, 
  Eye,
  SlidersHorizontal,
  Box
} from 'lucide-react';
import { WHOLESALE_CATALOG } from '../data/mockData';

export function WholesaleCatalog({ onAddToCart, onProductClick, onCustomCutSelect }) {
  const [pricingMode, setPricingMode] = useState('box'); // 'box' or 'kg'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState({});

  const categories = ['All', 'Canadian Beef', 'Lamb & Veal', 'Poultry'];

  const filteredProducts = useMemo(() => {
    return WHOLESALE_CATALOG.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.origin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (e, item) => {
    e.stopPropagation();
    onAddToCart({
      ...item,
      orderUnit: pricingMode,
    });
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="catalog" className="py-24 site-container">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 text-red-700 text-xs font-black uppercase tracking-wider mb-3 border border-red-200/60">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Commercial Inventory Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
            Wholesale Meat Catalog
          </h2>
          <p className="text-zinc-600 text-sm sm:text-lg mt-2 max-w-2xl leading-relaxed">
            Live availability from our Concord distribution cold rooms. Volume discounts applied automatically on master box cases and pallet orders.
          </p>
        </div>

        {/* Pricing Mode Toggle: Box vs KG (Apple Segmented Control Style) */}
        <div className="flex items-center gap-1.5 bg-zinc-200/70 p-1.5 rounded-2xl border border-zinc-300/60 shadow-inner self-start md:self-auto">
          <span className="text-[11px] font-black text-zinc-500 pl-2.5 hidden sm:inline uppercase tracking-wider">Unit:</span>
          <button
            type="button"
            onClick={() => setPricingMode('box')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              pricingMode === 'box'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Master Box ($/box)</span>
          </button>
          <button
            type="button"
            onClick={() => setPricingMode('kg')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              pricingMode === 'kg'
                ? 'bg-zinc-950 text-white shadow-md'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Per Kilogram ($/kg)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cuts, ribeye, lamb, wagyu..."
            className="w-full pl-11 pr-14 py-2.5 rounded-xl text-sm bg-zinc-50 border border-zinc-200/90 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 font-bold transition-all"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-zinc-600"
            >
              Clear
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold bg-zinc-200/80 px-1.5 py-0.5 rounded text-zinc-500 pointer-events-none">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-14 text-center border border-zinc-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900">No wholesale cuts matching your search</h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
            Try searching for "Chicken", "Lamb", "Ribeye", or contact our Concord butcher desk directly for custom carcass cuts.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map(product => {
            const isAdded = addedItems[product.id];
            const displayPrice = pricingMode === 'box' ? product.price : product.pricePerKg;
            const displayUnit = pricingMode === 'box' ? 'box' : 'kg';

            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer bg-white rounded-[2rem] p-6 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-red-500/25 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badge */}
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-zinc-100 mb-5 border border-zinc-100 shadow-inner">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-3 py-1 rounded-lg bg-zinc-950/85 backdrop-blur-md text-white font-black text-[10px] uppercase tracking-wider border border-white/20">
                        {product.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] tracking-wide flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3 h-3" />
                        Halal
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-zinc-900 font-black text-xs shadow-sm">
                      {product.origin}
                    </div>
                  </div>

                  {/* Product Title & Info */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      <span className="text-red-600 font-black">{product.category}</span>
                      <span className="text-zinc-600 font-mono font-bold">{product.unitWeight}</span>
                    </div>
                    <h3 className="text-xl font-black text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Cut Specifications Chip */}
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 mb-6 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-medium">Cut Spec:</span>
                      <span className="font-bold text-zinc-900 truncate max-w-[170px]">{product.specs.split(',')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-medium">Case Volume:</span>
                      <span className="font-mono font-bold text-zinc-800">{product.unitWeight}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Price */}
                <div>
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="text-xs text-zinc-400 line-through font-bold">
                        ${pricingMode === 'box' ? product.oldPrice.toFixed(2) : (product.oldPrice / (product.price / product.pricePerKg)).toFixed(2)}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-black text-zinc-950 font-mono tracking-tight">
                          ${displayPrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-zinc-400 uppercase">
                          / {displayUnit}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-zinc-500 mt-0.5">
                        {pricingMode === 'box' 
                          ? `≈ $${product.pricePerKg.toFixed(2)} / kg`
                          : `≈ $${product.price.toFixed(2)} / case`
                        }
                      </div>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, product)}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Chef Custom Cut Link */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCustomCutSelect(product);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-zinc-700 bg-zinc-100/90 hover:bg-zinc-200/80 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <Scissors className="w-3.5 h-3.5 text-red-600" />
                    <span>Customize Thickness & Trim</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
