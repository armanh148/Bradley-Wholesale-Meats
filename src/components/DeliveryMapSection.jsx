import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ThermometerSnowflake, 
  ShieldCheck,
  Search,
  Navigation
} from 'lucide-react';
import { BUSINESS_INFO, GTA_DELIVERY_ZONES } from '../data/mockData';

export function DeliveryMapSection() {
  const [postalInput, setPostalInput] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  const handlePostalCheck = (e) => {
    e.preventDefault();
    if (!postalInput.trim()) return;

    const clean = postalInput.trim().toUpperCase().replace(/\s+/g, '');
    const prefix = clean.substring(0, 3);

    const foundZone = GTA_DELIVERY_ZONES.find(z => 
      z.postals.some(p => p.toUpperCase() === prefix)
    );

    if (foundZone) {
      setLookupResult({
        success: true,
        zone: foundZone,
        message: `Direct Route Active for ${prefix}! Next-day refrigerated delivery available.`
      });
    } else {
      setLookupResult({
        success: true,
        zone: {
          zone: "Greater GTA Extended Logistics",
          coverage: "Custom Commercial Courier",
          cutoff: "Call Dispatch by 2:00 PM",
          minOrder: "$500 CAD",
          activeVan: "Dedicated Logistics Partner"
        },
        message: `Postal Code ${prefix} is serviced via our extended York Region commercial reefer fleet. Call +1 905-669-7583 to book delivery.`
      });
    }
  };

  return (
    <section id="delivery-zones" className="py-24 site-container">
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-3 border border-blue-200">
          <Truck className="w-4 h-4" />
          <span>Cold-Chain Fleet Logistics</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
          York Region & Greater Toronto Delivery Fleet
        </h2>
        <p className="text-zinc-600 text-base sm:text-lg mt-3 leading-relaxed">
          Dispatching daily from 445 Edgeley Blvd Unit 4, Concord. Equipped with dual-temp reefers maintained strictly between 0°C and 2°C.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left 5 Cols: Interactive Postal Checker & Hub Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Postal Code Checker Card */}
          <div className="bg-white rounded-[2.25rem] p-7 sm:p-8 border border-zinc-200 shadow-xl">
            <h3 className="font-black text-xl text-zinc-950 mb-1 flex items-center gap-2.5">
              <Navigation className="w-5 h-5 text-red-600" />
              <span>Check Restaurant Delivery Route</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mb-5 leading-relaxed">
              Enter your GTA or York Region postal code (e.g. L4K, L4J, M5V, L6T):
            </p>

            <form onSubmit={handlePostalCheck} className="flex gap-2.5 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={7}
                  placeholder="e.g. L4K 4G1"
                  value={postalInput}
                  onChange={(e) => setPostalInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30 transition-all shrink-0"
              >
                Check Route
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 mb-3">
              <span>Quick test:</span>
              {['L4K', 'L4J', 'L3T', 'M5V', 'L6T'].map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setPostalInput(code);
                    const found = GTA_DELIVERY_ZONES.find(z => z.postals.includes(code));
                    if (found) {
                      setLookupResult({
                        success: true,
                        zone: found,
                        message: `Route found for ${code}!`
                      });
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono font-bold text-xs"
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Lookup Result Box */}
            {lookupResult && (
              <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs space-y-2 mt-4 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lookupResult.zone.zone}</span>
                </div>
                <div className="text-zinc-600 text-xs">
                  {lookupResult.message}
                </div>
                <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Cutoff Schedule:</span>
                    <strong className="text-zinc-900">{lookupResult.zone.cutoff}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Free Freight Min:</span>
                    <strong className="text-zinc-900">{lookupResult.zone.minOrder}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Concord Hub Facility Highlights */}
          <div className="bg-zinc-950 text-white rounded-[2.25rem] p-7 sm:p-8 border border-zinc-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                Central Cold Hub
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Concord, Ontario
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-xl text-white">
                445 Edgeley Blvd Unit 4
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Concord, ON L4K 4G1 (Conveniently off Highway 7 & Highway 400 corridor)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                <div className="text-zinc-400 text-[10px] uppercase font-bold">Pickup Hours</div>
                <div className="font-extrabold text-sm text-white mt-0.5">7:00 AM – 5:00 PM</div>
                <div className="text-[11px] text-zinc-400">Dock 4 Customer Will-Call</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                <div className="text-zinc-400 text-[10px] uppercase font-bold">Emergency Dispatch</div>
                <div className="font-extrabold text-sm text-white mt-0.5">+1 905-669-7583</div>
                <div className="text-[11px] text-zinc-400">Same-day rush available</div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=445+Edgeley+Blvd+Unit+4+Concord+ON+L4K+4G1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-white text-zinc-950 font-extrabold text-xs sm:text-sm hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Get Driving Directions to Concord Facility</span>
            </a>
          </div>

        </div>

        {/* Right 7 Cols: GTA Delivery Zones Cards & Van Tracking */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-[2.25rem] p-7 sm:p-8 border border-zinc-200 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl text-zinc-950">
                Active GTA Refrigerated Delivery Routes
              </h3>
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Fleet Active</span>
              </span>
            </div>

            <div className="space-y-4">
              {GTA_DELIVERY_ZONES.map((zone, idx) => (
                <div 
                  key={zone.zone}
                  className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 hover:border-red-500/40 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-zinc-950 text-white text-xs font-black flex items-center justify-center">
                        Z{idx + 1}
                      </span>
                      <h4 className="font-extrabold text-base text-zinc-950">
                        {zone.zone}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full self-start sm:self-auto">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-600" />
                      {zone.activeVan}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-zinc-600 mb-3.5">
                    <strong className="text-zinc-900">Service Coverage:</strong> {zone.coverage}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-3.5 border-t border-zinc-200">
                    <div>
                      <span className="text-zinc-400 block text-[11px] font-semibold">Cutoff Schedule:</span>
                      <span className="font-bold text-zinc-900">{zone.cutoff}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[11px] font-semibold">Min Wholesale:</span>
                      <span className="font-bold text-zinc-900">{zone.minOrder}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-zinc-400 block text-[11px] font-semibold">Postal Codes:</span>
                      <span className="font-mono text-zinc-700">{zone.postals.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
