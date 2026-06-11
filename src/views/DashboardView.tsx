import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Clipboard, Calendar, Clock, CreditCard, Ship, Check, MapPin, Eye, ArrowLeft, LogOut, Lock } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    orders,
    orderItems,
    saveAddress,
    savedAddress,
    logout,
    navigateTo,
    login,
    register,
    currentView
  } = useStore();

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Address edit toggler
  const [editingAddress, setEditingAddress] = useState(false);
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPostal, setAddrPostal] = useState('');

  // Local inline auth toggles for guests
  const [isSignMode, setIsSignMode] = useState(true); // true = Login, false = Register

  // Synchronize view state triggers ('login' / 'register' clicks)
  useEffect(() => {
    if (currentView === 'register') {
      setIsSignMode(false);
    } else if (currentView === 'login') {
      setIsSignMode(true);
    }
  }, [currentView]);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPass, setAuthConfirmPass] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    // Filter orders matching current authenticated user
    return orders.filter(o => o.userId === currentUser.id);
  }, [orders, currentUser]);

  const handleEditAddressClick = () => {
    if (savedAddress) {
      setAddrStreet(savedAddress.address);
      setAddrCity(savedAddress.city);
      setAddrState(savedAddress.state);
      setAddrPostal(savedAddress.postalCode);
    }
    setEditingAddress(true);
  };

  const handleSaveAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addrStreet.trim() && addrCity.trim() && addrState.trim() && addrPostal.trim()) {
      saveAddress(addrStreet.trim(), addrCity.trim(), addrState.trim(), addrPostal.trim());
      setEditingAddress(false);
    }
  };

  // Inline auth handler for non-authenticated states
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (isSignMode) {
      const resp = login(authEmail, authPassword);
      if (!resp.success) {
        setAuthError(resp.error || 'Login failed.');
      }
    } else {
      if (authEmail.trim() === '' || authPassword.trim() === '' || authUsername.trim() === '') {
        setAuthError('All data fields are required.');
        return;
      }
      if (authPassword !== authConfirmPass) {
        setAuthError('Passwords do not match.');
        return;
      }
      const resp = register(authUsername, authEmail, authPassword);
      if (!resp.success) {
        setAuthError(resp.error || 'Registration failed.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-emerald-400 bg-emerald-950/35 border-emerald-500/20';
      case 'Shipped':
        return 'text-cyan-400 bg-cyan-950/35 border-cyan-500/20';
      case 'Processing':
        return 'text-amber-400 bg-amber-950/35 border-amber-500/20';
      default:
        return 'text-fuchsia-400 bg-fuchsia-950/35 border-fuchsia-500/20';
    }
  };

  // If NOT logged in (Guest State), show sleek glassmorphism auth gating
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050508]/20 py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-[rgba(20,20,35,0.7)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md p-6 rounded-xl shadow-[0_0_30px_rgba(0,209,255,0.08)] space-y-4">
          
          {/* Header toggler */}
          <div className="text-center space-y-1.5">
            <span className="inline-flex items-center space-x-1 text-[#00d1ff] font-mono text-[9px] uppercase font-bold tracking-widest border border-cyan-500/20 bg-cyan-950/20 px-2.5 py-0.5 rounded">
              <Lock size={10} />
              <span>GATED CLIENT SYSTEM</span>
            </span>
            <h1 className="text-lg font-bold font-sans tracking-tight text-white uppercase">
              {isSignMode ? 'SECURE_LOGIN' : 'CLIENT_REGISTER'}
            </h1>
          </div>

          {authError && (
            <div className="p-2 bg-rose-950/40 text-rose-400 text-[11px] border border-rose-500/30 rounded font-mono">
              ! ERROR: {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-3 font-mono text-xs">
            
            {!isSignMode && (
              <div className="space-y-1">
                <label className="text-slate-400 block text-[10px]">USERNAME_SIGNATURE:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. john_doe"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-slate-400 block text-[10px]">EMAIL_ADDRESS:</label>
              <input
                type="email"
                required
                placeholder="user@eajstore.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 block text-[10px]">KEY_CODES (PASSWORD):</label>
              <input
                type="password"
                required
                placeholder="password (min 4 chars)"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
              />
            </div>

            {!isSignMode && (
              <div className="space-y-1">
                <label className="text-slate-400 block text-[10px]">RE-VAL_KEY_CODES:</label>
                <input
                  type="password"
                  required
                  placeholder="re-enter password"
                  value={authConfirmPass}
                  onChange={(e) => setAuthConfirmPass(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-90 text-white font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,195,255,0.15)] cursor-pointer"
            >
              {isSignMode ? 'AUTHENTICATE SYSTEM' : 'INITIALIZE CLIENT'}
            </button>
          </form>

          {/* Toggle trigger footer */}
          <div className="text-[11px] font-mono text-center text-slate-500 pt-2 border-t border-[rgba(255,255,255,0.1)]">
            {isSignMode ? (
              <span>Not registered? <button onClick={() => { setIsSignMode(false); setAuthError(null); }} className="text-[#00d1ff] font-bold hover:underline cursor-pointer">Create credentials</button></span>
            ) : (
              <span>Have coordinates? <button onClick={() => { setIsSignMode(true); setAuthError(null); }} className="text-[#00d1ff] font-bold hover:underline cursor-pointer">Authenticate instead</button></span>
            )}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Header info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[rgba(255,255,255,0.1)] pb-6 mb-8">
          <div className="space-y-1">
            <span className="inline-flex items-center space-x-1.5 text-fuchsia-400 font-mono text-[9px] uppercase font-bold tracking-widest border border-fuchsia-500/20 bg-fuchsia-950/20 px-2.5 py-0.5 rounded">
              <span>ACTIVE USER TERMINAL</span>
            </span>
            <h1 className="text-xl font-bold font-sans tracking-wider uppercase text-white">
              WELCOME USER: {currentUser.username}
            </h1>
          </div>

          <div className="flex items-center space-x-3 font-mono">
            <button
              onClick={() => navigateTo('home')}
              className="px-3 py-1.5 border border-[rgba(255,255,255,0.1)] hover:border-[#00d1ff]/50 rounded text-xs font-bold text-slate-350 transition cursor-pointer"
            >
              ← RETURN TO STOREFRONT
            </button>
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-rose-955/40 text-rose-400 border border-rose-500/30 hover:bg-rose-900/30 rounded text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut size={12} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Dash Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Profiles config and address ledger (4 columns) */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            
            {/* profile metadata details card */}
            <div className="bg-[rgba(20,20,35,0.7)] p-5 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md space-y-4">
              <div className="flex items-center space-x-2 text-[#00d1ff] border-b border-[rgba(255,255,255,0.1)] pb-3">
                <User size={14} />
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider">SECURE CLIENT META</h4>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="block text-[#a0a0c0] text-[10px]">CLIENT_ID_NODE:</span>
                  <span className="block font-semibold text-slate-300">{currentUser.id}</span>
                </div>
                <div>
                  <span className="block text-[#a0a0c0] text-[10px]">SIGNATURE_NAME:</span>
                  <span className="block font-semibold text-slate-300">{currentUser.username}</span>
                </div>
                <div>
                  <span className="block text-[#a0a0c0] text-[10px]">AUTHENTICATED_EMAIL:</span>
                  <span className="block font-semibold text-slate-300">{currentUser.email}</span>
                </div>
                <div>
                  <span className="block text-[#a0a0c0] text-[10px]">AUTHORIZED_ROLE:</span>
                  <span className="block font-semibold text-[#9d00ff] uppercase">{currentUser.role}</span>
                </div>
                <div className="border-t border-[rgba(255,255,255,0.1)] pt-2">
                  <span className="block text-[#a0a0c0] text-[10px]">CREATED_LEDGER_STAMP:</span>
                  <span className="block font-semibold text-slate-400">
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Address cards dynamic edit */}
            <div className="bg-[rgba(20,20,35,0.7)] p-5 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-3">
                <div className="flex items-center space-x-2 text-[#00d1ff]">
                  <MapPin size={14} />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">SAVED_ADDRESS_MATRIX</h4>
                </div>
                {!editingAddress && savedAddress && (
                  <button
                    onClick={handleEditAddressClick}
                    className="text-[10px] font-mono text-[#00d1ff] hover:underline font-bold cursor-pointer"
                  >
                    MODIFY
                  </button>
                )}
              </div>

              {editingAddress ? (
                <form onSubmit={handleSaveAddressSubmit} className="space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-[#a0a0c0] text-[10px]">STREET:</span>
                    <input
                      type="text"
                      required
                      value={addrStreet}
                      onChange={(e) => setAddrStreet(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[#00d1ff] rounded px-2 py-1 text-slate-150 font-bold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#a0a0c0] text-[10px]">CITY:</span>
                    <input
                      type="text"
                      required
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[#00d1ff] rounded px-2 py-1 text-slate-150 font-bold focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[#a0a0c0] text-[10px]">STATE:</span>
                      <input
                        type="text"
                        required
                        value={addrState}
                        onChange={(e) => setAddrState(e.target.value)}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[#00d1ff] rounded px-2 py-1 text-slate-150 font-bold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#a0a0c0] text-[10px]">ZIP:</span>
                      <input
                        type="text"
                        required
                        value={addrPostal}
                        onChange={(e) => setAddrPostal(e.target.value)}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[#00d1ff] rounded px-2 py-1 text-slate-150 font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-1">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[rgba(0,209,255,0.1)] border border-[rgba(0,209,255,0.2)] text-[#00d1ff] rounded hover:opacity-80 font-bold cursor-pointer"
                    >
                      SAVE
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAddress(false)}
                      className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-slate-400 rounded cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              ) : savedAddress ? (
                <div className="space-y-2 font-mono text-xs">
                  <p className="font-bold text-slate-300">{currentUser.username === 'john_doe' ? 'John Doe' : currentUser.username}</p>
                  <p className="text-slate-450 leading-relaxed text-[11px] bg-[rgba(10,10,20,0.5)] p-2.5 rounded border border-[rgba(255,255,255,0.05)]">
                    {savedAddress.address}<br />
                    {savedAddress.city}, {savedAddress.state} {savedAddress.postalCode}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4 font-mono text-[10px] text-slate-500 space-y-2 leading-relaxed">
                  <p>No default shipping addresses stored on local client ledger.</p>
                  <button
                    onClick={() => {
                      setAddrStreet(''); setAddrCity(''); setAddrState(''); setAddrPostal('');
                      setEditingAddress(true);
                    }}
                    className="px-3 py-1 bg-[rgba(255,255,255,0.02)] text-[#00d1ff] font-bold border rounded border-[rgba(255,255,255,0.1)] cursor-pointer hover:border-[#00d1ff]/40"
                  >
                    ADD ADDRESS
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right panel: Historial order matrices (8 columns) */}
          <div className="lg:col-span-12 xl:col-span-8 bg-[rgba(20,20,35,0.7)] p-4 sm:p-6 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            
            <div className="flex items-center space-x-2 border-b border-[rgba(255,255,255,0.1)] pb-4 mb-4">
              <Clipboard className="text-[#9d00ff]" size={16} />
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">HISTORIC_ORDER_LOGS (ARCHIVE)</h2>
            </div>

            {userOrders.length > 0 ? (
              <div className="space-y-3 font-mono text-xs">
                {userOrders.map(order => {
                  const items = orderItems.filter(item => item.orderId === order.id);
                  const isExpanded = expandedOrderId === order.id;

                  return (
                    <div
                      key={order.id}
                      className="rounded bg-[rgba(10,10,20,0.5)] p-3.5 border border-[rgba(255,255,255,0.05)] space-y-3"
                    >
                      {/* Top Header summarizing order block */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[rgba(255,255,255,0.05)] text-[11px]">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <div>
                            <span className="text-[#a0a0c0]">ORDER_ID:</span>
                            <span className="text-[#00d1ff] font-bold tracking-wider ml-1">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-[#a0a0c0]">DATE:</span>
                            <span className="text-slate-350 font-bold ml-1">
                              {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded border text-[9px] font-bold ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                          <span className="font-extrabold text-slate-100 text-xs">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Expandable items detail line */}
                      <div className="flex items-center justify-between text-[11px] text-[#a0a0c0]">
                        <span>Items in summary: <span className="font-bold text-slate-200">{items.reduce((tot, i) => tot + i.quantity, 0)} units</span></span>
                        <button
                          onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                          className="text-[#00d1ff] hover:underline font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>{isExpanded ? 'CLOSE_MANIFEST' : 'OPEN_MANIFEST'}</span>
                        </button>
                      </div>

                      {/* Manifest breakdown expanded state */}
                      {isExpanded && (
                        <div className="pt-2 border-t border-[rgba(255,255,255,0.05)] space-y-3 animate-fade-in text-[11px]">
                          <div className="space-y-2 bg-[rgba(10,10,20,0.6)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
                            {items.map(item => (
                              <div key={item.id} className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-1.5 last:border-0 last:pb-0 font-sans text-slate-300">
                                <div className="flex items-center space-x-2 w-3/4">
                                  <div className="h-6 w-6 rounded overflow-hidden bg-slate-900 border border-[rgba(255,255,255,0.05)]">
                                    <img src={item.productImage} className="w-full h-full object-cover" alt={item.productName} />
                                  </div>
                                  <span className="truncate">{item.productName} <span className="font-mono text-[#00d1ff] font-medium text-[9px]">x{item.quantity}</span></span>
                                </div>
                                <span className="text-right font-mono font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Shipping track state breakdown */}
                          <div className="bg-[rgba(10,10,20,0.4)] p-3 rounded border border-[rgba(255,255,255,0.05)] space-y-1 font-mono text-[9px] text-[#a0a0c0]">
                            <span className="block text-[#9d00ff] font-bold uppercase">DELIVERY ADDRESS DETAILS:</span>
                            <span className="block font-bold">{order.fullName} | {order.phone}</span>
                            <span className="block leading-relaxed">{order.shippingAddress}, {order.city}, {order.state} {order.postalCode}</span>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center space-y-3 bg-[rgba(10,10,20,0.2)] border border-[rgba(255,255,255,0.05)] rounded">
                <div className="text-slate-500 font-mono text-[10px] uppercase leading-relaxed">
                  :: SYSTEM_WARN: NO PREVIOUS ORDER REGISTERS DETECTED ::
                </div>
                <p className="text-[#a0a0c0] text-[11px] max-w-sm mx-auto">
                  Place order matrices in the shopping checkout array and they will trace synchronously here.
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-xs font-bold font-mono text-[#00d1ff] rounded cursor-pointer hover:border-[#00d1ff]/50"
                >
                  BROWSE COMPUTER PRODUCTS
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
