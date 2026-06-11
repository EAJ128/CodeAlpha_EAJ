import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, ShieldCheck, ArrowRight, Clipboard } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const {
    currentPlacedOrderId,
    orders,
    orderItems,
    navigateTo
  } = useStore();

  const orderDetails = useMemo(() => {
    return orders.find(o => o.id === currentPlacedOrderId) || null;
  }, [orders, currentPlacedOrderId]);

  const items = useMemo(() => {
    if (!currentPlacedOrderId) return [];
    return orderItems.filter(item => item.orderId === currentPlacedOrderId);
  }, [orderItems, currentPlacedOrderId]);

  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderId = () => {
    if (currentPlacedOrderId) {
      navigator.clipboard.writeText(currentPlacedOrderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Success Card Grid layout with neon overlays */}
        <div className="relative rounded-xl bg-[rgba(20,20,35,0.7)] p-6 sm:p-8 border border-[rgba(0,209,255,0.2)] shadow-[0_0_40px_rgba(0,209,255,0.12)] backdrop-blur-md overflow-hidden text-center space-y-6">
          
          {/* Animated decorative spot glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-[#00d1ff]/10 blur-3xl pointer-events-none"></div>

          {/* Icon */}
          <div className="relative inline-flex items-center justify-center h-12 w-12 bg-gradient-to-tr from-[#00d1ff] to-[#9d00ff] rounded-full shadow-[0_0_20px_rgba(0,209,255,0.3)] animate-pulse mt-2">
            <CheckCircle className="text-white" size={24} />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans uppercase">
              TRANSACTION APPROVED
            </h1>
            <p className="text-xs text-[#a0a0c0] max-w-sm mx-auto leading-relaxed">
              Your computing nodes have been successfully compiled and registered into our active delivery stream.
            </p>
          </div>

          {/* Order reference ID card */}
          {currentPlacedOrderId && (
            <div className="mx-auto max-w-xs rounded bg-[rgba(10,10,20,0.9)] p-3 border border-[rgba(255,255,255,0.05)] font-mono text-center space-y-1 relative group">
              <span className="block text-[9px] text-[#a0a0c0] tracking-wider">REFERENCE_ORDER_ID:</span>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm font-black text-[#00d1ff] select-all tracking-wider">{currentPlacedOrderId}</span>
                <button
                  onClick={handleCopyOrderId}
                  title="Copy reference ID"
                  className="p-1 rounded text-[#a0a0c0] hover:text-[#00d1ff] hover:bg-slate-800 transition flex items-center space-x-1 cursor-pointer"
                >
                  <Clipboard size={12} />
                  {copied && <span className="text-[10px] text-emerald-450">Copied!</span>}
                </button>
              </div>
            </div>
          )}

          {/* Quick specs order breakdown list */}
          {orderDetails && (
            <div className="text-left bg-[rgba(10,10,20,0.4)] rounded p-4 border border-[rgba(255,255,255,0.05)] space-y-2.5 font-mono text-[11px]">
              <div className="flex justify-between text-[#a0a0c0] font-bold border-b border-[rgba(255,255,255,0.05)] pb-1.5">
                <span>RECONCILED NODES:</span>
                <span>STATE</span>
              </div>
              
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {items.map(it => (
                  <div key={it.id} className="flex justify-between items-center text-[10px] text-slate-300">
                    <span className="truncate max-w-[280px]">{it.productName} (x{it.quantity})</span>
                    <span className="text-slate-400 font-bold">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.05)] pt-2 flex justify-between font-bold text-slate-200">
                <span>TOTAL RECONCILED AMOUNT:</span>
                <span className="text-[#9d00ff]">${orderDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Shipping state indicator alerts */}
          <div className="p-3 bg-[rgba(0,209,255,0.05)] border border-[rgba(0,209,255,0.15)] rounded flex items-start text-left space-x-2 text-[11px] leading-relaxed text-slate-400 font-sans">
            <ShieldCheck className="text-[#00d1ff] flex-shrink-0 mt-0.5" size={14} />
            <p>
              An automated notification trace was generated for your e-mail. Log into your dashboard at any time to monitor status transitions from <span className="text-[#00d1ff] font-mono font-semibold">Pending</span> to <span className="text-[#9d00ff] font-mono font-semibold">Delivered</span>.
            </p>
          </div>

          {/* Action triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => navigateTo('home')}
              className="py-2 px-4 rounded border border-[rgba(255,255,255,0.1)] text-slate-300 hover:text-white text-[11px] font-bold font-mono uppercase tracking-wider transition cursor-pointer"
            >
              ← RETURN TO STOREFRONT
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="py-2 px-4 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] text-white hover:opacity-90 text-[11px] font-bold font-mono uppercase tracking-wider transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>SYS_DASHBOARD</span>
              <ArrowRight size={12} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
