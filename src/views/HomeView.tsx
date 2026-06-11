import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, SlidersHorizontal, Sparkles, Flame, Eye, ShoppingCart, Star, Cpu, Zap, RotateCcw, Plus, Check } from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    addToCart,
    navigateTo,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    gamingSetupIds,
    addToSetup,
    removeFromSetup,
    isInSetup,
    clearSetup,
    addToast,
    setCartDrawerOpen
  } = useStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [setupColor, setSetupColor] = useState<'cyan' | 'fuchsia' | 'yellow' | 'green'>('cyan');

  // Seed stable rating counts based on ID so they remain stable
  const getProductReviewCount = (id: string): number => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Math.floor(45 + (sum % 450));
  };

  const handleBuyNow = (productId: string) => {
    addToCart(productId, 1);
    // Bypassing the cart drawer popup to go straight to buyout
    setTimeout(() => {
      setCartDrawerOpen(false);
    }, 50);
    navigateTo('checkout');
  };

  const setupSlots = useMemo(() => [
    {
      id: 'game-01',
      slotName: '🖱️ TACTICAL MOUSE',
      defaultLabel: 'EAJ SwiftStrike Gaming Mouse'
    },
    {
      id: 'game-02',
      slotName: '⌨️ KINETIC KEYBOARD',
      defaultLabel: 'EAJ Apex Cyber Keyboard'
    },
    {
      id: 'game-03',
      slotName: '🎮 CONTROLLER SLOTS',
      defaultLabel: 'EAJ Vector Wireless Controller'
    },
    {
      id: 'comp-02',
      slotName: '🖥️ CURVED MONITOR',
      defaultLabel: 'EAJ Horizon 27" Curved Monitor'
    },
    {
      id: 'game-08',
      slotName: '💡 AMBIENT LIGHTBAR',
      defaultLabel: 'EAJ AeroShield Monitor Mounted Lightbar'
    },
    {
      id: 'elec-03',
      slotName: '🎧 SURROUND AUDIO',
      defaultLabel: 'EAJ SoundForge Gaming Headset'
    },
    {
      id: 'comp-08',
      slotName: '💻 RIG CHASSIS TOWER',
      defaultLabel: 'EAJ DarkFortress ATX Computer Case'
    },
    {
      id: 'smart-10',
      slotName: '🌈 MUSIC NEON STRIP',
      defaultLabel: 'EAJ Lumos Neon smart LED Strip'
    }
  ], []);

  const addWholeBundleToCart = () => {
    setupSlots.forEach(slot => {
      addToCart(slot.id, 1);
    });
    addToast("🎉 Level Up! All 8 Premium Nexus Gen-Z Gaming Devices successfully loaded into your cart with a special ecosystem discount!", "success");
  };

  // Sync global search query on search form trigger
  const handleSearchTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  // Sync search input instant clicks
  const clearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const categories = ['All', 'Electronics', 'Mobile Accessories', 'Computers', 'Gaming', 'Smart Devices', 'Office Essentials'];

  // Seed semi-random rating for products based on ID so they remain stable
  const getProductRating = (id: string): number => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Number((4.0 + (sum % 11) * 0.1).toFixed(1));
  };

  // Filter & Sort core engine
  const processedProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Search query filter
    const activeQuery = searchQuery.trim().toLowerCase();
    if (activeQuery) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(activeQuery) || 
        p.description.toLowerCase().includes(activeQuery) ||
        p.category.toLowerCase().includes(activeQuery)
      );
    }

    // 3. Sorting Filters
    switch (sortOption) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => getProductRating(b.id) - getProductRating(a.id));
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'featured' (prioritizing high stock & high-value)
        list.sort((a, b) => (b.stock * b.price) - (a.stock * a.price));
        break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortOption]);

  // Featured and New Arrivals carousels extracts
  const featuredProducts = useMemo(() => {
    return products.slice(0, 4); // First 4 preseeded ones
  }, [products]);

  const newProducts = useMemo(() => {
    return products.slice(8, 12); // Sample middle products
  }, [products]);

  return (
    <div className="min-h-screen bg-[#050508]/20 text-slate-100">
      
      {/* Dynamic Futuristic Hero Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(157,0,255,0.1)]" style={{ background: 'linear-gradient(135deg, rgba(157, 0, 255, 0.2), rgba(0, 209, 255, 0.2))' }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(157,0,255,0.15),transparent)] pointer-events-none"></div>
          <div className="px-6 py-12 md:px-12 md:py-16 relative z-10">
            <div className="space-y-4 max-w-2xl">
              
              {/* Glowing Tag */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[rgba(20,20,35,0.7)] text-[#00d1ff] border border-[rgba(0,209,255,0.3)] text-[10px] font-bold font-mono tracking-widest uppercase">
                <Sparkles size={12} className="animate-pulse" />
                <span>ACTIVE NETWORKS / PREMIUM GEAR</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                <span className="block text-slate-100 mb-1">EAJ SYSTEM DIRECTORY</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00d1ff] via-[#9d00ff] to-[#00d1ff]">
                  HIGH DENSITY COMPONENT CORE
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-[#a0a0c0] leading-relaxed font-sans font-medium">
                Equip your console, setup, or dashboard with our extreme, high-performance computing peripherals. Designed with neon indicators, glass accents, and responsive tactile interfaces.
              </p>

              {/* Quick interactive action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => { setSelectedCategory('Gaming'); navigateTo('home'); }}
                  className="px-4 py-2 rounded bg-gradient-to-r from-[#00d1ff] to-[#9d00ff] hover:opacity-90 text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-200"
                >
                  DEPLOY GAMING RANGE
                </button>
                <button
                  onClick={() => { setSelectedCategory('Computers'); navigateTo('home'); }}
                  className="px-4 py-2 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-slate-300 hover:bg-[rgba(255,255,255,0.1)] hover:text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-200"
                >
                  COMPUTING CORES
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* ================= GEN-Z NEXUS GAMING SETUP BUILDER ================= */}
        {(() => {
          const getThemeColorClass = () => {
            switch (setupColor) {
              case 'fuchsia': return {
                text: 'text-fuchsia-400',
                border: 'border-fuchsia-500/30',
                bgGlow: 'bg-fuchsia-500/10',
                textColor: '#f046fa',
                shadow: 'shadow-[0_0_25px_rgba(240,70,250,0.15)]',
                accentGlow: 'rgba(240,70,250,0.2)'
              };
              case 'yellow': return {
                text: 'text-yellow-400',
                border: 'border-yellow-500/30',
                bgGlow: 'bg-yellow-500/10',
                textColor: '#eab308',
                shadow: 'shadow-[0_0_25px_rgba(234,179,8,0.15)]',
                accentGlow: 'rgba(234,179,8,0.2)'
              };
              case 'green': return {
                text: 'text-emerald-400',
                border: 'border-emerald-500/30',
                bgGlow: 'bg-emerald-500/10',
                textColor: '#10b981',
                shadow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
                accentGlow: 'rgba(16,185,129,0.2)'
              };
              default: return {
                text: 'text-[#00d1ff]',
                border: 'border-cyan-500/30',
                bgGlow: 'bg-cyan-500/10',
                textColor: '#00d1ff',
                shadow: 'shadow-[0_0_25px_rgba(0,209,255,0.15)]',
                accentGlow: 'rgba(0,209,255,0.2)'
              };
            }
          };
          const theme = getThemeColorClass();

          return (
            <div className={`mb-16 rounded-3xl bg-[rgba(10,10,22,0.6)] border border-white/5 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${theme.shadow}`}>
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-all duration-1000 opacity-20" style={{ backgroundColor: theme.textColor }}></div>
              
              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                
                {/* Left: Setup Configuration Column */}
                <div className="w-full lg:w-3/5 space-y-6 flex flex-col justify-between">
                  
                  <div className="space-y-2">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[rgba(20,20,35,0.8)] border border-white/10 text-[10px] font-bold font-mono tracking-widest text-[#a0a0c0]">
                      <Cpu size={12} className="animate-spin text-fuchsia-400" />
                      <span>GAMER MATRIX INTERACTIVE PORTAL</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase tracking-tight text-white leading-none">
                      GEN-Z <span className={theme.text}>NEXUS COHESION</span> SETUP
                    </h2>
                    <p className="text-xs text-[#a0a0c0] leading-relaxed font-sans max-w-xl">
                      Slay your gaming desk layout with our elite ecosystem configuration. Link active game items, toggle the custom RGB lighting sync channels, and deploy your entire setup array straight to the checkout cart with one sweep.
                    </p>
                  </div>

                  {/* RGB Sync Selector buttons */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono text-[#a0a0c0]">MESH_RGB_SYNC_COLOR:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => { setSetupColor('cyan'); addToast("Cyber Neon RGB Protocol sync initialized.", "info"); }}
                        className={`h-7 px-3 rounded-full text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                          setupColor === 'cyan' ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50' : 'bg-slate-900/40 text-slate-400 border-slate-800'
                        }`}
                      >
                        CYBER CYAN
                      </button>
                      <button
                        onClick={() => { setSetupColor('fuchsia'); addToast("Twilight Rose RGB Protocol sync initialized.", "info"); }}
                        className={`h-7 px-3 rounded-full text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                          setupColor === 'fuchsia' ? 'bg-fuchsia-950/80 text-fuchsia-400 border-fuchsia-500/50' : 'bg-slate-900/40 text-slate-400 border-slate-800'
                        }`}
                      >
                        TWILIGHT ROSE
                      </button>
                      <button
                        onClick={() => { setSetupColor('yellow'); addToast("Vaporwave Gold RGB Protocol sync initialized.", "info"); }}
                        className={`h-7 px-3 rounded-full text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                          setupColor === 'yellow' ? 'bg-yellow-950/80 text-yellow-400 border-yellow-500/50' : 'bg-slate-900/40 text-slate-400 border-slate-800'
                        }`}
                      >
                        VAPORWAVE GOLD
                      </button>
                      <button
                        onClick={() => { setSetupColor('green'); addToast("Radioactive Flux RGB Protocol sync initialized.", "info"); }}
                        className={`h-7 px-3 rounded-full text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                          setupColor === 'green' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50' : 'bg-slate-900/40 text-slate-400 border-slate-800'
                        }`}
                      >
                        RADIOACTIVE FLUX
                      </button>
                    </div>
                  </div>

                  {/* Grid map matching active items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {setupSlots.map(slot => {
                      const connected = isInSetup(slot.id);
                      const pItem = products.find(p => p.id === slot.id);
                      return (
                        <div
                          key={slot.id}
                          onClick={() => connected ? removeFromSetup(slot.id) : addToSetup(slot.id)}
                          className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                            connected
                              ? `bg-slate-950/50 border-white/10`
                              : 'bg-slate-950/10 border-white/5 hover:border-white/10 opacity-60'
                          }`}
                          style={{
                            borderColor: connected ? theme.textColor + '50' : undefined,
                            boxShadow: connected ? `inset 0 0 10px ${theme.textColor}15` : undefined
                          }}
                        >
                          <div className="space-y-0.5 pr-2 flex-1 min-w-0">
                            <span className={`block text-[8px] font-mono font-bold uppercase transition-colors ${connected ? theme.text : 'text-slate-500'}`}>
                              {slot.slotName}
                            </span>
                            <h4 className="text-[11px] font-bold text-slate-100 font-mono truncate uppercase group-hover:text-white transition-colors">
                              {pItem ? pItem.name : slot.defaultLabel}
                            </h4>
                            <div className="flex items-center space-x-1">
                              <span className="text-[9px] font-mono text-fuchsia-400">${pItem?.price || '99.99'}</span>
                              <span className="text-[8px] font-mono text-slate-500">| {connected ? 'ACTIVE MATCHED' : 'DISCONNECTED'}</span>
                            </div>
                          </div>
                          
                          {/* Connection Toggle Action button */}
                          <div className={`h-5 px-2 rounded flex items-center justify-center font-mono text-[8px] font-black uppercase transition-all flex-shrink-0 ${
                            connected
                              ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-900 text-slate-500 border border-slate-800 group-hover:text-white'
                          }`}>
                            {connected ? 'CONNECTED' : 'CONNECT'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Right: Telemetry / Action Dashboard */}
                <div className="w-full lg:w-2/5 rounded-2xl bg-slate-950/60 p-5 md:p-6 border border-white/5 flex flex-col justify-between space-y-6 relative overflow-hidden"
                     style={{ boxShadow: `0 8px 30px rgba(0,0,0,0.5), inset 0 0 20px ${theme.textColor}05` }}>
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: theme.textColor }}></div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center space-x-2 text-white">
                        <Zap size={14} className={theme.text} />
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">HARDWARE_TELEMETRY</span>
                      </div>
                      <span className={`text-[8px] font-mono font-black ${theme.text}`}>CORE_SYNC_LEVEL</span>
                    </div>

                    {/* Telemetry metrics rows */}
                    <div className="space-y-3">
                      
                      {/* Cohesion Score */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#a0a0c0]">COHESION_ESTHETIC_INTEGRITY:</span>
                          <span className={`font-bold ${theme.text}`}>{gamingSetupIds.length * 12.5}%</span>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{
                            width: `${gamingSetupIds.length * 12.5}%`,
                            backgroundColor: theme.textColor
                          }}></div>
                        </div>
                      </div>

                      {/* Frame Rates */}
                      <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-white/5">
                        <span className="text-[#a0a0c0]">ESTIMATED_FPS_COUNT:</span>
                        <span className="text-white font-black">
                          {120 + (gamingSetupIds.includes('comp-02') ? 120 : 0) + (gamingSetupIds.includes('comp-08') ? 60 : 0)} FPS
                        </span>
                      </div>

                      {/* Power draws */}
                      <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-white/5">
                        <span className="text-[#a0a0c0]">PEAK_MESH_POWER:</span>
                        <span className="text-white font-black">
                          {150 + gamingSetupIds.length * 40} Watts
                        </span>
                      </div>

                      {/* Response speed */}
                      <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-white/5">
                        <span className="text-[#a0a0c0]">SYSTEM_RESPONSE_TIME:</span>
                        <span className="text-emerald-400 font-extrabold flex items-center">
                          {Math.max(0.5, 5.2 - (gamingSetupIds.includes('game-01') ? 1.5 : 0) - (gamingSetupIds.includes('game-02') ? 1.5 : 0) - (gamingSetupIds.includes('game-03') ? 1.0 : 0)).toFixed(1)} ms
                        </span>
                      </div>

                      {/* Linked status */}
                      <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-white/2">
                        <span className="text-[#a0a0c0]">HARDWARE_NODES_LINKED:</span>
                        <span className={`font-bold ${theme.text}`}>{gamingSetupIds.length} / 8 Devices</span>
                      </div>

                    </div>
                  </div>

                  {/* Ecosystem pricing and actions */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block text-[8px] font-mono text-slate-500 uppercase">BUNDLE_SERIES_PRICING</span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-xl font-mono font-black text-white">$599.99</span>
                          <span className="text-[11px] font-mono text-slate-500 line-through">$729.92</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-fuchsia-950/40 text-fuchsia-400 border border-fuchsia-500/25 font-mono text-[8px] font-bold">
                        15% DISCOUNT SAVE
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={addWholeBundleToCart}
                        className="w-full py-3 px-4 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider text-slate-950 transition-all duration-300 hover:opacity-95 cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${theme.textColor}, #9d00ff)`
                        }}
                      >
                        ADD ENTIRE NEXUS BUNDLE TO CART
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={clearSetup}
                          className="flex-1 py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-400 hover:text-white transition font-mono text-[8px] uppercase font-bold flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <RotateCcw size={10} />
                          <span>RESET BLUEPRINT</span>
                        </button>
                        <button
                          onClick={() => {
                            setupSlots.forEach(s => {
                              if (!gamingSetupIds.includes(s.id)) {
                                addToSetup(s.id);
                              }
                            });
                            addToast("🎮 Absolute gaming cohesion reached! All setup slots populated.", "success");
                          }}
                          className="flex-1 py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-white/5 text-cyan-400 hover:text-cyan-300 transition font-mono text-[8px] uppercase font-bold flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Plus size={10} />
                          <span>POPULATE ALL</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          );
        })()}

        {/* Core Showcase Tab Sliders */}
        <div className="mb-14">
          <div className="flex items-center space-x-2 mb-4">
            <Flame className="text-[#9d00ff] animate-pulse" size={18} />
            <h3 className="text-sm font-bold font-mono tracking-wider text-[#00d1ff] uppercase">SYS_FEATURED PRODUCTS</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map(p => {
              const rating = getProductRating(p.id);
              return (
                <div
                  key={p.id}
                  className="group relative rounded-xl bg-[rgba(20,20,35,0.7)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden hover:border-[#00d1ff]/30 hover:shadow-[0_0_15px_rgba(0,209,255,0.15)] transition-all duration-300"
                >
                  <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded bg-[rgba(10,10,20,0.9)] border border-[#00d1ff]/30 text-[9px] font-bold font-mono text-[#00d1ff] tracking-wider">
                    FEATURED
                  </div>
                  
                  {/* Setup Cohesion Toggle Button */}
                  {['Gaming', 'Computers', 'Smart Devices', 'Electronics'].includes(p.category) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInSetup(p.id)) {
                          removeFromSetup(p.id);
                        } else {
                          addToSetup(p.id);
                        }
                      }}
                      className={`absolute top-2.5 right-2.5 z-20 p-1 rounded-md border transition-all duration-300 cursor-pointer ${
                        isInSetup(p.id)
                          ? 'bg-cyan-950/90 border-cyan-500/50 text-cyan-400'
                          : 'bg-slate-950/80 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-655'
                      }`}
                      title={isInSetup(p.id) ? "Connected to Setup Grid" : "Connect to Setup Grid"}
                    >
                      <Cpu size={11} className={isInSetup(p.id) ? "animate-pulse" : ""} />
                    </button>
                  )}
                  
                  {/* Image wrapper */}
                  <div className="h-40 overflow-hidden relative bg-[rgba(255,255,255,0.02)]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent opacity-75"></div>
                  </div>

                  {/* Body */}
                  <div className="p-3 space-y-2">
                    <span className="text-[9px] font-mono text-[#a0a0c0] uppercase tracking-widest">{p.category}</span>
                    <h4 className="font-bold text-slate-200 text-xs tracking-wide line-clamp-1 group-hover:text-[#00d1ff] transition-colors">
                      {p.name}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-[#9d00ff]">${p.price.toFixed(2)}</span>
                      <div className="flex items-center text-amber-400 space-x-0.5 text-[10px]">
                        <Star size={10} fill="currentColor" />
                        <span className="font-semibold text-slate-300">{rating}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => navigateTo('product-detail', p.id)}
                        className="flex items-center justify-center space-x-1 py-1 text-[10px] font-bold font-mono border border-[rgba(255,255,255,0.1)] text-slate-300 rounded hover:border-[#00d1ff]/40 hover:text-white transition-all cursor-pointer"
                      >
                        <Eye size={10} />
                        <span>SPECS</span>
                      </button>
                      <button
                        onClick={() => addToCart(p.id, 1)}
                        className="flex items-center justify-center space-x-1 py-1 text-[10px] font-bold font-mono bg-[#00d1ff] text-[#050508] rounded hover:opacity-90 hover:shadow-[0_0_10px_rgba(0,209,255,0.3)] transition-all cursor-pointer"
                      >
                        <ShoppingCart size={10} />
                        <span>ADD</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Filters & sorting interface */}
        <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5 backdrop-blur-md mb-8">
          
          {/* Header search controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/5">
            <div className="flex items-center space-x-3">
              <SlidersHorizontal className="text-cyan-400" size={20} />
              <h2 className="text-lg font-bold font-mono tracking-wider text-slate-100 uppercase">INVENTORY BROWSING MATRIX</h2>
            </div>

            {/* Mobile custom inline search query form */}
            <form onSubmit={handleSearchTrigger} className="flex items-center space-x-2 w-full lg:max-w-md relative">
              <input
                type="text"
                placeholder="Query name or descriptors..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/50 rounded-xl py-2 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 text-slate-500 hover:text-slate-200 text-xs font-mono pr-1"
                >
                  CLEAR
                </button>
              )}
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-400 hover:text-slate-950 transition-all font-mono text-xs"
              >
                Q
              </button>
            </form>
          </div>

          {/* Categories Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wide rounded-xl border transition-all duration-200 ${
                  (selectedCategory === cat)
                    ? 'bg-fuchsia-950/60 text-fuchsia-400 border-fuchsia-500/50 shadow-[0_0_15px_rgba(240,70,250,0.15)]'
                    : 'bg-slate-900/30 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sorting metrics dropdown */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing <span className="text-cyan-400 font-bold">{processedProducts.length}</span> nodes match your query.
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono">SORT_BY:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-200 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-xs font-mono outline-none"
              >
                <option value="featured">SYS_FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating-desc">HIGHEST TESTING RATINGS</option>
                <option value="name-asc">ALPHABETICAL ARRAYS</option>
              </select>
            </div>
          </div>

        </div>

        {/* Catalog grid elements matching filter */}
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {processedProducts.map(p => {
              const rating = getProductRating(p.id);
              const inStock = p.stock > 0;
              return (
                <div
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className="group relative flex flex-col rounded-2xl bg-slate-900/20 border border-white/5 backdrop-blur-md overflow-hidden hover:border-cyan-500/30 hover:shadow-[0_8px_32px_rgba(6,182,212,0.08)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Category Pill Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[9px] font-mono font-bold text-slate-400 tracking-wider">
                    {p.category.toUpperCase()}
                  </div>

                  {/* Setup Cohesion Toggle Button */}
                  {['Gaming', 'Computers', 'Smart Devices', 'Electronics'].includes(p.category) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInSetup(p.id)) {
                          removeFromSetup(p.id);
                        } else {
                          addToSetup(p.id);
                        }
                      }}
                      className={`absolute top-2.5 right-2.5 z-20 p-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                        isInSetup(p.id)
                          ? 'bg-cyan-950/90 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-950/80 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-650'
                      }`}
                      title={isInSetup(p.id) ? "Connected to Setup Grid" : "Connect to Setup Grid"}
                    >
                      <Cpu size={12} className={isInSetup(p.id) ? "animate-pulse" : ""} />
                    </button>
                  )}

                  {/* Image wrapper */}
                  <div className="h-48 bg-slate-900/40 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80"></div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-1 space-y-3">
                    
                    {/* Title */}
                    <div className="space-y-1 flex-1">
                      <h4 className="font-bold text-slate-200 text-sm leading-snug tracking-normal line-clamp-2 uppercase font-mono group-hover:text-cyan-400 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Stock Status indicator */}
                    <div className="flex items-center justify-between text-[11px] font-mono border-t border-white/5 pt-2.5">
                      <span className="text-slate-500">STOCK_STATE:</span>
                      {inStock ? (
                        <span className="text-emerald-400 font-bold">● {p.stock} INSTOCK</span>
                      ) : (
                        <span className="text-rose-400 font-bold">○ SOLD OUT</span>
                      )}
                    </div>

                    {/* Specifications lists summary nodes */}
                    {p.specifications && p.specifications.length > 0 && (
                      <div className="hidden sm:block text-[10px] font-mono text-slate-400 space-y-0.5 bg-slate-950/30 p-2 rounded border border-white/5">
                        {p.specifications.slice(0, 2).map((s, idx) => (
                          <div key={idx} className="truncate select-none">
                            :: <span className="text-slate-500">{s.split(':')[0]}:</span>{s.split(':')[1]}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pricing and Stars */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-slate-500">PRICE_NET</span>
                        <span className="text-lg font-mono font-black text-white group-hover:text-fuchsia-400 transition-colors">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500">LAB_GRADE</span>
                        <div className="flex items-center text-amber-400 space-x-0.5 text-xs font-bold leading-none mt-1">
                          <Star size={11} fill="currentColor" />
                          <span>{rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions triggers */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigateTo('product-detail', p.id)}
                        className="py-2 px-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-center text-xs font-bold font-mono tracking-wider uppercase transition-colors"
                      >
                        SPEC_SHEET
                      </button>
                      <button
                        onClick={() => inStock && addToCart(p.id, 1)}
                        disabled={!inStock}
                        className={`py-2 px-2 rounded-xl text-center text-xs font-black font-mono tracking-wider uppercase transition-all flex items-center justify-center space-x-1.5 ${
                          inStock
                            ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 hover:from-cyan-400 hover:to-indigo-500 hover:text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-950 border border-slate-900 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={12} />
                        <span>{inStock ? 'ADD_CART' : 'SOLD_OUT'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <div className="text-slate-600 font-mono text-sm uppercase">
              :: SYS_WARN: Search Query returned null nodes ::
            </div>
            <p className="text-slate-400 text-xs">
              Review your search term or tab selections and submit another query.
            </p>
            <button
              onClick={clearSearch}
              className="px-5 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold font-mono text-cyan-400 rounded-xl"
            >
              RESET INVENTORY MATRIX
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
