import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, ArrowLeft, ShieldAlert, Star, Package, ChevronRight, Cpu } from 'lucide-react';

const getProductRating = (id: string): number => {
  const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Number((4.0 + (sum % 11) * 0.1).toFixed(1));
};

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    navigateTo,
    addToSetup,
    removeFromSetup,
    isInSetup
  } = useStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Retrieve current product object
  const product = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  // Seed rating factor based on details ID
  const rating = useMemo(() => {
    if (!product) return 4.5;
    const sum = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Number((4.0 + (sum % 11) * 0.1).toFixed(1));
  }, [product]);

  // Identify related products in same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id, quantity);
    setSuccessMsg(`Successfully queued ${quantity}x "${product.name}" in your cart list.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050508]/20 py-24 text-center">
        <div className="max-w-md mx-auto space-y-6 px-4">
          <ShieldAlert className="text-rose-500 mx-auto" size={48} />
          <h2 className="text-xl font-bold font-mono text-slate-100 uppercase">SYS_ERR: PRODUCT NOT RESOLVED</h2>
          <p className="text-sm text-slate-400">
            The database node queried did not yield a valid schema. The node may have been deleted or archived.
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2 bg-[rgba(20,20,35,0.7)] border border-[rgba(255,255,255,0.1)] text-xs font-bold font-mono text-[#00d1ff] rounded cursor-pointer hover:border-[#00d1ff]/50"
          >
            RETURN TO SHOP MATRIX
          </button>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb back pointer */}
        <div className="mb-6 flex items-center space-x-2 text-xs font-mono text-slate-500">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-1.5 hover:text-[#00d1ff] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>CATALOG</span>
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-400">{product.category.toUpperCase()}</span>
          <ChevronRight size={12} />
          <span className="text-[#00d1ff] font-bold truncate max-w-xs">{product.name.toUpperCase()}</span>
        </div>

        {/* Core Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 bg-[rgba(20,20,35,0.7)] rounded-xl p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
          
          {/* Left: Product Image Stage (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
            </div>
            
            {/* Multi-angle mock cards */}
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-square rounded-lg border border-cyan-500/30 overflow-hidden cursor-pointer bg-slate-900">
                <img src={product.image} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" alt="angle-1" />
              </div>
              <div className="aspect-square rounded-lg border border-white/5 overflow-hidden cursor-pointer bg-slate-900">
                <img src={product.image} className="w-full h-full object-cover opacity-40 hover:opacity-100 transition grayscale" alt="angle-2" />
              </div>
              <div className="aspect-square rounded-lg border border-white/5 overflow-hidden cursor-pointer bg-slate-900">
                <img src={product.image} className="w-full h-full object-cover opacity-40 hover:opacity-100 transition saturate-50" alt="angle-3" />
              </div>
              <div className="aspect-square rounded-lg border border-white/5 overflow-hidden cursor-pointer bg-slate-900">
                <img src={product.image} className="w-full h-full object-cover opacity-40 hover:opacity-100 transition hue-rotate-15" alt="angle-4" />
              </div>
            </div>
          </div>

          {/* Right: Technical Spec / Core Buy Panel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category */}
              <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-slate-400 font-mono text-[10px] font-bold border border-white/5 tracking-wider">
                {product.category.toUpperCase()}
              </div>

              {/* Title Header */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
                {product.name}
              </h1>

              {/* Ratings and reviews */}
              <div className="flex items-center space-x-4 border-b border-[rgba(255,255,255,0.1)] pb-4">
                <div className="flex items-center text-amber-400 space-x-1 font-mono text-xs font-black">
                  <Star size={14} fill="currentColor" />
                  <span>{rating}</span>
                  <span className="text-slate-500 font-medium">/ 5.0</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  [ LAB_TEST_CODE: EAJ-{product.id.split('-')[1]?.toUpperCase() || 'MOCK'} ]
                </div>
              </div>

              {/* Price node */}
              <div className="py-2">
                <span className="block text-[10px] font-mono text-[#a0a0c0]">MSRP VALUE SYSTEM:</span>
                <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00d1ff] to-[#9d00ff]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[10px] font-mono text-[#a0a0c0] ml-2">USD (VAT INCLUDED)</span>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="block text-xs font-mono text-slate-500">OVERVIEW_DECRIPTION:</span>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl font-sans">
                  {product.description}
                </p>
              </div>

              {/* Specifications Block - HIGHLY polished details */}
              <div className="space-y-2 pt-2">
                <span className="block text-xs font-mono text-slate-500">LAB_TEST_SPECIFICATIONS:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.specifications && product.specifications.length > 0 ? (
                    product.specifications.map((spec, idx) => {
                      const parts = spec.split(':');
                      const label = parts[0] || 'Parameter';
                      const value = parts[1] || 'Value';
                      return (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-900/40 border border-white/5 flex items-center justify-between font-mono text-xs"
                        >
                          <span className="text-slate-500">{label.trim().toUpperCase()}</span>
                          <span className="text-cyan-400 font-semibold text-right truncate pl-2 max-w-[150px]">{value.trim()}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 py-3 rounded-lg bg-slate-900/20 text-center font-mono text-[10px] text-slate-500">
                      Standard microchip specifications applied.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions card */}
            <div className="bg-[rgba(20,20,35,0.8)] rounded-xl p-4 sm:p-5 border border-[rgba(255,255,255,0.1)] space-y-4">
              
              {/* Stock Status indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center space-x-1.5 text-[#a0a0c0]">
                  <Package size={14} />
                  <span>STOCK_LEDGER_RECORDS:</span>
                </div>
                {inStock ? (
                  <span className="text-[#00d1ff] font-bold bg-[#00d1ff]/10 border border-[#00d1ff]/20 px-2 py-0.5 rounded text-[10px]">
                    ● {product.stock} NODES ACTIVE
                  </span>
                ) : (
                  <span className="text-[#9d00ff] font-bold bg-[#9d00ff]/10 border border-[#9d00ff]/20 px-2 py-0.5 rounded text-[10px]">
                    ○ INVENTORY EMPTY
                  </span>
                )}
              </div>

              {/* Success Notification message */}
              {successMsg && (
                <div className="p-3 bg-[rgba(0,209,255,0.1)] text-[#00d1ff] text-xs border border-[#00d1ff]/30 rounded font-mono animate-fade-in">
                  ✓ {successMsg}
                </div>
              )}

              {/* Buy actions */}
              {inStock && (
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  
                  {/* Quantitative selector */}
                  <div className="flex items-center bg-[rgba(10,10,20,0.9)] border border-[rgba(255,255,255,0.1)] rounded p-1 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-slate-400 hover:text-white text-xs font-bold font-mono cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-5 py-1 text-xs font-bold font-mono text-slate-100 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 text-slate-400 hover:text-white text-xs font-bold font-mono cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 py-2 px-4 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-90 text-white tracking-wider text-xs font-mono font-black uppercase shadow-[0_0_15px_rgba(0,209,255,0.2)] transition duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingCart size={14} />
                    <span>LOAD TO CART ARRAY</span>
                  </button>

                </div>
              )}

              {/* Setup Cohesion Toggle Button block */}
              {['Gaming', 'Computers', 'Smart Devices', 'Electronics'].includes(product.category) && (
                <div className="pt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      if (isInSetup(product.id)) {
                        removeFromSetup(product.id);
                      } else {
                        addToSetup(product.id);
                      }
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition duration-200 flex items-center justify-center space-x-2 border cursor-pointer ${
                      isInSetup(product.id)
                        ? 'bg-cyan-950/40 text-cyan-450 border-cyan-500/50 shadow-[0_0_15px_rgba(0,209,255,0.15)] animate-pulse'
                        : 'bg-slate-900/40 border-slate-800 text-slate-405 hover:text-white hover:border-slate-650'
                    }`}
                  >
                    <Cpu size={12} className={isInSetup(product.id) ? 'animate-bounce' : ''} />
                    <span>{isInSetup(product.id) ? 'DISCONNECT FROM GAME SETUP' : 'INTEGRATE INTO GAME SETUP'}</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Related Products Grid System */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00d1ff] animate-pulse"></span>
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-100 uppercase">RELATED INVENTORY TILES</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => {
                const rRating = getProductRating(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => { navigateTo('product-detail', p.id); setQuantity(1); }}
                    className="group rounded-xl bg-[rgba(20,20,35,0.7)] border border-[rgba(255,255,255,0.1)] p-3 space-y-3 hover:border-[#00d1ff]/30 transition duration-200 cursor-pointer"
                  >
                    <div className="aspect-video w-full rounded overflow-hidden bg-[rgba(255,255,255,0.02)] relative">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-103 transition duration-300" alt={p.name} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono truncate group-hover:text-[#00d1ff] transition-all">{p.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#9d00ff]">${p.price.toFixed(2)}</span>
                        <div className="flex items-center text-amber-400 space-x-0.5 text-[9px] font-bold">
                          <Star size={10} fill="currentColor" />
                          <span className="text-slate-300">{rRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
