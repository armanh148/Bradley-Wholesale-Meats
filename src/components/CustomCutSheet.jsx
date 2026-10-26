import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  CheckCircle2, 
  FileText, 
  Scale, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  ChefHat, 
  Check, 
  ArrowRight,
  Info
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

const PRIMAL_CUTS = [
  { id: 'ribeye', name: 'Canadian AAA Ribeye', baseRate: 94.95, minKg: 10, category: 'Beef' },
  { id: 'striploin', name: 'Halal Wagyu Striploin MBS 7+', baseRate: 163.33, minKg: 8, category: 'Beef' },
  { id: 'tenderloin', name: 'Ontario Halal Filet Mignon / Tenderloin', baseRate: 125.00, minKg: 6, category: 'Beef' },
  { id: 'lamb-rack', name: 'Ontario Pasture Lamb Rack', baseRate: 74.92, minKg: 10, category: 'Lamb' },
  { id: 'brisket', name: 'Whole Halal Beef Brisket (Packer)', baseRate: 22.50, minKg: 20, category: 'Beef' },
  { id: 'short-ribs', name: 'Beef Short Ribs (English / Flanken)', baseRate: 42.67, minKg: 15, category: 'Beef' },
  { id: 'veal-loin', name: 'Ontario Milk-Fed Veal Loin', baseRate: 72.00, minKg: 10, category: 'Veal' },
  { id: 'chicken-breast', name: 'Organic Free-Range Chicken Breast', baseRate: 22.67, minKg: 15, category: 'Poultry' }
];

const THICKNESS_OPTIONS = [
  { label: '0.75" (19mm)', desc: 'Quick-sear bistro cut' },
  { label: '1.00" (25mm)', desc: 'Standard steakhouse cut' },
  { label: '1.25" (32mm)', desc: 'Premium thick-cut' },
  { label: '1.50" (38mm)', desc: 'Chef signature bone-in' },
  { label: '2.00" (50mm)', desc: 'Tomahawk / Côte de boeuf' },
  { label: 'Whole Primal Uncut', desc: 'Fabricate in-house' }
];

const PACKAGING_OPTIONS = [
  { id: 'vsp', name: 'Vacuum Skin Pack (VSP)', desc: '2 portions per pouch, oxygen-free shelf life 21+ days', fee: 1.20 },
  { id: 'cryovac', name: 'Heavy Duty Master Cryovac', desc: 'Commercial wholesale bulk vacuum bags', fee: 0.00 },
  { id: 'wax', name: 'Butcher Paper Interleaved', desc: 'Traditional wax-lined carton for immediate use', fee: 0.00 },
  { id: 'box-master', name: '20kg Master Carton (Wax Box)', desc: 'Heavy corrugated box with thermal ice blanket', fee: 0.50 }
];

export function CustomCutSheet({ preSelectedProduct, onSubmitSuccess }) {
  const [selectedPrimal, setSelectedPrimal] = useState(PRIMAL_CUTS[0]);
  const [thickness, setThickness] = useState('1.25" (32mm)');
  const [trimType, setTrimType] = useState('Clean 1/8" Fat Cap');
  const [boneOption, setBoneOption] = useState('Boneless');
  const [gradeAging, setGradeAging] = useState('Canadian AAA (21-Day Wet Aged)');
  const [packaging, setPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [targetWeightKg, setTargetWeightKg] = useState(20);
  
  // Kitchen Details
  const [restaurantName, setRestaurantName] = useState('');
  const [chefName, setChefName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-25');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  // Handle pre-selected product if navigated from catalog
  useEffect(() => {
    if (preSelectedProduct) {
      const match = PRIMAL_CUTS.find(p => preSelectedProduct.name.toLowerCase().includes(p.name.toLowerCase().split(' ')[1] || ''));
      if (match) setSelectedPrimal(match);
    }
  }, [preSelectedProduct]);

  // Dynamic calculations
  const baseCost = selectedPrimal.baseRate * targetWeightKg;
  const packagingCost = packaging.fee * targetWeightKg;
  const estimatedSubtotal = baseCost + packagingCost;
  const volumeDiscount = targetWeightKg >= 50 ? 0.15 : targetWeightKg >= 25 ? 0.10 : 0.05;
  const discountTotal = estimatedSubtotal * volumeDiscount;
  const estimatedFinalCAD = estimatedSubtotal - discountTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = `CUT-BWM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
    setIsSubmitted(true);
    if (onSubmitSuccess) {
      onSubmitSuccess({
        refCode,
        primal: selectedPrimal.name,
        weight: `${targetWeightKg} kg`,
        thickness,
        trim: trimType,
        packaging: packaging.name,
        restaurantName: restaurantName || 'Concord Restaurant Kitchen',
        phone: phone || '+1 905-669-7583',
        total: estimatedFinalCAD
      });
    }
  };

  return (
    <section id="custom-cuts" className="py-10 sm:py-16 lg:py-20 bg-zinc-100/70 border-y border-zinc-200/90 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Title & Badge */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xs text-[11px] sm:text-xs font-black text-red-600 uppercase tracking-wider mb-2 sm:mb-3">
            <ChefHat className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Executive Chef & Master Butcher Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight">
            Custom Meat Cut Specification Form
          </h2>
          <p className="text-zinc-600 text-xs sm:text-base mt-2 sm:mt-3 leading-relaxed">
            Exact portion control fabricated for your restaurant menu. Specify your primal cut, thickness, fat cap trim, bone specs, and commercial packaging. Our Concord master butchers cut to your exact kitchen standard.
          </p>
        </div>

        {isSubmitted ? (
          <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-10 sm:p-14 border border-emerald-200 shadow-2xl text-center">
            <div className="w-18 h-18 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Cut Request Dispatched to Concord Cutting Room
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 mt-4 mb-2">
              Specification Confirmed!
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
              Reference Code: <span className="font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md">{submittedRef}</span>. Our head butcher is reviewing your cut sheet. You will receive a direct phone confirmation at <strong className="text-zinc-900">{phone || '+1 905-669-7583'}</strong>.
            </p>

            {/* Summary Ticket */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-sm space-y-2.5 mb-8 max-w-xl mx-auto">
              <div className="flex justify-between font-bold text-zinc-900 pb-2 border-b border-zinc-200">
                <span>{selectedPrimal.name}</span>
                <span>{targetWeightKg} kg Target</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Thickness & Trim:</span>
                <span className="font-semibold text-zinc-900">{thickness} • {trimType}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Bone Structure:</span>
                <span className="font-semibold text-zinc-900">{boneOption}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Packaging:</span>
                <span className="font-semibold text-zinc-900">{packaging.name}</span>
              </div>
              <div className="flex justify-between font-extrabold text-red-600 pt-3 border-t border-zinc-200 text-lg">
                <span>Estimated CAD:</span>
                <span className="font-mono">${estimatedFinalCAD.toFixed(2)} CAD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3.5 rounded-2xl bg-zinc-950 text-white font-bold text-xs sm:text-sm hover:bg-zinc-800 transition-colors"
              >
                Configure Another Custom Cut
              </button>
              <a
                href={`tel:${BUSINESS_INFO.cleanPhone}`}
                className="px-8 py-3.5 rounded-2xl bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Call Master Butcher Now</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left 7 Columns: Selection Form */}
            <div className="lg:col-span-7 bg-white rounded-[2.25rem] p-8 sm:p-10 border border-zinc-200 shadow-xl space-y-9">
              
              {/* Step 1: Choose Primal Cut */}
              <div>
                <label className="flex items-center gap-2.5 text-sm font-black text-zinc-950 uppercase tracking-wide mb-4">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Select Primal Cut & Meat Base</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PRIMAL_CUTS.map(cut => {
                    const isSelected = selectedPrimal.id === cut.id;
                    return (
                      <button
                        key={cut.id}
                        type="button"
                        onClick={() => setSelectedPrimal(cut)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? 'border-red-600 bg-red-50/70 ring-2 ring-red-600/25'
                            : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-extrabold text-sm text-zinc-950">{cut.name}</span>
                          <span className="text-xs font-mono font-bold text-red-600">${cut.baseRate.toFixed(2)}/kg</span>
                        </div>
                        <div className="text-xs text-zinc-500 font-medium">
                          {cut.category} • Minimum {cut.minKg} kg batch
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Thickness & Trim Spec */}
              <div>
                <label className="flex items-center gap-2.5 text-sm font-black text-zinc-950 uppercase tracking-wide mb-4">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Portion Thickness & Bone Structure</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {THICKNESS_OPTIONS.map(opt => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setThickness(opt.label)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        thickness === opt.label
                          ? 'border-red-600 bg-red-50/80 font-bold text-red-700 ring-2 ring-red-600/20'
                          : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-semibold'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-extrabold text-zinc-950">{opt.label}</div>
                      <div className="text-[11px] text-zinc-500 truncate mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Bone & Trim Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1.5">Bone Specification</label>
                    <div className="flex gap-2">
                      {['Boneless', 'Bone-in', 'French Trimmed'].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBoneOption(b)}
                          className={`flex-1 py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                            boneOption === b
                              ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                              : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1.5">Fat Cap Trim</label>
                    <select
                      value={trimType}
                      onChange={(e) => setTrimType(e.target.value)}
                      className="w-full py-2.5 px-3 text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-red-600"
                    >
                      <option>Clean 1/8" Restaurant Trim</option>
                      <option>Standard 1/4" Fat Cap (Flavor)</option>
                      <option>Denuded / Zero Fat (Carpaccio / Diet)</option>
                      <option>Pitmaster Uncut Fat Blanket</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Packaging & Batch Size */}
              <div>
                <label className="flex items-center gap-2.5 text-sm font-black text-zinc-950 uppercase tracking-wide mb-4">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Kitchen Packaging & Batch Quantity</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                  {PACKAGING_OPTIONS.map(pkg => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setPackaging(pkg)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        packaging.id === pkg.id
                          ? 'border-red-600 bg-red-50/70 ring-2 ring-red-600/25'
                          : 'border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-extrabold text-xs sm:text-sm text-zinc-950 mb-0.5">{pkg.name}</div>
                      <div className="text-xs text-zinc-500 leading-tight">{pkg.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Weight Slider */}
                <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-700">Target Weight:</span>
                    <span className="text-base font-mono font-black text-red-600">{targetWeightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer h-2 bg-zinc-200 rounded-lg"
                  />
                  <div className="flex justify-between text-xs text-zinc-400 mt-1.5 font-mono">
                    <span>10 kg (Sample Lot)</span>
                    <span>50 kg (10% Volume Discount)</span>
                    <span>100+ kg (15% Pallet Discount)</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Contact */}
              <div className="pt-2 border-t border-zinc-200">
                <label className="flex items-center gap-2.5 text-sm font-black text-zinc-950 uppercase tracking-wide mb-4">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                  <span>Kitchen & Dispatch Info</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Restaurant / Business Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Edgeley Bistro Concord"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Chef / Contact Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chef Marco R."
                      value={chefName}
                      onChange={(e) => setChefName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Phone Number (Direct)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (905) 669-XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Target Delivery Date</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 font-semibold"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Live Butcher Ticket Preview */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              
              {/* Modern Butcher Ticket Card */}
              <div className="bg-zinc-950 text-white rounded-[2.25rem] p-7 sm:p-8 shadow-2xl border border-zinc-800">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Cutting Room Ticket</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300 font-bold">
                    HUB-445 CONCORD
                  </span>
                </div>

                {/* Ticket Details */}
                <div className="py-6 space-y-3.5 font-mono text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Primal Base:</span>
                    <span className="font-bold text-white text-right">{selectedPrimal.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Thickness:</span>
                    <span className="font-bold text-red-400">{thickness}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Bone & Fat Trim:</span>
                    <span className="text-zinc-200">{boneOption} • {trimType.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Packaging Type:</span>
                    <span className="text-zinc-200">{packaging.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Target Volume:</span>
                    <span className="font-bold text-white font-mono">{targetWeightKg} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Halal Status:</span>
                    <span className="text-emerald-400 font-bold">100% Hand-Slaughtered Cert</span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Base Butcher Rate:</span>
                    <span className="font-mono">${selectedPrimal.baseRate.toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Packaging Spec:</span>
                    <span className="font-mono">+${packaging.fee.toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Volume Discount ({Math.round(volumeDiscount * 100)}%):</span>
                    <span className="font-mono">-${discountTotal.toFixed(2)} CAD</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-zinc-800">
                    <span className="text-sm font-extrabold text-zinc-300">Estimated Total:</span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-white font-mono">
                        ${estimatedFinalCAD.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-zinc-400">CAD • 0% Fresh Meat Tax Exempt</div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Cut Sheet to Concord Hub</span>
                </button>

                <p className="text-xs text-zinc-500 text-center mt-3">
                  Or call master butcher directly at <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="text-zinc-300 underline font-bold">+1 905-669-7583</a>
                </p>
              </div>

              {/* Quality Guarantee Card */}
              <div className="bg-white rounded-3xl p-5 border border-zinc-200 text-xs text-zinc-600 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-zinc-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bradley Wholesale Quality Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Every custom batch is individually inspected, weight calibrated on certified Mettler-Toledo scales, and blast-chilled to 1.8°C before York Region refrigerated dispatch.
                </p>
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
}
