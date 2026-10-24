import React, { useState } from 'react';
import { 
  Truck, 
  ThermometerSnowflake, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Filter, 
  Search,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { INITIAL_ACTIVE_ORDERS } from '../../data/mockData';

const STAGES = [
  'All',
  'Cutting Room (Prep)',
  'Staged in Cold Room (2°C)',
  'In Transit',
  'Delivered & Signed'
];

export function ActiveOrdersTracker({ orders, onUpdateOrderStatus }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchStage = activeFilter === 'All' || order.status === activeFilter;
    const matchSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStage && matchSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered & Signed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Transit':
        return 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse';
      case 'Staged in Cold Room (2°C)':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'Cutting Room (Prep)':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const handleNextStage = (orderId, currentStatus) => {
    let next = currentStatus;
    if (currentStatus === 'Cutting Room (Prep)') next = 'Staged in Cold Room (2°C)';
    else if (currentStatus === 'Staged in Cold Room (2°C)') next = 'In Transit';
    else if (currentStatus === 'In Transit') next = 'Delivered & Signed';
    else if (currentStatus === 'Delivered & Signed') next = 'Cutting Room (Prep)';

    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, next);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Fleet Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Van #1 (Concord / Vaughan)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-black text-zinc-900 font-mono">1.4°C</div>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Reefer Active</div>
          </div>
          <div className="text-[11px] text-zinc-500">
            Driver: Dave M. • 4 Stops • Highway 7 Corridor
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Van #2 (Richmond Hill / Markham)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-black text-zinc-900 font-mono">2.1°C</div>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Reefer Active</div>
          </div>
          <div className="text-[11px] text-zinc-500">
            Driver: Karim H. • 3 Stops • Yonge & Hwy 404
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Van #3 (Downtown Toronto)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-black text-zinc-900 font-mono">1.8°C</div>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Reefer Active</div>
          </div>
          <div className="text-[11px] text-zinc-500">
            Driver: Marc A. • 5 Commercial Docks
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Van #4 (Peel Region)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-black text-zinc-900 font-mono">1.9°C</div>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Reefer Active</div>
          </div>
          <div className="text-[11px] text-zinc-500">
            Driver: Sukhwinder P. • Brampton & Mississauga
          </div>
        </div>
      </div>

      {/* Header and Controls */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              GTA Wholesale Dispatch & Order Tracker
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Real-time delivery progress for Concord cutting room and refrigerated van fleet.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search restaurant or order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-zinc-100">
          {STAGES.map(stage => {
            const count = stage === 'All' 
              ? orders.length 
              : orders.filter(o => o.status === stage).length;

            return (
              <button
                key={stage}
                type="button"
                onClick={() => setActiveFilter(stage)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === stage
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <span>{stage}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeFilter === stage ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-zinc-200">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-zinc-800 text-sm">No orders matching this filter</h4>
            <p className="text-xs text-zinc-500 mt-1">Select "All" or create a new invoice to stage dispatch.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div 
              key={order.orderId}
              className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                      {order.orderId}
                    </span>
                    <h3 className="font-extrabold text-base text-zinc-900 mt-1">
                      {order.client}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Specs / Items Box */}
                <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Order Payload:</span>
                    <span className="font-bold text-zinc-800">{order.itemsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Butcher Cut Spec:</span>
                    <span className="font-semibold text-zinc-900 truncate max-w-[210px]">{order.cutSpecs || 'Standard portion cut, cryovac packed'}</span>
                  </div>
                  <div className="flex justify-between font-mono font-bold text-zinc-900 pt-1 border-t border-zinc-200">
                    <span>Order Value:</span>
                    <span className="text-red-600">{order.totalAmount}</span>
                  </div>
                </div>

                {/* Van & Driver Info */}
                <div className="flex items-center justify-between text-xs text-zinc-500 py-2 border-t border-zinc-100">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold text-zinc-800">{order.van}</span>
                    <span className="font-mono text-zinc-400">({order.temperature})</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-zinc-700">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{order.timeEta}</span>
                  </div>
                </div>
              </div>

              {/* Action: Advance Status */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-zinc-400 font-medium">
                  Driver: {order.driver?.split(' ')[0] || 'Dave'}
                </span>

                <button
                  type="button"
                  onClick={() => handleNextStage(order.orderId, order.status)}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Advance Status</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
