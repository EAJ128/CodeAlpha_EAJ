import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { SvgChart } from '../components/SvgChart';
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, Plus, Pencil, Trash2, CheckCircle, X, ShieldAlert, TrendingUp } from 'lucide-react';
import { Product, OrderStatus } from '../types';

export const AdminView: React.FC = () => {
  const {
    currentUser,
    products,
    orders,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    getAnalytics,
    navigateTo,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'users'>('analytics');

  // Modal / Form Management for Products Add/Edit
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmProd, setDeleteConfirmProd] = useState<{ id: string; name: string } | null>(null);

  // Form Fields
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState('Electronics');
  const [pDescription, setPDescription] = useState('');
  const [pPrice, setPPrice] = useState(0);
  const [pStock, setPStock] = useState(0);
  const [pImage, setPImage] = useState('');
  const [pSpecs, setPSpecs] = useState<string[]>(['', '', '']);

  // Fetch compiled analytics payload
  const stats = useMemo(() => {
    return getAnalytics();
  }, [getAnalytics, products, orders, users]);

  // Restrict access to administrators only
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#080710] py-24 text-center">
        <div className="max-w-md mx-auto space-y-6 px-4">
          <ShieldAlert className="text-rose-500 mx-auto" size={48} />
          <h2 className="text-xl font-bold font-mono text-slate-100 uppercase">SYS_ERR: ACCESS REJECTED</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your connection credentials do not hold authorized keys for this dashboard. Return to the main consumer shop catalog.
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 bg-slate-900 border border-slate-750 text-xs font-bold font-mono text-cyan-400 rounded-xl"
          >
            CATALOG PORTAL
          </button>
        </div>
      </div>
    );
  }

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setPName('');
    setPCategory('Electronics');
    setPDescription('');
    setPPrice(0);
    setPStock(10);
    setPImage('https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=500&auto=format&fit=crop&q=60');
    setPSpecs(['Brand: EAJ Premium', 'Warranty: 1 Year', 'Connectivity: USB-C']);
    setProductFormOpen(true);
  };

  const handleOpenEditForm = (prod: Product) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPCategory(prod.category);
    setPDescription(prod.description);
    setPPrice(prod.price);
    setPStock(prod.stock);
    setPImage(prod.image);
    setPSpecs(prod.specifications.length > 0 ? [...prod.specifications] : ['', '', '']);
    setProductFormOpen(true);
  };

  const handleSpecChange = (index: number, val: string) => {
    const updated = [...pSpecs];
    updated[index] = val;
    setPSpecs(updated);
  };

  const handleAddSpecLine = () => {
    setPSpecs([...pSpecs, '']);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pName.trim() || !pDescription.trim() || pPrice <= 0 || pStock < 0) {
      addToast('Review product specifications and parameters prior to compilation.', 'error');
      return;
    }

    const payload = {
      name: pName.trim(),
      category: pCategory,
      description: pDescription.trim(),
      price: Number(pPrice),
      stock: Number(pStock),
      image: pImage.trim() || 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=500&auto=format&fit=crop&q=60',
      specifications: pSpecs.filter(s => s.trim() !== '')
    };

    if (editingProduct) {
      updateProduct({ id: editingProduct.id, ...payload });
      addToast(`Product "${payload.name}" has been updated on local ledger.`, 'success');
    } else {
      addProduct(payload);
      addToast(`Product "${payload.name}" has been compiled into catalog stream.`, 'success');
    }

    setProductFormOpen(false);
  };

  const handleDeleteProductClick = (id: string, name: string) => {
    setDeleteConfirmProd({ id, name });
  };

  const handleStatusSelectChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as OrderStatus);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20';
      case 'Shipped': return 'text-cyan-400 bg-cyan-950/20 border-cyan-500/20';
      case 'Processing': return 'text-amber-400 bg-amber-950/20 border-amber-500/20';
      default: return 'text-fuchsia-400 bg-fuchsia-950/20 border-fuchsia-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100 py-12 relative animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin control panel heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 mb-8 border-b border-[rgba(255,255,255,0.1)]">
          <div className="space-y-1">
            <span className="inline-flex items-center space-x-1.5 text-fuchsia-400 font-mono text-[9px] uppercase font-bold tracking-widest border border-fuchsia-500/20 bg-fuchsia-950/20 px-2.5 py-0.5 rounded">
              <span>ADMIN SYSTEMS ACCESS APPROVED</span>
            </span>
            <h1 className="text-xl font-bold font-sans tracking-tight uppercase text-white">
              EAJ STORE MAIN ADMINISTRATIVE CORE
            </h1>
          </div>
          
          <button
            onClick={() => navigateTo('home')}
            className="font-mono text-xs font-bold text-slate-400 hover:text-[#00d1ff] border border-[rgba(255,255,255,0.1)] hover:border-[#00d1ff]/40 rounded px-4 py-2 transition cursor-pointer"
          >
            ← LEAVE ROOT AND BROWSE
          </button>
        </div>

        {/* Dynamic Analytics Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[rgba(20,20,35,0.7)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md flex items-center space-x-4">
            <div className="h-9 w-9 rounded bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-[#00d1ff] font-bold text-sm">
              💰
            </div>
            <div className="font-mono text-[11px] text-[#a0a0c0]">
              <span>GROSS_REVENUES</span>
              <span className="block text-lg font-bold text-white mt-0.5">${stats.totalRevenue.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-[rgba(20,20,35,0.7)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md flex items-center space-x-4">
            <div className="h-9 w-9 rounded bg-fuchsia-950/50 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 font-bold text-sm">
              📦
            </div>
            <div className="font-mono text-[11px] text-[#a0a0c0]">
              <span>ORDERS_COMPILED</span>
              <span className="block text-lg font-bold text-white mt-0.5">{stats.totalOrders}</span>
            </div>
          </div>

          <div className="bg-[rgba(20,20,35,0.7)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md flex items-center space-x-4">
            <div className="h-9 w-9 rounded bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center text-[#9d00ff] font-bold text-sm">
              ⚙️
            </div>
            <div className="font-mono text-[11px] text-[#a0a0c0]">
              <span>PRODUCT_NODES</span>
              <span className="block text-lg font-bold text-white mt-0.5">{stats.totalProducts}</span>
            </div>
          </div>

          <div className="bg-[rgba(20,20,35,0.7)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md flex items-center space-x-4">
            <div className="h-9 w-9 rounded bg-slate-900 border border-white/10 flex items-center justify-center text-slate-450 font-bold text-sm">
              👥
            </div>
            <div className="font-mono text-[11px] text-[#a0a0c0]">
              <span>CLIENTS_REGISTERED</span>
              <span className="block text-lg font-bold text-white mt-0.5">{stats.totalUsers}</span>
            </div>
          </div>

        </div>

        {/* Console Navigation Tab bars */}
        <div className="flex border-b border-[rgba(255,255,255,0.1)] mb-6 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-4 font-mono text-[11px] font-bold border-b-2 tracking-wider uppercase transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'analytics'
                ? 'text-[#00d1ff] border-[#00d1ff] bg-[rgba(0,209,255,0.05)]'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-white/10'
            }`}
          >
            <LayoutDashboard size={12} />
            <span>METRICS & CHARTS</span>
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-4 font-mono text-[11px] font-bold border-b-2 tracking-wider uppercase transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'products'
                ? 'text-[#00d1ff] border-[#00d1ff] bg-[rgba(0,209,255,0.05)]'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-white/10'
            }`}
          >
            <ShoppingBag size={12} />
            <span>PRODUCT CATALOG ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 font-mono text-[11px] font-bold border-b-2 tracking-wider uppercase transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'orders'
                ? 'text-[#00d1ff] border-[#00d1ff] bg-[rgba(0,209,255,0.05)]'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-white/10'
            }`}
          >
            <ClipboardList size={12} />
            <span>ORDERS CONTROLLER ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-4 font-mono text-[11px] font-bold border-b-2 tracking-wider uppercase transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'users'
                ? 'text-[#00d1ff] border-[#00d1ff] bg-[rgba(0,209,255,0.05)]'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-white/10'
            }`}
          >
            <Users size={12} />
            <span>CLIENTS CONTROL ({users.length})</span>
          </button>
        </div>

        {/* Tab 1: METRICS & CHARTS VIEW */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Orders revenue line graphs */}
            <div className="bg-[rgba(20,20,35,0.7)] p-5 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-sm space-y-4">
              <div className="flex items-center space-x-1.5 text-[#00d1ff] font-mono text-[11px] font-bold uppercase border-b border-[rgba(255,255,255,0.1)] pb-2">
                <TrendingUp size={12} />
                <span>DAILY_REVENUE_TRENS (LINE GRAPH)</span>
              </div>
              <SvgChart type="line" data={stats.ordersByDate} color="cyan" />
            </div>

            {/* Category breakdown bar charts */}
            <div className="bg-[rgba(20,20,35,0.7)] p-5 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-sm space-y-4">
              <div className="flex items-center space-x-1.5 text-fuchsia-400 font-mono text-[11px] font-bold uppercase border-b border-[rgba(255,255,255,0.1)] pb-2">
                <TrendingUp size={12} />
                <span>CATEGORY_REVENUE_METRICS (BAR CHART)</span>
              </div>
              <SvgChart
                type="bar"
                data={stats.categorySales.map(c => ({ label: c.category, value: c.revenue }))}
                color="purple"
              />
            </div>

          </div>
        )}

        {/* Tab 2: PRODUCT REGISTRY TABLE */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Action add trigger */}
            <div className="flex justify-end">
              <button
                onClick={handleOpenAddForm}
                className="px-4 py-2 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-90 text-white flex items-center space-x-1.5 font-mono text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,195,255,0.15)] cursor-pointer"
              >
                <Plus size={14} />
                <span>COMPILE NEW PRODUCT</span>
              </button>
            </div>

            {/* Catalog table */}
            <div className="bg-[rgba(20,20,35,0.7)] rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-[rgba(10,10,20,0.8)] text-slate-500 uppercase tracking-widest text-[9px] border-b border-[rgba(255,255,255,0.1)]">
                      <th className="py-3 px-5 w-2/5">PRODUCT DETAILS</th>
                      <th className="py-3 px-5">CATEGORY</th>
                      <th className="py-3 px-5">PRICE</th>
                      <th className="py-3 px-5">STOCK</th>
                      <th className="py-3 px-5 text-center">CONTROLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-900/20 transition-all font-sans">
                        
                        {/* Title and image details */}
                        <td className="py-2 px-5 flex items-center space-x-3">
                          <div className="h-8 w-8 rounded overflow-hidden bg-slate-900 border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                            <img src={p.image} className="w-full h-full object-cover" alt="prev" />
                          </div>
                          <div className="truncate min-w-0">
                            <span className="block font-bold text-slate-200 uppercase truncate text-xs font-mono">{p.name}</span>
                            <span className="block text-[9px] text-[#a0a0c0] font-mono">ID: {p.id}</span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-2 px-5 text-slate-400 font-mono text-xs uppercase">{p.category}</td>

                        {/* Price */}
                        <td className="py-2 px-5 text-slate-200 font-mono font-bold">${p.price.toFixed(2)}</td>

                        {/* Stock */}
                        <td className="py-2 px-5 font-mono text-xs">
                          {p.stock > 0 ? (
                            <span className="text-[#00d1ff] font-bold">{p.stock} units</span>
                          ) : (
                            <span className="text-rose-450 font-black">OUT_OF_STOCK</span>
                          )}
                        </td>

                        {/* Controls Edit / Delete */}
                        <td className="py-2 px-5 text-center font-mono">
                          <div className="flex items-center justify-center space-x-1.5">
                            <button
                              onClick={() => handleOpenEditForm(p)}
                              title="Edit product"
                              className="p-1 text-[#00d1ff] hover:bg-cyan-950/30 rounded border border-transparent hover:border-cyan-500/25 transition cursor-pointer"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteProductClick(p.id, p.name)}
                              title="Delete product"
                              className="p-1 text-rose-400 hover:bg-rose-955/30 rounded border border-transparent hover:border-rose-500/25 transition cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: ORDERS CONTROLLER */}
        {activeTab === 'orders' && (
          <div className="bg-[rgba(20,20,35,0.7)] rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-[rgba(10,10,20,0.8)] text-slate-500 uppercase tracking-widest text-[9px] border-b border-[rgba(255,255,255,0.1)]">
                    <th className="py-3 px-5">ORDER_ID</th>
                    <th className="py-3 px-5">SHIPPING RECIPIENT</th>
                    <th className="py-3 px-5">TOTAL AMOUNT</th>
                    <th className="py-3 px-5 text-center">DELIVERY STATUS</th>
                    <th className="py-3 px-5 text-right">DATE STAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)] font-sans">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-900/10 transition">
                      
                      {/* ID */}
                      <td className="py-2.5 px-5 font-mono text-xs font-bold text-[#00d1ff] tracking-wider">
                        {o.id}
                      </td>

                      {/* Recipient info */}
                      <td className="py-2.5 px-5">
                        <div className="text-xs">
                          <span className="block text-slate-200 font-bold uppercase font-mono">{o.fullName}</span>
                          <span className="block text-[10px] text-slate-500 font-mono tracking-tight font-medium truncate max-w-[200px]">
                            {o.shippingAddress}, {o.city}
                          </span>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-2.5 px-5 font-mono text-xs font-extrabold text-slate-200">
                        ${o.totalAmount.toFixed(2)}
                      </td>

                      {/* Status select dropdown */}
                      <td className="py-2.5 px-5 text-center">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusSelectChange(o.id, e.target.value)}
                          className={`py-0.5 px-2 rounded border text-[9px] font-black font-mono outline-none cursor-pointer tracking-wide ${getStatusStyle(o.status)}`}
                        >
                          <option value="Pending" className="bg-[#050508] text-fuchsia-400 font-mono text-xs">PENDING</option>
                          <option value="Processing" className="bg-[#050508] text-amber-400 font-mono text-xs">PROCESSING</option>
                          <option value="Shipped" className="bg-[#050508] text-[#00d1ff] font-mono text-xs">SHIPPED</option>
                          <option value="Delivered" className="bg-[#050508] text-emerald-400 font-mono text-xs">DELIVERED</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-2.5 px-5 text-right font-mono text-[10px] text-slate-500">
                        {new Date(o.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>

                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 font-mono text-[11px] leading-relaxed uppercase">
                        :: SYSTEM_WARN: Zero orders recorded in localized registers ::
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: USERS RECORD MODULE */}
        {activeTab === 'users' && (
          <div className="bg-[rgba(20,20,35,0.7)] rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-[rgba(10,10,20,0.8)] text-slate-500 uppercase tracking-widest text-[9px] border-b border-[rgba(255,255,255,0.1)]">
                    <th className="py-3 px-5">USER_ID_STAMP</th>
                    <th className="py-3 px-5">USERNAME_SIGNATURE</th>
                    <th className="py-3 px-5">EMAIL PARAMETERS</th>
                    <th className="py-3 px-5">ACCESS ROLE LEVEL</th>
                    <th className="py-3 px-5 text-right">ENROLL STAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-900/10 transition-all text-xs font-sans">
                      
                      <td className="py-2.5 px-5 font-mono text-[10px] text-slate-500 select-all">
                        {u.id}
                      </td>
                      
                      <td className="py-2.5 px-5 font-mono font-bold text-slate-200">
                        {u.username}
                      </td>

                      <td className="py-2.5 px-5 font-mono text-slate-400">
                        {u.email}
                      </td>

                      <td className="py-2.5 px-5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider border uppercase ${
                          u.role === 'admin'
                            ? 'text-fuchsia-400 bg-fuchsia-950/10 border-fuchsia-500/20'
                            : 'text-indigo-400 bg-indigo-950/10 border-indigo-500/20'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="py-2.5 px-5 text-right font-mono text-[10px] text-slate-550">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Product ADD/EDIT Modal Block Form popup */}
      {productFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-xl bg-[rgba(15,15,30,0.95)] border border-[rgba(255,255,255,0.12)] rounded-xl p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-2.5">
              <div className="flex items-center space-x-1.5 text-[#00d1ff]">
                <ShieldAlert size={16} />
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider">
                  {editingProduct ? `RECOMPILE PRODUCT: ${editingProduct.id}` : 'COMPILE NEW PRODUCT BLOCK'}
                </h3>
              </div>
              <button
                onClick={() => setProductFormOpen(false)}
                className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-900 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form controls */}
            <form onSubmit={handleSaveProductSubmit} className="space-y-3 font-mono text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-35">
                
                {/* Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-400 font-mono text-[11px]">PRODUCT_LABEL_NAME:</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. EAJ Cyber Mouse Ultra"
                    className="w-full bg-[#050508]/60 border border-[rgba(255,255,255,0.1)] rounded p-2 text-slate-100 font-sans focus:border-[#00d1ff] outline-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px]">Quadrant Category:</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full bg-[#050508] border border-[rgba(255,255,255,0.1)] rounded p-2 text-slate-100 focus:border-[#00d1ff] outline-none"
                  >
                    <option value="Electronics">ELECTRONICS</option>
                    <option value="Mobile Accessories">MOBILE ACCESSORIES</option>
                    <option value="Computers">COMPUTERS</option>
                    <option value="Gaming">GAMING</option>
                    <option value="Smart Devices">SMART DEVICES</option>
                    <option value="Office Essentials">OFFICE ESSENTIALS</option>
                  </select>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px]">Image Reference URL:</label>
                  <input
                    type="text"
                    required
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full bg-[#050508]/60 border border-[rgba(255,255,255,0.1)] rounded p-2 text-slate-100 placeholder-slate-600 font-sans focus:border-[#00d1ff] outline-none"
                    placeholder="Unsplash URL"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px]">MSRP VALUE PRICE ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    required
                    value={pPrice || ''}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full bg-[#050508]/60 border border-[rgba(255,255,255,0.1)] rounded p-2 text-slate-100 focus:border-[#00d1ff] outline-none"
                    placeholder="e.g. 59.99"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px]">ACTIVE INVENTORY STOCK:</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full bg-[#050508]/60 border border-[rgba(255,255,255,0.1)] rounded p-2 text-slate-100 focus:border-[#00d1ff] outline-none"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-400 font-mono text-[11px]">SPECIFICATION_METADATA_SUMMARY:</label>
                  <textarea
                    rows={2}
                    required
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    className="w-full bg-[#050508]/60 border border-[rgba(255,255,255,0.1)] rounded p-2 text-slate-100 font-sans text-xs leading-normal resize-none focus:border-[#00d1ff] outline-none"
                    placeholder="Input descriptive specifications detailing linear arrays..."
                  />
                </div>

                {/* specifications list dynamic */}
                <div className="sm:col-span-2 space-y-1.5 mt-1">
                  <div className="flex items-center justify-between text-slate-450 font-mono text-[11px]">
                    <label>SPECIFICATION ARRAYS (FORMAT: "Label: Value"):</label>
                    <button
                      type="button"
                      onClick={handleAddSpecLine}
                      className="text-[10px] text-[#00d1ff] hover:underline font-bold font-mono cursor-pointer"
                    >
                      + ADD SPEC LINE
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {pSpecs.map((spec, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder="e.g. Battery Life: 90 Days"
                        value={spec}
                        onChange={(e) => handleSpecChange(index, e.target.value)}
                        className="w-full bg-[#050508]/60 border border-[rgba(255,255,255,0.1)] rounded p-1.5 px-2.5 text-xs focus:border-[#00d1ff] outline-none"
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setProductFormOpen(false)}
                  className="px-4 py-1.5 bg-[#050508]/45 border border-[rgba(255,255,255,0.1)] hover:border-slate-500 rounded text-slate-400 hover:text-[#00d1ff] transition cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-95 text-white font-bold rounded transition cursor-pointer shadow-[0_0_10px_rgba(0,195,255,0.15)]"
                >
                  {editingProduct ? 'RECOMPILE NODE' : 'SAVE NODE'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Sleek Delete Confirmation Modal Overlay */}
      {deleteConfirmProd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[rgba(15,15,30,0.95)] border border-rose-500/30 rounded-xl p-5 space-y-4 shadow-[0_0_40px_rgba(244,63,94,0.1)]">
            <div className="flex items-center space-x-2 text-rose-450">
              <ShieldAlert size={18} />
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider">SECURE TRUNCATE REQUEST</h3>
            </div>
            <p className="font-mono text-xs text-[#a0a0c0] leading-relaxed">
              Are you sure you want to permanently prune <span className="text-slate-200 font-bold">"{deleteConfirmProd.name}"</span> from the server catalogue and master registers? This process cannot be undone.
            </p>
            <div className="pt-2 flex items-center justify-end space-x-2 border-t border-[rgba(255,255,255,0.1)]">
              <button
                type="button"
                onClick={() => setDeleteConfirmProd(null)}
                className="px-3 py-1.5 bg-[#050508]/40 border border-[rgba(255,255,255,0.1)] text-slate-400 hover:text-white rounded text-[11px] font-mono cursor-pointer"
              >
                ABORT
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deleteConfirmProd.id);
                  addToast(`Successfully pruned "${deleteConfirmProd.name}" core metadata.`, 'info');
                  setDeleteConfirmProd(null);
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded text-[11px] font-mono cursor-pointer transition shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                PROCEED_TRUNCATE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
