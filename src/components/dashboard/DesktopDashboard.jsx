import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Truck, 
  BookOpen, 
  Layers, 
  Store, 
  Scale, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Maximize2,
  Minus,
  X,
  UserCheck,
  Building2,
  RefreshCw
} from 'lucide-react';
import { QuickInvoiceCreator } from './QuickInvoiceCreator';
import { ActiveOrdersTracker } from './ActiveOrdersTracker';
import { LedgerAndPaymentStatus } from './LedgerAndPaymentStatus';
import { ColdRoomInventory } from './ColdRoomInventory';
import { BUSINESS_INFO } from '../../data/mockData';

export function DesktopDashboard({ 
  onReturnToStore,
  invoices,
  onSaveInvoice,
  onRecordPayment,
  activeOrders,
  onUpdateOrderStatus,
  onDispatchOrder
}) {
  const [activeTab, setActiveTab] = useState('invoicing'); // 'invoicing', 'orders', 'ledger', 'inventory'
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pendingInvoicesCount = invoices.filter(i => i.status.includes('Pending') || i.status.includes('Overdue')).length;
  const transitOrdersCount = activeOrders.filter(o => o.status === 'In Transit' || o.status === 'Cutting Room (Prep)').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      
      {/* Electron Desktop Window Titlebar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-xs select-none">
        
        {/* Left: Window Control Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-3">
            <span className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 cursor-pointer"></span>
          </div>
          <span className="font-mono text-zinc-400 font-bold hidden sm:inline">
            Bradley Wholesale Meats • POS & Invoicing Terminal v2.4
          </span>
        </div>

        {/* Center: Concord Facility Status */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-300">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Concord Hub 445 Edgeley: ONLINE
          </span>
          <span className="hidden md:inline font-mono text-zinc-400">{systemTime}</span>
        </div>

        {/* Right: Return to Store Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReturnToStore}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-red-500" />
            <span>Storefront View</span>
          </button>
        </div>

      </div>

      {/* Main Workspace with Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-zinc-900/95 border-r border-zinc-800 flex flex-col justify-between shrink-0">
          
          <div className="p-4 space-y-6">
            
            {/* Brand Header */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30">
                B
              </div>
              <div>
                <div className="font-extrabold text-sm text-white tracking-tight">
                  Bradley Wholesale
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  B2B Meat ERP • Concord
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1 text-xs">
              
              {/* 1. Quick Invoice Creator */}
              <button
                type="button"
                onClick={() => setActiveTab('invoicing')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'invoicing'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Quick Invoice Creator</span>
                </div>
                <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                  POS
                </span>
              </button>

              {/* 2. Active GTA Orders & Dispatch */}
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4" />
                  <span>GTA Delivery Dispatch</span>
                </div>
                {transitOrdersCount > 0 && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    activeTab === 'orders' ? 'bg-zinc-950 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {transitOrdersCount} active
                  </span>
                )}
              </button>

              {/* 3. Ledger & Payment Status */}
              <button
                type="button"
                onClick={() => setActiveTab('ledger')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'ledger'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Ledger & Net-30 Status</span>
                </div>
                {pendingInvoicesCount > 0 && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    activeTab === 'ledger' ? 'bg-zinc-900 text-white' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {pendingInvoicesCount} due
                  </span>
                )}
              </button>

              {/* 4. Cold Room Inventory */}
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'inventory'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  <span>Cold Room & Aging</span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono">1.8°C</span>
              </button>

            </nav>

          </div>

          {/* Bottom Sidebar Info & Operator Badge */}
          <div className="p-4 border-t border-zinc-800 space-y-3">
            
            {/* Scale Status */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-red-500" />
                  <span>Digital Scale Tare</span>
                </span>
                <span className="text-emerald-400 font-mono">0.00 kg</span>
              </div>
              <div className="text-[10px] text-zinc-500">
                Mettler-Toledo Station #1 Ready
              </div>
            </div>

            {/* Operator Card */}
            <div className="flex items-center gap-2.5 px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-zinc-200">Arman M.</div>
                <div className="text-[10px] text-zinc-500">Master Butcher / Mgr</div>
              </div>
            </div>

          </div>

        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#F4F4F5] p-4 sm:p-6 lg:p-8 text-[#18181B]">
          {activeTab === 'invoicing' && (
            <QuickInvoiceCreator 
              onSaveInvoice={onSaveInvoice} 
              onDispatchOrder={onDispatchOrder} 
            />
          )}

          {activeTab === 'orders' && (
            <ActiveOrdersTracker 
              orders={activeOrders} 
              onUpdateOrderStatus={onUpdateOrderStatus} 
            />
          )}

          {activeTab === 'ledger' && (
            <LedgerAndPaymentStatus 
              invoices={invoices} 
              onRecordPayment={onRecordPayment} 
            />
          )}

          {activeTab === 'inventory' && (
            <ColdRoomInventory />
          )}
        </main>

      </div>

    </div>
  );
}
