import { PRODUCTOS } from '../../data/products';
import ProductCard from './ProductCard';

const EMOJI = {
  Hamburguesas: '🍔',
  Combos: '🎁',
  Sandwiches: '🥪',
};

const CategorySection = ({ cat, carrito, activeCard, setActiveCard, agregarAlCarrito, quitarDelCarrito }) => {
  const displayCat = cat === 'Hamburguesas' ? 'Burgas' : cat === 'Fritas' ? 'Papas' : cat;
  const productos = PRODUCTOS.filter(p => p.categoria === cat);

  return (
    <section className="mb-10 md:mb-20">
      <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
        <span className="text-4xl">{EMOJI[cat] ?? '🍟'}</span>
        <h2 className="text-4xl md:text-5xl tracking-tighter font-extrabold" style={{ color: '#74ACDF' }}>{displayCat}</h2>
      </div>

      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        id={`category-${cat}`}
      >
        {productos.map(prod => {
          const cant = carrito.find(i => i.id === prod.id)?.cantidad || 0;
          return (
            <ProductCard
              key={prod.id}
              prod={prod}
              cant={cant}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              agregarAlCarrito={agregarAlCarrito}
              quitarDelCarrito={quitarDelCarrito}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
