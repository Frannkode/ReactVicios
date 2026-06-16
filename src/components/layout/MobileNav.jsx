import { Home, UtensilsCrossed, ShoppingBag } from 'lucide-react';

const MobileNav = ({ view, goHome, goToMenu, setView, totalItems, hidden = false }) => (
  <nav className={`fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 transition-transform duration-300 ease-in-out ${hidden ? 'translate-y-full' : 'translate-y-0'}`}>
    <div className="bg-[#161616]/95 backdrop-blur-2xl border border-white/8 rounded-[28px] flex justify-around items-center py-4 px-6 shadow-[0_-4px_40px_rgba(0,0,0,0.6)]">
      <button
        onClick={goHome}
        className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${
          view === 'home' ? 'bg-red-500/15 text-red-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Home size={24} strokeWidth={view === 'home' ? 2.5 : 1.8} />
      </button>

      <button
        onClick={goToMenu}
        className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${
          view === 'menu' ? 'bg-red-500/15 text-red-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <UtensilsCrossed size={24} strokeWidth={view === 'menu' ? 2.5 : 1.8} />
      </button>

      <button
        onClick={() => setView('cart')}
        className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${
          view === 'cart' ? 'bg-red-500/15 text-red-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-[#161616]">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
        <ShoppingBag size={24} strokeWidth={view === 'cart' ? 2.5 : 1.8} />
      </button>
    </div>
  </nav>
);

export default MobileNav;
