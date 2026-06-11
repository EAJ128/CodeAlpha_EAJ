import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Importing View layers
import { HomeView } from './views/HomeView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { DashboardView } from './views/DashboardView';
import { AdminView } from './views/AdminView';

// Inner core manager extracting global navigation pointers
const AppContent: React.FC = () => {
  const { currentView, toasts, removeToast } = useStore();

  const renderActiveView = () => {
    switch (currentView) {
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'dashboard':
      case 'login':
      case 'register':
        return <DashboardView />;
      case 'admin':
        return <AdminView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-slate-100 selection:bg-[#00d1ff]/30 relative">
      {/* Repeating Dot background overlay */}
      <div className="absolute inset-0 dot-pattern pointer-events-none z-0"></div>
      
      {/* Interactive top navigation controls */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />

        {/* Main interactive viewport container */}
        <main className="flex-grow animate-fade-in relative z-10">
          {renderActiveView()}
        </main>

        {/* Standard brand value footer assembly */}
        <Footer />
      </div>

      {/* Floating System Notification Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full sm:w-auto px-4 sm:px-0 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-start justify-between gap-3 animate-fade-in transition duration-300 ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-250 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-250 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                : 'bg-fuchsia-950/90 border-fuchsia-500/40 text-fuchsia-250 shadow-[0_0_15px_rgba(217,70,239,0.15)]'
            }`}
          >
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-mono opacity-60">
                {toast.type === 'success' ? '# SYSTEM_OK_OK' : toast.type === 'error' ? '# SYSTEM_ERR' : '# SYSTEM_INFO'}
              </span>
              <p className="text-xs font-mono font-medium leading-relaxed leading-normal">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white font-mono text-sm leading-none pl-2 transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
