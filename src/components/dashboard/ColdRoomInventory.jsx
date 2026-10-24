import React, { useState } from 'react';
import { 
  ThermometerSnowflake, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  ShieldCheck,
  Scale,
  Calendar,
  X
} from 'lucide-react';
import { INVENTORY_ITEMS } from '../../data/mockData';

export function ColdRoomInventory() {
  const [inventory, setInventory] = useState(INVENTORY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [inboundModalOpen, setInboundModalOpen] = useState(false);

  // New Inbound form
  const [newCutName, setNewCutName] = useState('Canadian AAA Striploin');
  const [newLot, setNewLot] = useState(`LOT-2026-1025`);
  const [newKg, setNewKg] = useState(150);
  const [newChamber, setNewChamber] = useState('Cooler #1 (+1.2°C)');

  const handleAddInbound = (e) => {
    e.preventDefault();
    const newItem = {
      sku: `BEEF-${Math.floor(100 + Math.random() * 900)}`,
      name: newCutName,
      category: 'Beef',
      lot: newLot,
      stockKg: Number(newKg),
      unitCost: 75.00,
      chamber: newChamber,
      status: 'Daily Fresh Inbound',
      daysAged: 1,
      minThreshold: 100
    };
    setInventory([newItem, ...inventory]);
    setInboundModalOpen(false);
  };

  const filtered = inventory.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
              Concord Cold Storage Facilities
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Cold Room Inventory & Dry-Aging Chambers
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time lot tracking, hanging carcass weight, and temperature logging.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search SKU or Lot #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <button
            type="button"
            onClick={() => setInboundModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Receive Inbound Carcass</span>
          </button>
        </div>
      </div>

      {/* Chamber Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>Walk-in Meat Cooler #1 & #2</span>
            <span className="text-blue-600 font-mono font-bold">+1.5°C</span>
          </div>
          <div className="text-xl font-black text-zinc-900 font-mono">
            {inventory.reduce((a, b) => a + b.stockKg, 0).toFixed(1)} kg
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">● Temperature & RH Optimal</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>Himalayan Salt Dry-Aging Chamber</span>
            <span className="text-amber-600 font-mono font-bold">+2.0°C / 78% RH</span>
          </div>
          <div className="text-xl font-black text-zinc-900 font-mono">185.0 kg</div>
          <div className="text-[11px] text-zinc-500">Wagyu & Prime Rib Loins on 35-day cycle</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>Poultry Staging & Flash Chill</span>
            <span className="text-cyan-600 font-mono font-bold">+0.5°C</span>
          </div>
          <div className="text-xl font-black text-zinc-900 font-mono">640.0 kg</div>
          <div className="text-[11px] text-zinc-500">Ontario Air-Chilled Halal Daily Dispatched</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-400 font-bold uppercase text-[10px]">
              <th className="py-3 px-3">SKU</th>
              <th className="py-3 px-3">Product Description</th>
              <th className="py-3 px-3">Lot # / CFIA Batch</th>
              <th className="py-3 px-3">Location Chamber</th>
              <th className="py-3 px-3 text-right">Stock On Hand (kg)</th>
              <th className="py-3 px-3 text-right">Days Aged</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map(item => {
              const isLow = item.stockKg < item.minThreshold;

              return (
                <tr key={item.sku} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-zinc-900">
                    {item.sku}
                  </td>
                  <td className="py-3 px-3 font-bold text-zinc-900">
                    {item.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-zinc-500">
                    {item.lot}
                  </td>
                  <td className="py-3 px-3 text-zinc-600">
                    {item.chamber}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-sm text-zinc-950">
                    {item.stockKg} kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-zinc-600">
                    {item.daysAged} days
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isLow 
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {isLow ? <AlertTriangle className="w-3 h-3 text-red-500" /> : <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      <span>{item.status}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Inbound Modal */}
      {inboundModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="font-extrabold text-base text-zinc-900">
                Receive Fresh Inbound Meat Lot
              </h3>
              <button onClick={() => setInboundModalOpen(false)}>
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <form onSubmit={handleAddInbound} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Meat Primal / Cut</label>
                <input
                  type="text"
                  required
                  value={newCutName}
                  onChange={(e) => setNewCutName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Lot / Batch #</label>
                  <input
                    type="text"
                    required
                    value={newLot}
                    onChange={(e) => setNewLot(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Inbound Net Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newKg}
                    onChange={(e) => setNewKg(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Cold Room Chamber</label>
                <select
                  value={newChamber}
                  onChange={(e) => setNewChamber(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-semibold"
                >
                  <option>Cooler #1 (+1.2°C)</option>
                  <option>Cooler #2 (+1.5°C)</option>
                  <option>Cooler #3 (+1.8°C)</option>
                  <option>Dry Aging Chamber (+2.0°C)</option>
                  <option>Poultry Cold Staging (+0.5°C)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setInboundModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  Log Inbound Carcass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
