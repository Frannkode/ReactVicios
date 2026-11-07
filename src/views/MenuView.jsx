import { useState } from 'react';
import { PRODUCTOS, VISIBLE_CATEGORIES } from '../data/products';
import ProductCard from '../components/menu/ProductCard';
import ProductSheet from '../components/menu/ProductSheet';

const DISPLAY_LABELS = { Hamburguesas: 'Burgas', Fritas: 'Papas', Extras: 'Extras' };

const MenuView = ({ carrito, activeCard, setActiveCard, agregarAlCarrito, quitarDelCarrito }) => {
  const [activeCategory, setActiveCategory] = useState('Todas');

  const chips = ['Todas', ...VISIBLE_CATEGORIES];

  const filteredProducts = activeCategory === 'Todas'
    ? PRODUCTOS.filter(p => VISIBLE_CATEGORIES.includes(p.categoria))
    : PRODUCTOS.filter(p => p.categoria === activeCategory);

  const activeProd = activeCard ? PRODUCTOS.find(p => p.id === activeCard) : null;
  const activeCant = activeCard ? (carrito.find(i => i.id === activeCard)?.cantidad || 0) : 0;

  return (
    <>
      <div className="flex flex-col">
        {/* Chips de categoría */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
          {chips.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                activeCategory === cat
                  ? 'bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.35)]'
                  : 'bg-[#161616] text-zinc-400 border border-white/5 hover:text-white'
              }`}
            >
              {DISPLAY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(prod => {
            const cant = carrito.find(i => i.id === prod.id)?.cantidad || 0;
            return (
              <ProductCard
                key={prod.id}
                prod={prod}
                cant={cant}
                setActiveCard={setActiveCard}
                agregarAlCarrito={agregarAlCarrito}
                quitarDelCarrito={quitarDelCarrito}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom sheet de detalle */}
      {activeProd && (
        <ProductSheet
          prodId={activeCard}
          cant={activeCant}
          onClose={() => setActiveCard(null)}
          agregarAlCarrito={agregarAlCarrito}
          quitarDelCarrito={quitarDelCarrito}
        />
      )}
    </>
  );
};

export default MenuView;
