import { PRODUCTOS, VISIBLE_CATEGORIES } from '../data/products';

const TITULOS = { Hamburguesas: '🍔 Burgas', Fritas: '🍟 Papas', Panchos: '🌭 Panchos' };
const fmt = n => '$' + n.toLocaleString('es-AR');

// Carta para mesas del local: solo lectura, sin carrito.
export default function CartaMesasView() {
  const secciones = VISIBLE_CATEGORIES
    .map(cat => ({ cat, items: PRODUCTOS.filter(p => p.categoria === cat && !p.agotado) }))
    .filter(s => s.items.length);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Nunito',_sans-serif]">
      <div className="max-w-md mx-auto px-5 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-red-500">Vicio's Burger</h1>
          <p className="text-white/60 mt-1">Nuestra carta</p>
        </header>

        {secciones.map(({ cat, items }) => (
          <section key={cat} className="mb-8">
            <h2 className="text-2xl font-extrabold text-red-500 border-b border-white/10 pb-2 mb-4">
              {TITULOS[cat] ?? cat}
            </h2>
            <ul className="space-y-4">
              {items.map(p => (
                <li key={p.id} className="flex items-center gap-3">
                  <img src={p.imagen} alt={p.nombre} loading="lazy" className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold">{p.nombre}</p>
                    <p className="text-sm text-white/60">{p.descripcion}</p>
                  </div>
                  <span className="font-black text-red-400 whitespace-nowrap">
                    {p.precio ? fmt(p.precio) : 'Consultar'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-center text-white/40 text-sm mt-10">¡Gracias por visitarnos! 🧡</p>
      </div>
    </div>
  );
}
