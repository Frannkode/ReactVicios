import { Plus } from 'lucide-react';

const ProductCard = ({ prod, cant, setActiveCard, agregarAlCarrito }) => (
  <div
    onClick={() => setActiveCard(prod.id)}
    className={`bg-[#161616] rounded-[24px] overflow-hidden border border-white/5 cursor-pointer flex flex-col transition-all duration-150 active:scale-[0.97] active:border-red-500/30 ${prod.agotado ? 'opacity-50' : ''}`}
  >
    {/* Imagen */}
    <div className="relative h-[140px] overflow-hidden bg-[#1E1E1E]">
      {prod.agotado && (
        <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs rotate-12">AGOTADO</span>
        </div>
      )}
      {cant > 0 && !prod.agotado && (
        <div className="absolute top-2.5 right-2.5 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black z-10 shadow-lg">
          {cant}
        </div>
      )}
      <img
        src={prod.imagen}
        className="w-full h-full object-cover"
        alt={prod.nombre}
      />
    </div>

    {/* Info */}
    <div className="p-3 flex flex-col gap-2 flex-1">
      <h3 className="font-extrabold text-[13px] leading-tight line-clamp-2">{prod.nombre}</h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-red-400 font-black text-sm">
          {prod.precioOculto ? 'Especial' : prod.precio ? `$${prod.precio}` : 'Próx.'}
        </span>
        <button
          disabled={prod.agotado}
          onClick={(e) => { e.stopPropagation(); agregarAlCarrito(prod); }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-md ${
            prod.agotado
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
