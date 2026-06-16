import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, quitarDelCarrito, eliminarItemTotal, agregarAlCarrito }) => (
  <div className="flex gap-3 bg-[#161616] p-3 rounded-[20px] items-center border border-white/5">
    <img
      src={item.imagen}
      className="w-16 h-16 object-cover rounded-2xl flex-none"
      alt={item.nombre}
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-extrabold text-sm leading-tight mb-0.5 truncate">{item.nombre}</h3>
      <p className="text-red-400 font-black text-base">
        {item.precioOculto ? 'Especial' : item.precio ? `$${item.precio}` : 'Próximamente'}
      </p>
    </div>
    <div className="flex items-center gap-2 flex-none">
      <div className="flex items-center gap-2 bg-[#1E1E1E] rounded-2xl px-3 py-2 border border-white/5">
        <button onClick={() => quitarDelCarrito(item.id)} className="text-zinc-400 hover:text-white transition-colors">
          <Minus size={14} strokeWidth={2.5} />
        </button>
        <span className="font-black text-sm min-w-[20px] text-center">{item.cantidad}</span>
        <button onClick={() => agregarAlCarrito(item)} className="text-zinc-400 hover:text-white transition-colors">
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
      <button
        onClick={() => eliminarItemTotal(item.id)}
        className="text-zinc-600 hover:text-red-500 p-2 rounded-xl transition-all active:scale-90"
      >
        <Trash2 size={16} strokeWidth={2} />
      </button>
    </div>
  </div>
);

export default CartItem;
