const Popup = ({ mensaje, tipo, visible }) => (
  <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
    <div className={`${
      tipo === 'success' ? 'bg-[#1A1A1A] border-red-500/30' :
      tipo === 'warning' ? 'bg-[#1A1A1A] border-orange-500/30' :
      'bg-[#1A1A1A] border-red-600/50'
    } text-white px-5 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2.5 border whitespace-nowrap text-sm backdrop-blur-xl`}>
      <span className={`w-2 h-2 rounded-full flex-none ${
        tipo === 'success' ? 'bg-red-500' :
        tipo === 'warning' ? 'bg-orange-500' :
        'bg-red-600'
      }`} />
      {mensaje}
    </div>
  </div>
);

export default Popup;
