import React, { useState } from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Search, 
  Plus, 
  ArrowUpRight, 
  Building2, 
  Calendar,
  X,
  CreditCard,
  FileCheck
} from 'lucide-react';

export function LedgerAndPaymentStatus({ invoices, onRecordPayment }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentModalInvoice, setPaymentModalInvoice] = useState(null);
  
  // Modal state
  const [payMethod, setPayMethod] = useState('Interac E-Transfer');
  const [payRef, setPayRef] = useState('');
  const [payAmount, setPayAmount] = useState(0);

  // KPIs
  const totalReceivables = invoices
    .filter(i => i.status.includes('Pending') || i.status.includes('Overdue') || i.status.includes('Partial'))
    .reduce((a, b) => a + b.total, 0);

  const totalPaid = invoices
    .filter(i => i.status === 'Paid')
    .reduce((a, b) => a + b.total, 0);

  const totalOverdue = invoices
    .filter(i => i.status.includes('Overdue'))
    .reduce((a, b) => a + b.total, 0);

  const filteredInvoices = invoices.filter(inv => {
    const matchStatus = filterStatus === 'All' 
      ? true 
      : filterStatus === 'Paid' 
        ? inv.status === 'Paid'
        : filterStatus === 'Overdue' 
          ? inv.status.includes('Overdue')
          : inv.status.includes('Pending') || inv.status.includes('Partial');

    const matchSearch = inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inv.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  const openPaymentModal = (invoice) => {
    setPaymentModalInvoice(invoice);
    setPayAmount(invoice.total);
    setPayRef(`EFT-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!paymentModalInvoice) return;

    if (onRecordPayment) {
      onRecordPayment(paymentModalInvoice.id, {
        method: payMethod,
        ref: payRef,
        amount: payAmount,
        paidAt: new Date().toLocaleString()
      });
    }

    setPaymentModalInvoice(null);
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Cards (Double-entry style financial cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Outstanding Receivables */}
        <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <span>Outstanding Receivables</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-950 font-mono tracking-tight">
            ${totalReceivables.toFixed(2)}
          </div>
          <div className="text-[11px] text-zinc-500">
            Across active Net-15 / Net-30 Concord accounts
          </div>
        </div>

        {/* Paid This Month */}
        <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <span>Collected Revenue</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight">
            ${totalPaid.toFixed(2)}
          </div>
          <div className="text-[11px] text-zinc-500">
            Direct deposit, E-Transfer & certified cheque
          </div>
        </div>

        {/* Overdue Net-30 */}
        <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <span>Overdue Accounts</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono tracking-tight">
            ${totalOverdue.toFixed(2)}
          </div>
          <div className="text-[11px] text-red-600 font-semibold">
            {invoices.filter(i => i.status.includes('Overdue')).length} Invoices Past Due
          </div>
        </div>

        {/* Avg Terms */}
        <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <span>Credit DSO</span>
            <span className="text-[11px] font-mono text-zinc-400">GTA B2B</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono tracking-tight">
            14.2 Days
          </div>
          <div className="text-[11px] text-zinc-500">
            Healthy commercial meat purveyor ratio
          </div>
        </div>

      </div>

      {/* Main Ledger Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-5">
        
        {/* Table Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Restaurant Accounts Ledger
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Double-entry invoice tracking for GTA hospitality clients and banquet halls.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search invoice or restaurant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
          {['All', 'Pending Net-15/30', 'Overdue', 'Paid'].map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => setFilterStatus(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === filter
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Client Restaurant</th>
                <th className="py-3 px-3">Issue Date</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3 text-right">Invoice Total (CAD)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500">
                    No invoices matching current filter.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(inv => {
                  const isPaid = inv.status === 'Paid';
                  const isOverdue = inv.status.includes('Overdue');

                  return (
                    <tr key={inv.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-zinc-900">
                        {inv.id}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-zinc-900">{inv.clientName}</div>
                        <div className="text-[11px] text-zinc-400">{inv.zone || 'York Region'}</div>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-zinc-600">
                        {inv.date}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-zinc-600">
                        {inv.dueDate}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-black text-zinc-950 text-sm">
                        ${inv.total.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isPaid 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : isOverdue 
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {isPaid && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {isOverdue && <AlertCircle className="w-3 h-3 text-red-600" />}
                          {!isPaid && !isOverdue && <Clock className="w-3 h-3 text-amber-600" />}
                          <span>{inv.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        {isPaid ? (
                          <span className="text-[11px] font-mono text-zinc-400">
                            Settled ({inv.paymentMethod?.split(' ')[0] || 'EFT'})
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openPaymentModal(inv)}
                            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-102"
                          >
                            Record Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Record Payment Modal */}
      {paymentModalInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="font-extrabold text-base text-zinc-900">
                Record Restaurant Payment
              </h3>
              <button 
                onClick={() => setPaymentModalInvoice(null)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-1">
              <div className="text-zinc-400 uppercase font-bold text-[10px]">Invoice Reference:</div>
              <div className="font-mono font-bold text-zinc-900 text-sm">
                {paymentModalInvoice.id} • {paymentModalInvoice.clientName}
              </div>
              <div className="text-zinc-600">
                Amount Outstanding: <strong className="text-red-600 font-mono">${paymentModalInvoice.total.toFixed(2)} CAD</strong>
              </div>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Settlement Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-semibold"
                >
                  <option>Interac E-Transfer (Direct)</option>
                  <option>Direct Deposit (EFT Wire)</option>
                  <option>Certified Corporate Cheque</option>
                  <option>Corporate Credit Card (Terminal)</option>
                  <option>Cash on Dock Delivery (COD)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Bank / Transaction Reference #</label>
                <input
                  type="text"
                  required
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Amount Paid (CAD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 font-mono font-extrabold text-sm"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalInvoice(null)}
                  className="w-1/3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Confirm & Mark Paid
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
