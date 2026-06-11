import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Search, User, ShieldAlert, LogOut, Menu, X, Landmark } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    cart,
    navigateTo,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    logout,
    setCartDrawerOpen
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate cart counts
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('home');
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    navigateTo('home');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(10,10,20,0.9)] backdrop-blur-md border-b border-[rgba(0,209,255,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={handleLogoClick}>
            <span className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] bg-clip-text text-transparent font-sans">
              EAJ STORE
            </span>
          </div>

          {/* Search Bar - Hidden on small mobile, flex on desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm mx-10 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search high-performance hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] text-slate-100 placeholder-[#a0a0c0] border border-[rgba(255,255,255,0.1)] rounded px-4 py-1.5 text-xs focus:outline-none focus:border-[#00d1ff] font-medium transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} className="text-[#a0a0c0]" />
              </div>
            </div>
          </form>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Catalog tab shortcut */}
            <button
              onClick={() => { setSelectedCategory('All'); navigateTo('home'); }}
              className="text-slate-300 hover:text-cyan-400 font-medium font-mono text-sm tracking-wide transition-colors"
            >
              CATALOG
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2.5 text-slate-300 hover:text-cyan-400 hover:bg-slate-900/50 rounded-full transition-all group"
            >
              <ShoppingCart size={22} />
              {totalItemsInCart > 0 && (
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-1 flex items-center justify-center text-[10px] font-bold text-white tracking-tight animate-pulse border border-[#0b0b14]">
                  {totalItemsInCart}
                </div>
              )}
            </button>

            {/* User dashboard / Login Options */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => navigateTo('admin')}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-950/40 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-900/30 font-semibold font-mono text-xs shadow-[0_0_10px_rgba(240,70,250,0.1)] transition-all"
                  >
                    <ShieldAlert size={14} />
                    <span>ADMIN</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900/30 font-semibold font-mono text-xs shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all"
                  >
                    <User size={14} />
                    <span>MY ACCOUNT</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-slate-900/50 rounded-full transition-all"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-5 py-2 text-slate-300 hover:text-cyan-400 font-semibold text-sm tracking-wide transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#a855f7_50%,#06b6d4_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-xs font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-transparent font-mono tracking-wider">
                    SIGN UP
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart Shortcut */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 text-slate-300 hover:text-cyan-400"
            >
              <ShoppingCart size={22} />
              {totalItemsInCart > 0 && (
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-0.5 flex items-center justify-center text-[9px] font-bold text-white">
                  {totalItemsInCart}
                </div>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900/50 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c16] border-b border-white/10 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 border border-slate-700/50 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search size={16} />
            </div>
          </form>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => { setSelectedCategory('All'); navigateTo('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-900 rounded-lg text-slate-300 hover:text-cyan-400 font-mono text-sm tracking-wide transition duration-150"
            >
              ALL PRODUCTS
            </button>
            
            {currentUser ? (
              <>
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
                    className="text-left py-2 px-3 hover:bg-slate-900 rounded-lg text-fuchsia-400 font-mono text-sm tracking-wide transition duration-150 flex items-center"
                  >
                    <ShieldAlert size={16} className="mr-2" />
                    ADMIN CONTROLLERS
                  </button>
                ) : (
                  <button
                    onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
                    className="text-left py-2 px-3 hover:bg-slate-900 rounded-lg text-cyan-400 font-mono text-sm tracking-wide transition duration-150 flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    MY PROFILE & ORDERS
                  </button>
                )}
                
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-left py-2 px-3 hover:bg-slate-900/50 rounded-lg text-red-400 font-mono text-sm tracking-wide transition duration-150 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  LOG OUT
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <button
                  onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2 px-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-semibold transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => { navigateTo('register'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-semibold transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
