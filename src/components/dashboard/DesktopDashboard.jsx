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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      
      {/* Electron Desktop Window Titlebar */}
      <div className="bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/90 px-4 py-2.5 flex items-center justify-between text-xs select-none">
        
        {/* Left: Window Control Traffic Lights */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/90 hover:opacity-100 cursor-pointer shadow-xs transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/90 hover:opacity-100 cursor-pointer shadow-xs transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 hover:opacity-100 cursor-pointer shadow-xs transition-opacity"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-300 font-bold hidden sm:inline tracking-tight">
              Bradley Wholesale Meats
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="font-mono text-zinc-400 text-[11px] hidden md:inline">
              B2B POS & Invoicing Terminal v2.4
            </span>
          </div>
        </div>

        {/* Center: Concord Facility Status */}
        <div className="flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 shadow-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Concord Hub 445 Edgeley: ONLINE</span>
          </span>
          <span className="hidden md:inline font-mono font-bold text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700/60">
            {systemTime}
          </span>
        </div>

        {/* Right: Return to Store Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReturnToStore}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all shadow-sm border border-zinc-700/60 active:scale-95 group"
          >
            <Store className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
            <span>Storefront View</span>
          </button>
        </div>

      </div>

      {/* Main Workspace with Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-zinc-900/90 backdrop-blur-xl border-r border-zinc-800/80 flex flex-col justify-between shrink-0 shadow-xl">
          
          <div className="p-4 space-y-6">
            
            {/* Brand Header */}
            <div className="flex items-center gap-3 px-2 py-2 border-b border-zinc-800/60 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-rose-700 flex items-center justify-center text-white font-black text-xl shadow-[0_4px_14px_rgba(220,38,38,0.35)] shrink-0">
                B
              </div>
              <div>
                <div className="font-black text-sm text-white tracking-tight">
                  Bradley Wholesale
                </div>
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <span>B2B Meat ERP</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-red-400 font-semibold">Concord</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5 text-xs">
              
              {/* 1. Quick Invoice Creator */}
              <button
                type="button"
                onClick={() => setActiveTab('invoicing')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all duration-200 ${
                  activeTab === 'invoicing'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_6px_20px_rgba(220,38,38,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Quick Invoice Creator</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-black ${
                  activeTab === 'invoicing' ? 'bg-white text-red-700 shadow-xs' : 'bg-red-600/20 text-red-400 border border-red-500/30'
                }`}>
                  POS
                </span>
              </button>

              {/* 2. Active GTA Orders & Dispatch */}
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all duration-200 ${
                  activeTab === 'orders'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_6px_20px_rgba(220,38,38,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4" />
                  <span>GTA Delivery Dispatch</span>
                </div>
                {transitOrdersCount > 0 && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'orders' ? 'bg-zinc-950 text-white' : 'bg-red-600 text-white shadow-xs'
                  }`}>
                    {transitOrdersCount} active
                  </span>
                )}
              </button>

              {/* 3. Ledger & Payment Status */}
              <button
                type="button"
                onClick={() => setActiveTab('ledger')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all duration-200 ${
                  activeTab === 'ledger'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_6px_20px_rgba(220,38,38,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Ledger & Net-30 Status</span>
                </div>
                {pendingInvoicesCount > 0 && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'ledger' ? 'bg-zinc-900 text-white' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {pendingInvoicesCount} due
                  </span>
                )}
              </button>

              {/* 4. Cold Room Inventory */}
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold transition-all duration-200 ${
                  activeTab === 'inventory'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_6px_20px_rgba(220,38,38,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  <span>Cold Room & Aging</span>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 font-mono bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60">
                  1.8°C
                </span>
              </button>

            </nav>

          </div>

          {/* Bottom Sidebar Info & Operator Badge */}
          <div className="p-4 border-t border-zinc-800/80 space-y-3 bg-zinc-950/40">
            
            {/* Digital Scale Tare Hardware Widget */}
            <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Scale className="w-3.5 h-3.5 text-red-500" />
                  <span>Digital Scale Tare</span>
                </span>
                <span className="text-emerald-400 font-mono font-black text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  0.00 kg
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span>Mettler-Toledo Station #1</span>
                <span className="text-emerald-500 font-bold">● READY</span>
              </div>
            </div>

            {/* Operator Card */}
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-2xl bg-zinc-800/50 border border-zinc-800">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-200 shrink-0">
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-zinc-100 flex items-center gap-1.5">
                  <span>Arman M.</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-[10px] text-zinc-400 font-medium">Master Butcher / Mgr</div>
              </div>
            </div>

          </div>

        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 text-[#111827]">
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
