import React from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Star, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export function Footer({ onNavigate }) {
  return (
    <footer id="contact" className="bg-zinc-950 text-white pt-20 pb-14 border-t border-zinc-900">
      <div className="site-container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-zinc-900">
          
          {/* Brand Info (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-xl shadow-red-600/35">
                <span className="font-black text-3xl tracking-tighter">B</span>
              </div>
              <div>
                <span className="font-black text-2xl sm:text-3xl tracking-tight text-white">
                  Bradley Wholesale
                </span>
                <span className="block text-xs uppercase tracking-widest text-red-500 font-extrabold mt-0.5">
                  Meats • Concord, Ontario
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Concord’s premier destination for 100% hand-cut halal meat wholesale, portion-controlled steaks, pasture lamb, and farm-fresh poultry serving restaurants, commercial kitchens, and local households across York Region & the Greater Toronto Area.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-300">
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                4.8 / 5.0 Rating
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-400">137 Google Reviews</span>
              <span className="text-zinc-700">•</span>
              <span className="text-emerald-400 font-semibold">Halal Certified</span>
            </div>
          </div>

          {/* Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-black text-xs uppercase tracking-wider text-zinc-200">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-medium">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">Wholesale Catalog</a>
              </li>
              <li>
                <a href="#custom-cuts" className="hover:text-white transition-colors">Chef Custom Cut Sheet</a>
              </li>
              <li>
                <a href="#delivery-zones" className="hover:text-white transition-colors">GTA Delivery Schedule</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Concord Hub Location</a>
              </li>
            </ul>
          </div>

          {/* Location & Contact (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-black text-xs uppercase tracking-wider text-zinc-200">
              Distribution Hub & Dock Hours
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">445 Edgeley Blvd Unit 4</div>
                  <div className="text-zinc-400">Concord, ON L4K 4G1, Canada</div>
                  <a 
                    href="https://maps.google.com/?q=445+Edgeley+Blvd+Unit+4+Concord+ON+L4K+4G1" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-bold mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="hover:text-white font-mono font-bold text-zinc-100">
                  +1 905-669-7583
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div className="text-zinc-400 leading-relaxed text-xs">
                  <div><strong className="text-zinc-200">Monday – Friday:</strong> 7:00 AM – 5:00 PM</div>
                  <div><strong className="text-zinc-200">Saturday:</strong> 8:00 AM – 3:00 PM</div>
                  <div><strong className="text-zinc-200">Sunday:</strong> Closed (Wholesale Dispatch Only)</div>
                </div>
              </div>
            </div>

            {/* Certifications Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
                CFIA Inspected
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono">
                100% Halal Certified
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
                York Region Hub
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Bradley Wholesale Meats. All rights reserved. 445 Edgeley Blvd Unit 4, Concord, ON.
          </div>
          <div className="flex items-center gap-5">
            <span className="text-zinc-400">Digital Presence & Wholesale Ordering System</span>
            <span className="text-emerald-500 font-bold">● Cold Chain Fleet Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
