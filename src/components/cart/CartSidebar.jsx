const CartSidebar = ({ carrito, totalItems, totalCarrito, delivery, SHIPPING, finalTotal, quitarDelCarrito, agregarAlCarrito, setView, enviarWhatsapp }) => (
  <aside className="cart-sidebar">
    <div className="mb-4">
      <h3 className="text-lg font-extrabold">Tu Pedido <span className="text-zinc-400 text-sm">({totalItems})</span></h3>
    </div>
    {carrito.length === 0 ? (
      <div className="text-zinc-500">Tu bolsa está vacía</div>
    ) : (
      <div className="space-y-3">
        {carrito.map(item => (
          <div key={item.id} className="cart-item glass">
            <img src={item.imagen} alt={item.nombre} />
            <div className="flex-1">
              <div className="text-sm font-bold">{item.nombre}</div>
              <div className="text-xs text-zinc-400">
                {item.precioOculto ? 'Especial' : item.precio ? `$${item.precio}` : 'Próximamente'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => quitarDelCarrito(item.id)} className="p-1 text-zinc-400 hover:text-white">-</button>
              <div className="px-2">{item.cantidad}</div>
              <button onClick={() => agregarAlCarrito(item)} className="p-1 text-zinc-400 hover:text-white">+</button>
            </div>
          </div>
        ))}
      </div>
    )}
    <div className="mt-4 border-t border-white/5 pt-4">
      <div className="flex justify-between text-zinc-400 mb-2"><span>Subtotal</span><span>${totalCarrito}</span></div>
      {delivery && <div className="flex justify-between text-zinc-400 mb-2"><span>Envío</span><span>${SHIPPING}</span></div>}
      <div className="flex justify-between font-black text-2xl text-green-500 mb-4"><span>Total</span><span>${finalTotal}</span></div>
      <div className="flex gap-2">
        <button onClick={() => setView('cart')} className="flex-1 btn btn-cta">Ver detalles</button>
        <button onClick={enviarWhatsapp} className="flex-1 btn" style={{ background: '#22c55e', color: '#000', fontWeight: 800 }}>Pedir</button>
      </div>
    </div>
  </aside>
);

export default CartSidebar;
