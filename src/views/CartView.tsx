import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    products,
    updateCartQuantity,
    removeFromCart,
    emptyCart,
    navigateTo
  } = useStore();

  // Compute checkout totals
  const subtotal = cart.reduce((total, item) => {
    const prod = products.find(p => p.id === item.productId);
    const price = prod?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.0825; // 8.25% Sales tax
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigateTo('checkout');
  };

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-4">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="text-[#00d1ff]" size={18} />
            <h1 className="text-sm font-bold font-mono tracking-wider uppercase text-white">SHOPPING_CART_LEDGER</h1>
          </div>
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-[#00d1ff] transition cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>KEEP BROWSING</span>
          </button>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Cart Items Table (8 columns) */}
            <div className="lg:col-span-8 space-y-3">
              
              <div className="flex items-center justify-between text-[11px] font-mono text-[#a0a0c0] bg-[rgba(255,255,255,0.02)] p-2.5 rounded border border-[rgba(255,255,255,0.05)] px-4 mb-1">
                <span className="w-1/2">INVENTORY_NODE</span>
                <span className="w-1/4 text-center">QUANTITY_ARR</span>
                <span className="w-1/4 text-right">TOTAL_NET</span>
              </div>

              {cart.map(item => {
                const prod = products.find(p => p.id === item.productId);
                if (!prod) return null;

                const itemTotal = prod.price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between bg-[rgba(20,20,35,0.7)] p-3 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md gap-3 sm:gap-2 px-4"
                  >
                    {/* Product visual & details wrapper */}
                    <div className="flex items-center space-x-3 w-full sm:w-1/2">
                      <div className="h-14 w-14 rounded overflow-hidden bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                        <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <h4
                          onClick={() => navigateTo('product-detail', prod.id)}
                          className="font-bold text-slate-200 text-xs truncate uppercase font-mono hover:text-[#00d1ff] transition-colors cursor-pointer"
                        >
                          {prod.name}
                        </h4>
                        <span className="block text-[10px] font-mono text-[#a0a0c0]">
                          {prod.category.toUpperCase()} | ${prod.price.toFixed(2)} UNIT
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector Incrementer */}
                    <div className="flex items-center justify-center space-x-2 w-full sm:w-1/4">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center font-mono font-bold text-slate-400 hover:text-white hover:border-[#00d1ff]/50 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-200 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center font-mono font-bold text-slate-400 hover:text-white hover:border-[#00d1ff]/50 cursor-pointer"
                        disabled={item.quantity >= prod.stock}
                      >
                        +
                      </button>
                    </div>

                    {/* Price total and Actions remove */}
                    <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-1/4">
                      <span className="font-mono font-bold text-[#9d00ff] text-xs">
                        ${itemTotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        title="Remove product"
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 rounded cursor-pointer transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* Lower Cart Action row */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => navigateTo('home')}
                  className="px-4 py-2 rounded border border-[rgba(255,255,255,0.1)] text-slate-400 hover:text-slate-200 text-[10px] font-bold font-mono uppercase transition cursor-pointer"
                >
                  ← RETURN TO INVENTORIES
                </button>
                <button
                  onClick={emptyCart}
                  className="px-4 py-2 rounded border border-rose-950/45 text-rose-400 hover:bg-rose-950/20 text-[10px] font-bold font-mono uppercase transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Trash2 size={12} />
                  <span>EMPTY CART</span>
                </button>
              </div>

            </div>

            {/* Right: Cart Summary Column (4 columns) */}
            <div className="lg:col-span-4">
              <div className="bg-[rgba(20,20,35,0.7)] p-4 sm:p-5 rounded-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md space-y-4">
                
                <h3 className="text-xs font-bold font-mono tracking-wider text-slate-200 uppercase border-b border-[rgba(255,255,255,0.1)] pb-2.5">
                  ORDER_SUMMARY_LEDGER
                </h3>

                <div className="space-y-3 text-[11px] font-mono">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-[#a0a0c0]">
                    <span>CART_SUBTOTAL:</span>
                    <span className="text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Tax */}
                  <div className="flex items-center justify-between text-[#a0a0c0]">
                    <span>SALES_TAX (8.25%):</span>
                    <span className="text-slate-200">${tax.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between text-[#a0a0c0]">
                    <span>SHIPPING_FREIGHT:</span>
                    {shipping === 0 ? (
                      <span className="text-[#00d1ff] font-bold">FREE SHIPPING</span>
                    ) : (
                      <span className="text-slate-200">${shipping.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Free shipping threshold warning */}
                  {subtotal < 150 && (
                    <div className="p-2.5 bg-[#00d1ff]/10 rounded border border-[#00d1ff]/20 text-[10px] text-[#00d1ff] leading-relaxed">
                      Add <span className="font-bold">${(150 - subtotal).toFixed(2)}</span> more to qualify for FREE express shipping.
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-[rgba(255,255,255,0.1)] pt-2.5"></div>

                  {/* Grand total */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-100">
                    <span>GRAND_TOTAL:</span>
                    <span className="text-base text-[#9d00ff] font-black">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-1">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-90 text-white tracking-wider text-xs font-mono font-black uppercase shadow-[0_0_15px_rgba(0,209,255,0.15)] transition duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CreditCard size={14} />
                    <span>PROCEED TO CHECKOUT</span>
                  </button>
                </div>

                {/* Bullet safety tag */}
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono justify-center">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>TRANSACTION NODE SECURED</span>
                </div>

              </div>
            </div>

          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto bg-[rgba(20,20,35,0.7)] p-6 rounded-xl border border-[rgba(255,255,255,0.1)]">
            <div className="h-12 w-12 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center mx-auto text-slate-500 shadow-md">
              <ShoppingCart size={18} />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xs font-bold font-mono text-slate-200 uppercase">YOUR SHOPPING CART IS EMPTY</h2>
              <p className="text-[10px] text-[#a0a0c0] leading-relaxed">
                You haven't resolved any digital hardware nodes to your local cart ledger. Return to the main catalog to load items.
              </p>
            </div>

            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2.5 rounded bg-[#00d1ff] text-[#050508] font-mono text-[10px] font-black hover:opacity-90 uppercase tracking-wider cursor-pointer"
            >
              DEPLOY CATALOG GRID
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
