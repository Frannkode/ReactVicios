const HomeView = ({ goToMenu }) => (
  <div className="flex flex-col gap-6 pb-4">
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
