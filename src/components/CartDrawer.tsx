import React, { useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    products,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    emptyCart,
    navigateTo
  } = useStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartDrawerOpen(false);
      }
    };
    if (cartDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cartDrawerOpen, setCartDrawerOpen]);

  if (!cartDrawerOpen) return null;

  // Compute subtotal
  const subtotal = cart.reduce((total, item) => {
    const prod = products.find(p => p.id === item.productId);
    const price = prod?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Dynamic backdrop glass overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setCartDrawerOpen(false)}
        id="cart-overlay-backdrop"
      />

      {/* Drawer box core alignment */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          id="cart-drawer-box"
          className="w-screen max-w-md transform transition-all duration-300 ease-out translate-x-0 relative bg-[rgba(10,10,20,0.96)] border-l border-[rgba(0,195,255,0.25)] shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col h-full text-slate-100"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-[#00d1ff]" size={18} />
              <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-white">SHOPPING_CART_DRAWER</h2>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1 px-2.5 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-slate-400 hover:text-white transition cursor-pointer font-mono text-xs"
              id="close-cart-drawer-btn"
            >
              CLOSE ×
            </button>
          </div>

          {/* Cart item stream */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(0,209,255,0.05)] border border-[rgba(0,209,255,0.2)] flex items-center justify-center text-[#00d1ff] animate-pulse">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-200">CART_NODES_EMPTY</h3>
                  <p className="text-[11px] text-[#a0a0c0] max-w-[240px] leading-relaxed mx-auto">
                    Configure your rig details and allocate hardware nodes to trigger streaming updates here.
                  </p>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="px-4 py-2 border border-[#00d1ff]/30 text-xs font-bold font-mono text-[#00d1ff] bg-[rgba(0,209,255,0.02)] hover:border-[#00d1ff]/70 rounded transition cursor-pointer"
                  id="drawer-browse-catalog-btn"
                >
                  START HARVESTING
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#a0a0c0] pb-1">
                  <span>ACTIVE_ALLOCATIONS ({cart.reduce((tot, i) => tot + i.quantity, 0)} units)</span>
                  <button
                    onClick={emptyCart}
                    className="text-red-400 hover:underline font-bold transition flex items-center space-x-1 cursor-pointer"
                    id="drawer-clear-cart-btn"
                  >
                    <Trash2 size={11} />
                    <span>EMPTY_ALL</span>
                  </button>
                </div>

                {cart.map(item => {
                  const prod = products.find(p => p.id === item.productId);
                  if (!prod) return null;

                  return (
                    <div
                      key={item.id}
                      className="p-3 bg-[rgba(255,255,255,0.02)] rounded border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,209,255,0.15)] transition duration-200"
                    >
                      <div className="flex space-x-3">
                        {/* Image */}
                        <div className="h-14 w-14 rounded overflow-hidden bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                          <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                        </div>

                        {/* Stats Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs font-bold text-slate-100 uppercase truncate leading-tight w-11/12">{prod.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-500 hover:text-red-400 pl-1.5 transition cursor-pointer"
                              title="Strip core item"
                              id={`remove-item-${item.id}`}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <span className="inline-block px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 border border-[rgba(255,255,255,0.05)] text-slate-400">
                            {prod.category}
                          </span>

                          <div className="flex items-center justify-between pt-1">
                            {/* Counter widgets */}
                            <div className="flex items-center space-x-1.5 bg-slate-950 p-[3px] rounded border border-[rgba(255,255,255,0.05)] align-middle">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="h-4 w-4 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-slate-400 hover:text-white rounded flex items-center justify-center transition cursor-pointer"
                                id={`dec-item-${item.id}`}
                              >
                                <Minus size={10} />
                              </button>
                              <span className="font-mono text-xs font-bold px-1.5 text-slate-200 select-none">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="h-4 w-4 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-slate-400 hover:text-white rounded flex items-center justify-center transition cursor-pointer"
                                id={`inc-item-${item.id}`}
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Total node cost */}
                            <span className="font-mono text-xs font-bold text-slate-100">${(prod.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer stats check routing */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,20,0.85)] space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[#a0a0c0]">
                  <span>SUBTOTAL_MATRIX:</span>
                  <span className="text-slate-100 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[#a0a0c0]">
                  <span>ESTIMATED_FREIGHT:</span>
                  <span className="text-teal-400 font-bold">FREE</span>
                </div>
                <div className="border-t border-[rgba(255,255,255,0.05)] pt-2 flex items-center justify-between text-white font-bold">
                  <span>RUNNING_LEDGER_TOTAL:</span>
                  <span className="text-[#00d1ff] font-extrabold text-sm">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 px-4 rounded bg-[#00d1ff] text-slate-950 hover:bg-[#00d1ff]/90 text-xs font-black font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,209,255,0.15)] flex items-center justify-center space-x-2 transition duration-150 cursor-pointer"
                  id="checkout-drawer-primary-btn"
                >
                  <span>SECURE BUYOUT</span>
                  <ArrowRight size={12} />
                </button>

                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full py-2 px-4 rounded bg-transparent border border-[rgba(255,255,255,0.1)] hover:border-slate-500 hover:bg-[rgba(255,255,255,0.02)] text-xs font-bold font-mono uppercase tracking-wider text-slate-400 transition cursor-pointer"
                  id="close-drawer-ghost-btn"
                >
                  CONTINUE HARVESTING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
