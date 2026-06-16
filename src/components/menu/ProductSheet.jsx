import { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PRODUCTOS } from '../../data/products';

const ProductSheet = ({ prodId, cant, onClose, agregarAlCarrito, quitarDelCarrito }) => {
  const prod = PRODUCTOS.find(p => p.id === prodId);
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef(null);
  const startY = useRef(null);
  const dragY = useRef(0);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    dragY.current = 0;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  };

  const onTouchMove = (e) => {
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0 && sheetRef.current) {
      dragY.current = delta;
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const onTouchEnd = () => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'transform 0.28s ease-out';
      if (dragY.current > 100) {
        handleClose();
      } else {
        sheetRef.current.style.transform = 'translateY(0)';
      }
    }
  };

  if (!prod) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#161616] rounded-t-[32px] flex flex-col transition-transform duration-[280ms] ease-out will-change-transform ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ maxHeight: '88dvh' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-none">
          <div className="w-10 h-1 bg-zinc-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center px-5 py-3 flex-none relative">
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-2xl bg-[#1E1E1E] border border-white/6 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 font-black text-base">Detalle</span>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-5 pb-10">
          {/* Foto cuadrada centrada */}
          <div className="flex justify-center my-5">
            <div className="w-52 h-52 rounded-[28px] overflow-hidden border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <img
                src={prod.imagen}
                className="w-full h-full object-cover"
                alt={prod.nombre}
              />
            </div>
          </div>

          {/* Badge agotado */}
          {prod.agotado && (
            <div className="flex justify-center mb-3">
              <span className="bg-red-500/20 border border-red-500/40 text-red-400 px-4 py-1 rounded-full text-sm font-bold">No disponible</span>
            </div>
          )}

          {/* Nombre */}
          <h2 className="text-2xl font-black leading-tight mb-3">{prod.nombre}</h2>

          {/* Descripción */}
          <p className="text-zinc-400 text-sm font-semibold leading-relaxed mb-6">
            {prod.descripcion}
          </p>

          {/* Precio + controles */}
          <div className="flex items-center justify-between bg-[#1E1E1E] border border-white/5 rounded-[20px] p-4">
            <span className="text-2xl font-black text-red-400">
              {prod.precioOculto ? 'Especial' : prod.precio ? `$${prod.precio.toLocaleString('es-AR')}` : 'Próximamente'}
            </span>

            {prod.agotado ? (
              <span className="text-zinc-600 font-bold text-sm">Sin stock</span>
            ) : (
              <div className="flex items-center gap-3">
                {cant > 0 && (
                  <>
                    <button
                      onClick={() => quitarDelCarrito(prod.id)}
                      className="w-10 h-10 rounded-2xl bg-[#0A0A0A] border border-white/8 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-90"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <span className="font-black text-lg min-w-[24px] text-center">{cant}</span>
                  </>
                )}
                <button
                  onClick={() => agregarAlCarrito(prod)}
                  className="w-10 h-10 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all active:scale-90 shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          {/* Total si hay items */}
          {cant > 0 && prod.precio && !prod.agotado && (
            <div className="text-center text-zinc-500 text-sm font-semibold mt-3">
              {cant} en el carrito · ${(prod.precio * cant).toLocaleString('es-AR')} total
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSheet;
