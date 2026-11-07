const Header = ({ view, goHome, goToMenu, setView, totalItems }) => {
  const titles = { home: null, menu: 'Menú', cart: 'Tu Pedido' };
  const title = titles[view];

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl px-5 pt-12 pb-4">
      <div className="flex items-center justify-between">
        {view !== 'home' ? (
          <button
            onClick={view === 'cart' ? () => setView('menu') : goHome}
            className="w-10 h-10 rounded-2xl bg-[#161616] border border-white/6 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <span className="text-lg">🍔</span>
            </div>
            <div>
              <div className="text-xs text-zinc-500 font-semibold leading-none">Bienvenido a</div>
              <div className="text-base font-black leading-tight">VICIO'S <span className="text-red-500">BURGER</span></div>
            </div>
          </div>
        )}

        {title && (
          <h1 className="text-xl font-black absolute left-1/2 -translate-x-1/2">{title}</h1>
        )}

        <div className="w-10" />
      </div>
    </header>
  );
};

export default Header;
