import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Save, 
  Scale, 
  Calculator, 
  Building2, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  FileText,
  DollarSign,
  Percent,
  RefreshCw,
  X
} from 'lucide-react';
import { BUSINESS_INFO, INITIAL_CLIENTS, WHOLESALE_CATALOG } from '../../data/mockData';

export function QuickInvoiceCreator({ onSaveInvoice, onDispatchOrder }) {
  const [selectedClient, setSelectedClient] = useState(INITIAL_CLIENTS[0]);
  const [isCustomClient, setIsCustomClient] = useState(false);
  const [customClientName, setCustomClientName] = useState('');
  const [customClientPhone, setCustomClientPhone] = useState('');
  const [customClientAddress, setCustomClientAddress] = useState('');
  
  const [invoiceId, setInvoiceId] = useState(`INV-2026-0${Math.floor(842 + Math.random() * 50)}`);
  const [paymentTerms, setPaymentTerms] = useState('Net 15');
  const [poNumber, setPoNumber] = useState('PO-CONCORD-09');
  const [taxRate, setTaxRate] = useState(0); // 0% fresh meat wholesale in Canada

  // Line items
  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      productId: 'prod-ribeye',
      name: 'Premium Grass-Fed Ribeye Steaks',
      weightKg: 24.5,
      ratePerKg: 94.95,
      unit: 'kg'
    },
    {
      id: 2,
      productId: 'prod-chicken',
      name: 'Organic Free-Range Chicken Breasts',
      weightKg: 30.0,
      ratePerKg: 22.67,
      unit: 'kg'
    }
  ]);

  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Digital scale simulation
  const handleScaleTare = (itemId) => {
    // Generates a realistic digital scale reading e.g. 18.75 kg
    const simulatedWeight = Number((12 + Math.random() * 25).toFixed(2));
    setLineItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, weightKg: simulatedWeight } : item
    ));
    setSuccessToast(`Digital Scale Tare: Recorded ${simulatedWeight} kg at Station #1`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleProductSelect = (itemId, productId) => {
    const found = WHOLESALE_CATALOG.find(p => p.id === productId);
    if (!found) return;

    setLineItems(prev => prev.map(item => 
      item.id === itemId ? {
        ...item,
        productId: found.id,
        name: found.name,
        ratePerKg: found.pricePerKg
      } : item
    ));
  };

  const handleUpdateItem = (itemId, field, value) => {
    setLineItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      productId: WHOLESALE_CATALOG[1].id,
      name: WHOLESALE_CATALOG[1].name,
      weightKg: 15.0,
      ratePerKg: WHOLESALE_CATALOG[1].pricePerKg,
      unit: 'kg'
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleRemoveItem = (itemId) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter(item => item.id !== itemId));
  };

  // Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + (item.weightKg * item.ratePerKg), 0);
  
  // Tier discounts
  let discountPercent = selectedClient ? selectedClient.discountTier : 0;
  if (subtotal >= 2500 && discountPercent < 15) discountPercent = 15;
  else if (subtotal >= 1000 && discountPercent < 10) discountPercent = 10;
  else if (subtotal >= 500 && discountPercent < 5) discountPercent = 5;

  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (taxRate / 100);
  const totalAmount = taxableAmount + taxAmount;

  const currentClientName = isCustomClient ? customClientName || 'Commercial Kitchen Client' : selectedClient.name;
  const currentClientPhone = isCustomClient ? customClientPhone || '+1 905-669-7583' : selectedClient.phone;
  const currentClientAddress = isCustomClient ? customClientAddress || 'GTA Commercial Dock' : selectedClient.address;

  // Handle Save & Dispatch
  const handleSaveAndDispatch = () => {
    const newInvoice = {
      id: invoiceId,
      clientName: currentClientName,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      items: lineItems.map(i => ({
        name: i.name,
        qty: `${i.weightKg} kg`,
        rate: i.ratePerKg,
        total: i.weightKg * i.ratePerKg
      })),
      subtotal,
      discountPercent,
      discountAmount,
      tax: taxAmount,
      total: totalAmount,
      status: 'Pending ' + paymentTerms,
      paymentMethod: paymentTerms === 'COD' ? 'Cash on Delivery' : 'Awaiting EFT / Net-30',
      zone: selectedClient.zone || 'Concord & Vaughan'
    };

    if (onSaveInvoice) onSaveInvoice(newInvoice);

    if (onDispatchOrder) {
      onDispatchOrder({
        orderId: `BWM-DISP-${invoiceId.split('-')[2]}`,
        client: currentClientName,
        address: currentClientAddress,
        itemsCount: `${lineItems.length} cuts (${lineItems.reduce((a, b) => a + Number(b.weightKg), 0).toFixed(1)} kg)`,
        totalAmount: `$${totalAmount.toFixed(2)} CAD`,
        van: 'Reefer Van #1 (Concord Hub)',
        driver: 'Dave Morrison (+1 905-555-8812)',
        temperature: '1.4°C',
        status: 'Cutting Room (Prep)',
        timeEta: 'Dispatch Dock 4',
        priority: 'High'
      });
    }

    setSuccessToast(`Invoice ${invoiceId} Generated & Dispatched to Cutting Room!`);
    setTimeout(() => setSuccessToast(''), 4000);
    // Refresh invoice ID
    setInvoiceId(`INV-2026-0${Math.floor(880 + Math.random() * 50)}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between shadow-xl animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold font-mono">
              TERMINAL POS-01
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Concord Cutting Room & Scale Station
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Commercial Wholesale Invoice Creator
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setPrintModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-zinc-600" />
            <span>Print Invoice Preview</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndDispatch}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Save & Dispatch Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Invoice Line Items Builder */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-sm space-y-6">
          
          {/* Client Details Selector */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-red-600" />
                <span>Client Restaurant / Purchaser</span>
              </span>

              <button
                type="button"
                onClick={() => setIsCustomClient(!isCustomClient)}
                className="text-xs font-bold text-red-600 hover:text-red-700 underline"
              >
                {isCustomClient ? 'Choose from Existing Accounts' : '+ New Customer / Walk-in'}
              </button>
            </div>

            {!isCustomClient ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-600 block mb-1">Select GTA Account</label>
                  <select
                    value={selectedClient.id}
                    onChange={(e) => {
                      const found = INITIAL_CLIENTS.find(c => c.id === e.target.value);
                      if (found) setSelectedClient(found);
                    }}
                    className="w-full p-2.5 rounded-xl text-xs font-semibold bg-white border border-zinc-200 focus:outline-none focus:border-red-600"
                  >
                    {INITIAL_CLIENTS.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.zone}) - {c.terms}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-600 block mb-1">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs font-semibold bg-white border border-zinc-200 focus:outline-none focus:border-red-600"
                  >
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>COD (Cash on Delivery)</option>
                    <option>Pre-paid E-Transfer</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-600 block mb-1">Client Restaurant Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Maple Leaf Bistro"
                    value={customClientName}
                    onChange={(e) => setCustomClientName(e.target.value)}
                    className="w-full p-2 rounded-xl text-xs bg-white border border-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-600 block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (905) 555-XXXX"
                    value={customClientPhone}
                    onChange={(e) => setCustomClientPhone(e.target.value)}
                    className="w-full p-2 rounded-xl text-xs bg-white border border-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-600 block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    placeholder="Concord / Vaughan Address"
                    value={customClientAddress}
                    onChange={(e) => setCustomClientAddress(e.target.value)}
                    className="w-full p-2 rounded-xl text-xs bg-white border border-zinc-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Line Items Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
                Invoice Cuts & Weight Scale Readings
              </h3>
              <span className="text-xs text-zinc-500 font-mono">
                {lineItems.length} Products Added
              </span>
            </div>

            <div className="space-y-3">
              {lineItems.map((item, index) => {
                const lineTotal = item.weightKg * item.ratePerKg;
                return (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-zinc-50/80 border border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-3 transition-all hover:bg-zinc-50"
                  >
                    <span className="w-6 h-6 rounded-lg bg-zinc-200 text-zinc-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>

                    {/* Cut Selector */}
                    <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                      <label className="text-[10px] font-bold text-zinc-400 block mb-0.5">Wholesale Meat Cut</label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductSelect(item.id, e.target.value)}
                        className="w-full p-2 rounded-xl text-xs font-semibold bg-white border border-zinc-200"
                      >
                        {WHOLESALE_CATALOG.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} (${p.pricePerKg.toFixed(2)}/kg)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Weight Input + Scale Button */}
                    <div className="w-full sm:w-36">
                      <label className="text-[10px] font-bold text-zinc-400 block mb-0.5">Weight (kg)</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          step="0.1"
                          min="0.5"
                          value={item.weightKg}
                          onChange={(e) => handleUpdateItem(item.id, 'weightKg', Number(e.target.value))}
                          className="w-full p-2 rounded-xl text-xs font-mono font-bold bg-white border border-zinc-200 text-right"
                        />
                        <button
                          type="button"
                          onClick={() => handleScaleTare(item.id)}
                          className="px-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-[10px] font-bold flex items-center justify-center shrink-0 transition-colors"
                          title="Tare & Read from Certified Digital Scale"
                        >
                          <Scale className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Unit Rate */}
                    <div className="w-full sm:w-28 text-right sm:text-left">
                      <label className="text-[10px] font-bold text-zinc-400 block mb-0.5">Rate / kg</label>
                      <div className="text-xs font-mono font-bold text-zinc-800 pt-2">
                        ${item.ratePerKg.toFixed(2)}
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="w-full sm:w-32 text-right">
                      <label className="text-[10px] font-bold text-zinc-400 block mb-0.5">Amount (CAD)</label>
                      <div className="text-sm font-mono font-extrabold text-zinc-950 pt-1.5">
                        ${lineTotal.toFixed(2)}
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={lineItems.length <= 1}
                      className="text-zinc-400 hover:text-red-600 disabled:opacity-30 p-2 shrink-0 transition-colors"
                      title="Remove line"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-zinc-300 hover:border-red-600 text-zinc-600 hover:text-red-600 text-xs font-bold flex items-center justify-center gap-2 transition-colors bg-white"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Wholesale Item Line</span>
            </button>
          </div>

        </div>

        {/* Right 4 Cols: Dynamic Tax, Discounts & Financial Totals */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Invoice Breakdown
              </span>
              <span className="font-mono text-xs font-bold text-red-500">
                {invoiceId}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Gross Weight:</span>
                <span className="font-mono text-white">
                  {lineItems.reduce((a, b) => a + Number(b.weightKg), 0).toFixed(2)} kg
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Subtotal (CAD):</span>
                <span className="font-mono text-white font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Discount Selector */}
              <div className="pt-2 border-t border-zinc-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-zinc-400">Wholesale Volume Discount:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {discountPercent}% (-${discountAmount.toFixed(2)})
                  </span>
                </div>
                <div className="flex gap-1">
                  {[0, 5, 10, 15].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleUpdateItem('discount', pct)}
                      className={`flex-1 py-1 rounded text-[11px] font-bold ${
                        discountPercent === pct ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Tax Exempt Toggle */}
              <div className="pt-2 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-zinc-400 block">Canadian HST / Tax:</span>
                    <span className="text-[10px] text-zinc-500">Fresh Meat 0% Exempt</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setTaxRate(0)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        taxRate === 0 ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      0% (Exempt)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaxRate(13)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        taxRate === 13 ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      13% HST
                    </button>
                  </div>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-between text-zinc-300 mt-1 font-mono text-xs">
                    <span>Tax (13%):</span>
                    <span>${taxAmount.toFixed(2)} CAD</span>
                  </div>
                )}
              </div>

              {/* Total Balance */}
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-zinc-200">Total Due (CAD):</span>
                <div className="text-right">
                  <div className="text-3xl font-black text-white font-mono tracking-tight">
                    ${totalAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400">
                    Payment Terms: {paymentTerms}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleSaveAndDispatch}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Invoice & Stage Dispatch</span>
              </button>

              <button
                type="button"
                onClick={() => setPrintModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-400" />
                <span>Print Official Customer Copy</span>
              </button>
            </div>
          </div>

          {/* Scale Connection Status Box */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200 text-xs text-zinc-600 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-zinc-800 font-bold">
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Mettler-Toledo ToledoBench Scale</span>
              </span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                Connected: COM3
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Live scale integration calibrated to CFIA Weights & Measures legal-for-trade meat packaging standard.
            </p>
          </div>

        </div>

      </div>

      {/* Official Printable Commercial Wholesale Invoice Modal */}
      {printModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-zinc-200 text-zinc-900 space-y-6">
            
            {/* Modal Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 no-print">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Commercial Wholesale Invoice Document
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Send to System Printer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrintModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-lg flex items-center justify-center">
                    B
                  </div>
                  <h3 className="font-black text-xl text-zinc-950 tracking-tight">
                    Bradley Wholesale Meats
                  </h3>
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  445 Edgeley Blvd Unit 4, Concord, ON L4K 4G1<br />
                  Phone: +1 905-669-7583 • Halal License: #HMC-ON-4458
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs uppercase font-extrabold text-red-600 tracking-wider">
                  COMMERCIAL INVOICE
                </div>
                <div className="font-mono font-black text-lg text-zinc-950">
                  {invoiceId}
                </div>
                <div className="text-xs text-zinc-500">
                  Date: {new Date().toLocaleDateString('en-CA')}
                </div>
                <div className="text-xs font-bold text-zinc-800">
                  Terms: {paymentTerms}
                </div>
              </div>
            </div>

            {/* Billed To */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs grid grid-cols-2 gap-4">
              <div>
                <div className="text-zinc-400 font-bold uppercase text-[10px]">Billed & Dispatched To:</div>
                <div className="font-extrabold text-sm text-zinc-900 mt-0.5">{currentClientName}</div>
                <div className="text-zinc-600">{currentClientAddress}</div>
                <div className="text-zinc-600">{currentClientPhone}</div>
              </div>
              <div>
                <div className="text-zinc-400 font-bold uppercase text-[10px]">Dispatch & Logistics:</div>
                <div className="font-bold text-zinc-800 mt-0.5">York Region Reefer Fleet</div>
                <div className="text-zinc-600">Storage Spec: 1.8°C Hand-Trimmed Halal</div>
                <div className="text-zinc-600">PO Ref: {poNumber}</div>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-300 text-zinc-500 font-bold uppercase text-[10px]">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-right">Net Weight</th>
                  <th className="py-2 text-right">Rate / kg</th>
                  <th className="py-2 text-right">Amount (CAD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {lineItems.map(item => (
                  <tr key={item.id}>
                    <td className="py-2 font-bold text-zinc-900">{item.name}</td>
                    <td className="py-2 text-right font-mono">{item.weightKg} kg</td>
                    <td className="py-2 text-right font-mono">${item.ratePerKg.toFixed(2)}</td>
                    <td className="py-2 text-right font-mono font-bold">${(item.weightKg * item.ratePerKg).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t border-zinc-200 pt-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal:</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)} CAD</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Wholesale Discount ({discountPercent}%):</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)} CAD</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-500">
                <span>HST (0% Fresh Wholesale Meat):</span>
                <span className="font-mono">${taxAmount.toFixed(2)} CAD</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-2 border-t border-zinc-300">
                <span>Total Amount Due:</span>
                <span className="font-mono text-red-600">${totalAmount.toFixed(2)} CAD</span>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-zinc-300 text-[11px] text-zinc-500 flex justify-between items-end">
              <div>
                <strong>Payment Instructions:</strong><br />
                Interac E-Transfer to: <span className="font-mono text-zinc-800">orders@bradleywholesalemeats.ca</span><br />
                Direct Deposit / EFT details available on request.
              </div>
              <div className="text-right">
                <div className="border-b border-zinc-400 w-40 mb-1"></div>
                <span>Receiver Signature / Stamp</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
