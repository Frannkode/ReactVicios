import hamburguesaArgImg from '../assets/img/hamburguesaargentina.jpeg';

const HomeView = ({ goToMenu }) => (
  <div className="flex flex-col gap-6 pb-4">
    {/* Hero card */}
    <div className="relative rounded-[32px] overflow-hidden bg-[#161616] border border-white/5 shadow-2xl" style={{ minHeight: 280 }}>
      <img
        src={hamburguesaArgImg}
        className="absolute inset-0 w-full h-full object-cover"
        alt="La 10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-6" style={{ minHeight: 280 }}>
        <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold mb-3 self-start">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
          DESTACADO
        </div>
        <h2 className="text-3xl font-black leading-tight mb-1">La 10 🇦🇷</h2>
        <p className="text-zinc-300 text-sm font-semibold mb-4">Pan celeste, panceta, huevo, doble carne + papas</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-red-400">$10.000</span>
          <button
            onClick={goToMenu}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
          >
            Ver menú →
          </button>
        </div>
      </div>
    </div>

    {/* Sección info rápida */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[#161616] border border-white/5 rounded-[20px] p-4 flex flex-col gap-1">
        <span className="text-2xl">⚡</span>
        <div className="font-black text-sm">Pedido rápido</div>
        <div className="text-zinc-500 text-xs font-semibold">Por WhatsApp directo</div>
      </div>
      <div className="bg-[#161616] border border-white/5 rounded-[20px] p-4 flex flex-col gap-1">
        <span className="text-2xl">🚚</span>
        <div className="font-black text-sm">Envío o retiro</div>
        <div className="text-zinc-500 text-xs font-semibold">Elegís vos</div>
      </div>
    </div>

    {/* CTA */}
    <button
      onClick={goToMenu}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-[20px] font-black text-lg transition-all active:scale-[0.98] shadow-[0_8px_30px_rgba(239,68,68,0.35)]"
    >
      VER MENÚ COMPLETO
    </button>

    {/* Footer info */}
    <div className="text-center text-zinc-600 text-xs font-semibold pb-2">
      Las burgers más <span className="text-red-500">icónicas</span> de la ciudad 🍔
    </div>
  </div>
);

export default HomeView;
