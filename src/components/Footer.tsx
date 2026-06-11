import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, ShieldCheck, Truck, RefreshCw, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useStore();
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail.trim()) {
      setEmailSubscribed(true);
      setSubEmail('');
      setTimeout(() => setEmailSubscribed(false), 4000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06060c] pt-16 pb-8 border-t border-white/10 text-slate-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Propositions / Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-white/5 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl bg-slate-900/10 border border-white/5 backdrop-blur-2xl">
            <Truck className="text-cyan-400 mb-1" size={28} />
            <h4 className="text-slate-200 font-bold font-mono tracking-wider text-sm">FREE EXPRESS SHIPPING</h4>
            <p className="text-xs text-slate-400">On all advanced computing orders above $150.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl bg-slate-900/10 border border-white/5 backdrop-blur-2xl">
            <ShieldCheck className="text-fuchsia-400 mb-1" size={28} />
            <h4 className="text-slate-200 font-bold font-mono tracking-wider text-sm">SECURE ACCOUNTS</h4>
            <p className="text-xs text-slate-400">Encrypted accounts with secure session management.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl bg-slate-900/10 border border-white/5 backdrop-blur-2xl">
            <RefreshCw className="text-cyan-400 mb-1" size={28} />
            <h4 className="text-slate-200 font-bold font-mono tracking-wider text-sm">30-DAY ASSURANCE</h4>
            <p className="text-xs text-slate-400">Hassle-free modular returns and replacement support.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl bg-slate-900/10 border border-white/5 backdrop-blur-2xl">
            <Smartphone className="text-fuchsia-400 mb-1" size={28} />
            <h4 className="text-slate-200 font-bold font-mono tracking-wider text-sm">24/7 SYSTEM EXPERTS</h4>
            <p className="text-xs text-slate-400">Connect instantly with our systems team any time.</p>
          </div>
        </div>

        {/* Brand Information & Direct Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          
          {/* Column 1: Brand & Desc */}
          <div className="md:col-span-4 space-y-4">
            <span className="flex items-center text-cyan-400 font-mono font-black text-2xl tracking-wider select-none space-x-2">
              <span>EAJ</span>
              <span className="text-fuchsia-400 font-extrabold text-sm border-l border-white/20 pl-2">STORE</span>
            </span>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Premium, highly crafted e-commerce destination tailored for technology specialists, gamers, and smart home innovators. Configured with neon performance arrays.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <span className="block font-mono tracking-wide text-xs text-fuchsia-400/80 uppercase">Primary Tech Liaison</span>
              <span className="block mt-1 font-mono text-slate-300">eaj281@gmail.com</span>
            </div>
          </div>

          {/* Column 2: Quick Shop Categories */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-slate-200 font-mono text-sm font-bold tracking-wider uppercase border-b border-white/10 pb-2">CATEGORIES</h5>
            <ul className="space-y-2.5 text-xs font-semibold tracking-wide font-mono">
              <li>
                <button
                  onClick={() => { setSelectedCategory('Electronics'); navigateTo('home'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  ELECTRONICS
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Mobile Accessories'); navigateTo('home'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  MOBILE GEAR
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Computers'); navigateTo('home'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  COMPUTERS
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Gaming'); navigateTo('home'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  GAMING SUITE
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Smart Devices'); navigateTo('home'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  SMART LIVING
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate shortcuts */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-slate-200 font-mono text-sm font-bold tracking-wider uppercase border-b border-white/10 pb-2">QUICK NAVIGATION</h5>
            <ul className="space-y-2.5 text-xs font-semibold tracking-wide font-mono">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-cyan-400 transition-colors">
                  HOME CATALOG
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-cyan-400 transition-colors">
                  SHOPPING CART
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-cyan-400 transition-colors">
                  ORDER HISTORY
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-cyan-400 transition-colors">
                  SYSTEM OVERRIDE
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-cyan-400 transition-colors text-fuchsia-400">
                  SYSTEM PORTAL
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscriber */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-slate-200 font-mono text-sm font-bold tracking-wider uppercase border-b border-white/10 pb-2">SUBSCRIBE TO ARRAYS</h5>
            <p className="text-xs text-slate-400">
              Get notified of new technical products and ultra-low price drops instantly.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Secure terminal email..."
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/50 rounded-xl py-2.5 pl-4 pr-12 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white flex items-center justify-center hover:from-cyan-400 hover:to-fuchsia-400 transition-all font-mono"
              >
                <Mail size={16} />
              </button>
            </form>
            {emailSubscribed && (
              <div className="p-2.5 bg-cyan-950/40 text-cyan-400 text-xs border border-cyan-500/30 rounded-lg animate-fade-in font-mono">
                ✓ Node added. System subscription established. Welcome aboard.
              </div>
            )}
          </div>

        </div>

        {/* Section 3: Copyright and Tech Specs tag (anti tech-larp simplified cleanly descriptor) */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p>© {currentYear} EAJ Store. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-6">
            <span className="text-slate-600 font-mono text-[10px]">
              SHA-256: SECURE CONNECTION
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
