import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Send, ShieldCheck, CreditCard } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    products,
    currentUser,
    savedAddress,
    placeOrder,
    navigateTo
  } = useStore();

  // Form states initialized with user data if they exist
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  // Custom secure Razorpay modal portal states
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayMethod, setRazorpayMethod] = useState<'methods' | 'card' | 'upi' | 'netbank' | 'processing' | 'otp' | 'success'>('methods');
  const [rCardNumber, setRCardNumber] = useState('');
  const [rCardExpiry, setRCardExpiry] = useState('');
  const [rCardCvv, setRCardCvv] = useState('');
  const [rCardName, setRCardName] = useState('');
  const [rUpiId, setRUpiId] = useState('');
  const [rBank, setRBank] = useState('');
  const [rOtp, setROtp] = useState('');
  const [rOtpTimer, setROtpTimer] = useState(30);
  const [rError, setRError] = useState<string | null>(null);
  const [rProcessingStep, setRProcessingStep] = useState('');

  useEffect(() => {
    let interval: any;
    if (showRazorpay && razorpayMethod === 'otp' && rOtpTimer > 0) {
      interval = setInterval(() => {
        setROtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [showRazorpay, razorpayMethod, rOtpTimer]);

  const handlePaymentSuccess = () => {
    // Compile order record
    const resultOrder = placeOrder({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim()
    });

    if (resultOrder) {
      // success routing is handled inside placeOrder context!
    } else {
      setFormError('Direct stock conflict discovered. Reduce cart quantity nodes.');
    }
    setShowRazorpay(false);
    setRazorpayMethod('methods');
  };

  // Sync address fields once currentUser details pull in
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.username === 'john_doe' ? 'John Doe' : currentUser.username);
      setEmail(currentUser.email);
    }
    if (savedAddress) {
      setAddress(savedAddress.address || '');
      setCity(savedAddress.city || '');
      setState(savedAddress.state || '');
      setPostalCode(savedAddress.postalCode || '');
    }
  }, [currentUser, savedAddress]);

  // Compute checkout totals inside local memory for rendering
  const subtotal = cart.reduce((total, item) => {
    const prod = products.find(p => p.id === item.productId);
    const price = prod?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.0825; // 8.25% Sales tax
  const shipping = subtotal > 150 ? 0 : 9.99;
  const grandTotal = subtotal + tax + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Input Validations
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !state.trim() || !postalCode.trim()) {
      setFormError('All checkout shipping fields are critical. Please complete the form.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please input a valid contact email address.');
      return;
    }

    // Intercept to show Razorpay Checkout Modal
    setShowRazorpay(true);
    setRazorpayMethod('methods');
    setRError(null);
  };

  // Prevent accessing checkout with empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#050508]/20 py-24 text-center flex items-center justify-center">
        <div className="max-w-md mx-auto space-y-4 px-4 bg-[rgba(20,20,35,0.7)] p-6 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
          <ShieldCheck className="text-[#00d1ff] mx-auto" size={36} />
          <h2 className="text-xs font-bold font-mono text-slate-100 uppercase">NO ACTIVE CART ARRAY</h2>
          <p className="text-[11px] text-[#a0a0c0]">
            Cannot execute a transaction summary with empty cart configurations. Load your ledger from our shopfront.
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-xs font-bold font-mono text-[#00d1ff] rounded cursor-pointer hover:border-[#00d1ff]/50"
          >
            CATALOG SHOPFRONT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and back button links */}
        <div className="mb-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="text-[#00d1ff]" size={18} />
            <h1 className="text-sm font-bold font-mono tracking-wider uppercase text-white">SECURE_ORDER_DISPATCH</h1>
          </div>
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-[#00d1ff] transition cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>ADJUST CART LEDGER</span>
          </button>
        </div>

        {/* Form and Sum Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Input Shipping Fields (7 cols) */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-12 xl:col-span-7 bg-[rgba(20,20,35,0.7)] p-4 sm:p-6 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md space-y-4">
            
            <div className="flex items-center space-x-1.5 text-[#00d1ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00d1ff]"></span>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider">SECURE SHIPPING DATA</h3>
            </div>

            {/* Error Overlay */}
            {formError && (
              <div className="p-3 bg-rose-950/40 text-rose-400 text-xs border border-rose-500/30 rounded font-mono">
                ! SYS_ERROR: {formError}
              </div>
            )}

            {/* Forms layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-[10px] font-bold text-[#a0a0c0]">FULL NAME REGISTER:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[#a0a0c0]">CONTACT E-MAIL:</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@eajstore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[#a0a0c0]">PHONE TERMINAL:</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-[10px] font-bold text-[#a0a0c0]">STREET SHIPPING ROUTE:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 432 Tech Boulevard"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[#a0a0c0]">CITY CODE:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. San Jose"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                />
              </div>

              {/* State and Postal */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[#a0a0c0] font-mono">STATE:</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    placeholder="e.g. CA"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[#a0a0c0] font-mono">POSTAL_ZIP:</label>
                  <input
                    type="text"
                    required
                    placeholder="95112"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-xs text-slate-100 placeholder-[#a0a0c0] focus:outline-none focus:border-[#00d1ff]"
                  />
                </div>
              </div>

            </div>

            {/* Prompt for unregistered guests */}
            {!currentUser && (
              <div className="p-2.5 bg-[#9d00ff]/10 border border-[#9d00ff]/20 rounded text-[10px] text-[#9d00ff] font-mono leading-relaxed">
                * Note: Placing order as GUEST. To keep logs in your personal secure order dashboard and save addresses, sign up or login prior to submitting.
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-90 text-white font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,195,255,0.15)] transition duration-150 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send size={12} />
                <span>CONFIRM & PLACE ORDER</span>
              </button>
            </div>

          </form>

          {/* Right: Order Summary Details (5 cols) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-4">
            
            <div className="bg-[rgba(20,20,35,0.7)] p-4 sm:p-5 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md space-y-4">
              
              <div className="flex items-center space-x-1.5 text-[#9d00ff] border-b border-[rgba(255,255,255,0.1)] pb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9d00ff] animate-ping"></span>
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider">DISPATCH ARRAYS</h3>
              </div>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                {cart.map(item => {
                  const prod = products.find(p => p.id === item.productId);
                  if (!prod) return null;

                  return (
                    <div key={item.id} className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center space-x-2 truncate w-3/4">
                        <div className="h-8 w-8 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] overflow-hidden flex-shrink-0">
                          <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                        </div>
                        <div className="truncate">
                          <span className="block font-bold text-slate-300 uppercase truncate text-[10px]">{prod.name}</span>
                          <span className="text-[#a0a0c0] text-[9px]">Qty: {item.quantity} x ${prod.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <span className="text-slate-200 font-bold tracking-tight">${(prod.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal fields */}
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-3.5 space-y-2.5 font-mono text-[11px]">
                
                <div className="flex items-center justify-between text-[#a0a0c0]">
                  <span>PRODUCTS_SUBTOTAL:</span>
                  <span className="text-slate-200">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-[#a0a0c0]">
                  <span>ENVIRONMENT_TAX (8.25%):</span>
                  <span className="text-slate-200">${tax.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-[#a0a0c0]">
                  <span>SHIPPING_FREIGHT:</span>
                  {shipping === 0 ? (
                    <span className="text-[#00d1ff] font-bold">FREE EXPEDITED</span>
                  ) : (
                    <span className="text-slate-200">${shipping.toFixed(2)}</span>
                  )}
                </div>

                <div className="border-t border-[rgba(255,255,255,0.1)] pt-2.5 flex items-center justify-between font-bold text-slate-200 text-xs">
                  <span>GRAND_TOTAL:</span>
                  <span className="text-[#9d00ff] font-black text-sm">${grandTotal.toFixed(2)}</span>
                </div>

              </div>

            </div>

            {/* Solid assurance */}
            <div className="p-3 rounded border border-[rgba(0,209,255,0.2)] bg-[rgba(0,209,255,0.05)] flex items-start space-x-2.5">
              <ShieldCheck className="text-[#00d1ff] flex-shrink-0 mt-0.5" size={16} />
              <div className="space-y-0.5">
                <h4 className="font-mono font-bold text-[10px] text-[#00d1ff]">BUYER ASSURANCE ACT</h4>
                <p className="text-[10px] text-[#a0a0c0] leading-relaxed font-sans">
                  All systems order processing are sandboxed locally for secure simulation. Inventory stocks are decremented synchronously on confirmation. 
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Razorpay Brand Portal Overlay */}
      {showRazorpay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-md bg-[#0e0e1a] rounded-lg border border-[rgba(157,0,255,0.3)] shadow-[0_0_50px_rgba(157,0,255,0.2)] overflow-hidden flex flex-col text-slate-100">
            
            {/* Razorpay Header bar */}
            <div className="p-4 bg-gradient-to-r from-[#191930] to-[#0c0c16] border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between col-span-1">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 rounded bg-[#3399cc] flex items-center justify-center text-white font-extrabold text-[10px]">
                  R
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-wider text-slate-100 uppercase">RAZORPAY SECURE GATEWAY</h3>
                  <p className="text-[8px] font-mono tracking-widest text-[#00d1ff] uppercase">TRANSACTION CHANNEL SECURE</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRazorpay(false)}
                className="text-xs text-slate-400 hover:text-white bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded transition cursor-pointer font-mono"
              >
                CANCEL ×
              </button>
            </div>

            {/* Merchant info block */}
            <div className="px-4 py-3 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between font-mono text-[10px]">
              <div>
                <span className="text-[#a0a0c0] block uppercase tracking-tight text-[8px]">MERCHANT RECOGNITION:</span>
                <span className="text-slate-100 font-bold uppercase">EAJ HARDWARE REPOSITORIES</span>
              </div>
              <div className="text-right">
                <span className="text-[#a0a0c0] block uppercase tracking-tight text-[8px]">NET AMOUNT DUE:</span>
                <span className="text-[#00d1ff] font-extrabold text-xs">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Error alerts inside modal */}
            {rError && (
              <div className="m-4 p-2.5 bg-rose-950/40 text-rose-400 text-[10px] border border-rose-500/30 rounded font-mono">
                ! SYS_ERROR: {rError}
              </div>
            )}

            {/* Main viewports */}
            <div className="p-5 flex-grow overflow-y-auto space-y-4">
              
              {/* Method selection panel */}
              {razorpayMethod === 'methods' && (
                <div className="space-y-4">
                  <span className="block text-[10px] font-bold font-mono text-[#a0a0c0] uppercase tracking-wider">SELECT PREFERRED INTEGRATION:</span>
                  
                  <div className="grid grid-cols-1 gap-2.5 font-mono">
                    
                    {/* Safe Credit Card Option */}
                    <button
                      type="button"
                      onClick={() => setRazorpayMethod('card')}
                      className="w-full text-left p-3.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[#9d00ff]/50 rounded hover:bg-[#9d00ff]/5 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">💳</span>
                        <div>
                          <span className="block text-[11px] font-bold text-white group-hover:text-[#9d00ff] transition-colors">DEBIT OR CREDIT CARD</span>
                          <span className="text-[8px] text-[#a0a0c0]">Visa, Mastercard, RuPay, Maestro</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">→</span>
                    </button>

                    {/* UPI Option */}
                    <button
                      type="button"
                      onClick={() => setRazorpayMethod('upi')}
                      className="w-full text-left p-3.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[#00d1ff]/50 rounded hover:bg-[#00d1ff]/5 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">⚡</span>
                        <div>
                          <span className="block text-[11px] font-bold text-white group-hover:text-[#00d1ff] transition-colors">UPI INSTANT TRANSFER</span>
                          <span className="text-[8px] text-[#a0a0c0]">Google Pay, PhonePe, Paytm, BHIM</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">→</span>
                    </button>

                    {/* NetBanking Option */}
                    <button
                      type="button"
                      onClick={() => setRazorpayMethod('netbank')}
                      className="w-full text-left p-3.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[#00d1ff]/50 rounded hover:bg-[#00d1ff]/5 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🏦</span>
                        <div>
                          <span className="block text-[11px] font-bold text-white group-hover:text-[#00d1ff] transition-colors">NET BANKING PORTAL</span>
                          <span className="text-[8px] text-[#a0a0c0]">Select from 50+ registered Indian Banks</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">→</span>
                    </button>

                  </div>
                </div>
              )}

              {/* Card option panel */}
              {razorpayMethod === 'card' && (
                <div className="space-y-3 font-mono text-[10px]">
                  <div className="flex items-center justify-between pb-1 border-b border-[rgba(255,255,255,0.05)]">
                    <span className="block font-bold text-[#a0a0c0] uppercase">CARD SPECIFICATIONS:</span>
                    <button
                      type="button"
                      onClick={() => setRazorpayMethod('methods')}
                      className="text-slate-400 hover:text-[#00d1ff] flex items-center text-[9px] cursor-pointer bg-transparent border-none"
                    >
                      ← INSTRUMENTS
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[#a0a0c0]">CARD NUMBER:</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4111 2222 3333 4444"
                      value={rCardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                        const matches = val.match(/\d{4,16}/g);
                        const match = (matches && matches[0]) || '';
                        const parts = [];
                        for (let i = 0, len = match.length; i < len; i += 4) {
                          parts.push(match.substring(i, i + 4));
                        }
                        setRCardNumber(parts.length > 0 ? parts.join(' ') : val);
                      }}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-[#9d00ff] rounded px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[#a0a0c0]">EXPIRY (MM/YY):</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="12/28"
                        value={rCardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + '/' + val.substring(2, 4);
                          }
                          setRCardExpiry(val);
                        }}
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-[#9d00ff] rounded px-3 py-2 text-xs text-white text-center outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[#a0a0c0]">CVV:</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="***"
                        value={rCardCvv}
                        onChange={(e) => setRCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-[#9d00ff] rounded px-3 py-2 text-xs text-white text-center outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pb-2">
                    <label className="block text-[#a0a0c0]">CARDHOLDER LEGAL NAME:</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={rCardName}
                      onChange={(e) => setRCardName(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-[#9d00ff] rounded px-3 py-2 text-xs text-white font-mono uppercase outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!rCardNumber || !rCardExpiry || !rCardCvv || !rCardName) {
                        setRError('Card entries cannot remain incomplete.');
                        return;
                      }
                      setRError(null);
                      setRazorpayMethod('processing');
                      setRProcessingStep('Contacting Card-Issuing Bank Gateway...');
                      setTimeout(() => {
                        setRProcessingStep('Submitting secure payment authentication challenge...');
                        setTimeout(() => {
                          setRazorpayMethod('otp');
                          setROtpTimer(30);
                        }, 1200);
                      }, 1000);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-[#9d00ff] to-[#f000ff] hover:opacity-90 rounded font-black text-xs text-white uppercase cursor-pointer"
                    id="razorpay-pay-card-btn"
                  >
                    PAY SECURELY ${grandTotal.toFixed(2)}
                  </button>
                </div>
              )}

              {/* UPI option panel */}
              {razorpayMethod === 'upi' && (
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="flex items-center justify-between pb-1 border-b border-[rgba(255,255,255,0.05)]">
                    <span className="block font-bold text-[#a0a0c0] uppercase">UPI IDENTIFICATION (VPA):</span>
                    <button
                      type="button"
                      onClick={() => setRazorpayMethod('methods')}
                      className="text-slate-400 hover:text-[#00d1ff] flex items-center text-[9px] cursor-pointer bg-transparent border-none"
                    >
                      ← INSTRUMENTS
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {['@okhdfcbank', '@okaxis', '@okicici', '@ybl'].map(vpa => (
                      <button
                        type="button"
                        key={vpa}
                        onClick={() => setRUpiId((email ? email.split('@')[0] : 'payment') + vpa)}
                        className="p-1 px-1.5 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[9px] hover:border-[#00d1ff] truncate text-[#00d1ff] text-center cursor-pointer"
                      >
                        {vpa}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1 pb-2">
                    <label className="block text-[#a0a0c0]">VIRTUAL PAYMENT ADDRESS (VPA):</label>
                    <input
                      type="text"
                      placeholder="e.g. name@okhdfcbank"
                      value={rUpiId}
                      onChange={(e) => setRUpiId(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-[#00d1ff] rounded px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!rUpiId || !rUpiId.includes('@')) {
                        setRError('Please supply a valid UPI ID (e.g. user@okhdfcbank).');
                        return;
                      }
                      setRError(null);
                      setRazorpayMethod('processing');
                      setRProcessingStep('Sending UPI Collect Notification to mobile device...');
                      setTimeout(() => {
                        setRProcessingStep('Waiting for transaction verification in your UPI App...');
                        setTimeout(() => {
                          setRazorpayMethod('otp');
                          setROtpTimer(30);
                        }, 1200);
                      }, 1000);
                    }}
                    className="w-full py-2 bg-[#00d1ff] text-slate-950 font-black text-xs rounded uppercase hover:opacity-95 cursor-pointer"
                    id="razorpay-pay-upi-btn"
                  >
                    TRIGGER UPI COLLECT: ${grandTotal.toFixed(2)}
                  </button>
                </div>
              )}

              {/* NetBanking option panel */}
              {razorpayMethod === 'netbank' && (
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="flex items-center justify-between pb-1 border-b border-[rgba(255,255,255,0.05)]">
                    <span className="block font-bold text-[#a0a0c0] uppercase">NETBANKING ORIGIN:</span>
                    <button
                      type="button"
                      onClick={() => setRazorpayMethod('methods')}
                      className="text-slate-400 hover:text-[#00d1ff] flex items-center text-[9px] cursor-pointer bg-transparent border-none"
                    >
                      ← INSTRUMENTS
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {[
                      { name: 'State Bank of India', icon: '🏦' },
                      { name: 'HDFC Bank Customer', icon: '🛡️' },
                      { name: 'ICICI Retail Core', icon: '💳' },
                      { name: 'Axis Bank Network', icon: '🌐' }
                    ].map(bank => (
                      <button
                        type="button"
                        key={bank.name}
                        onClick={() => setRBank(bank.name)}
                        className={`p-3 text-[10px] text-left rounded-lg border text-slate-200 transition-all flex items-center space-x-2 cursor-pointer ${
                          rBank === bank.name
                            ? 'bg-[#00d1ff]/10 border-[#00d1ff] text-[#00d1ff]'
                            : 'bg-slate-950/40 border-[rgba(255,255,255,0.05)] hover:border-slate-500'
                        }`}
                      >
                        <span>{bank.icon}</span>
                        <span className="truncate">{bank.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pb-2">
                    <span className="text-[9px] text-slate-500">
                      * Secure authentication payload will be launched sequentially.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!rBank) {
                        setRError('Select a banking node.');
                        return;
                      }
                      setRError(null);
                      setRazorpayMethod('processing');
                      setRProcessingStep(`Redirecting securely to ${rBank} portal...`);
                      setTimeout(() => {
                        setRProcessingStep('Establishing SSL connection token with banking core...');
                        setTimeout(() => {
                          setRazorpayMethod('otp');
                          setROtpTimer(30);
                        }, 1200);
                      }, 1000);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-90 rounded font-black text-xs text-white uppercase cursor-pointer"
                    id="razorpay-pay-bank-btn"
                  >
                    PROCEED WITH {rBank ? rBank.toUpperCase() : 'BANKING'}
                  </button>
                </div>
              )}

              {/* Processing loading state */}
              {razorpayMethod === 'processing' && (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 font-mono">
                  <div className="h-10 w-10 rounded-full border-2 border-t-transparent border-[#00d1ff] animate-spin"></div>
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold text-white uppercase">CONNECTING APIS...</span>
                    <p className="text-[9px] text-[#a0a0c0] animate-pulse">{rProcessingStep}</p>
                  </div>
                </div>
              )}

              {/* OTP screen */}
              {razorpayMethod === 'otp' && (
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded space-y-1.5 text-center">
                    <span className="block font-bold text-slate-200">INTERACTIVE SECURE PASSWORD VALIDATOR</span>
                    <p className="text-[9px] text-[#a0a0c0]">
                      A OTP test challenge is active. Input the 6-digit numeric OTP code below.
                    </p>
                    <span className="inline-block bg-slate-900 px-2 py-0.5 rounded text-[10px] font-bold text-[#00d1ff]">
                      TEST CODE: 123456
                    </span>
                  </div>

                  <div className="space-y-2 text-center">
                    <label className="block text-[#a0a0c0] mb-1">INPUT 6-DIGIT OTP:</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={rOtp}
                      onChange={(e) => setROtp(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-28 text-center bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.2)] focus:border-[#00d1ff] rounded py-1.5 text-base tracking-widest text-[#00d1ff] font-bold focus:outline-none"
                    />
                  </div>

                  <div className="text-center text-[9px] text-slate-500">
                    OTP Counter: <span className="text-[#00d1ff] font-bold">{rOtpTimer}s</span> remaining.
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (rOtp !== '123456' && rOtp.length !== 6) {
                        setRError('The OTP entered is invalid. Try using code "123456".');
                        return;
                      }
                      setRError(null);
                      setRazorpayMethod('processing');
                      setRProcessingStep('Verifying 3-D secure challenge signature token...');
                      setTimeout(() => {
                        setRProcessingStep('Finalizing server billing allocation...');
                        setTimeout(() => {
                          setRazorpayMethod('success');
                          setTimeout(() => {
                            handlePaymentSuccess();
                          }, 1200);
                        }, 1000);
                      }, 1200);
                    }}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded uppercase tracking-wide cursor-pointer animate-pulse"
                    id="submit-otp-primary-btn"
                  >
                    VERIFY PAYMENT PAYLOAD
                  </button>
                </div>
              )}

              {/* Payment Completed Success state */}
              {razorpayMethod === 'success' && (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 font-mono text-[10px]">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-emerald-400 uppercase">SYS_PAYMENT_CAPTURED</span>
                    <p className="text-[9px] text-[#a0a0c0]">
                      Transaction matched securely. Initializing server ledger database synchronization...
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Shield PCI assurance disclaimer footer */}
            <div className="p-3 bg-slate-950 border-t border-[rgba(255,255,255,0.05)] text-center text-[8px] font-mono text-slate-500 flex items-center justify-center space-x-1">
              <span>🛡️</span>
              <span>PCI-DSS SECURED • MOCKING SANDBOX ENABLED (NO REAL INSTRUMENTS CHARGED)</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
