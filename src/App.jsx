import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, List, Plus, Minus, X, Instagram, Facebook } from 'lucide-react';
import viciosEspecialImg from './assets/img/viciosespecial.jpg';
import megaViciosImg from './assets/img/megavicios.jpg';
import decampoImg from './assets/img/decampo.jpg';
import viciosComunImg from './assets/img/vicioscomun.jpg';
import sandwicheImg from './assets/img/sandwiche.jpg';
import superViciosImg from './assets/img/supervicios.jpg';
import papasImg from './assets/img/papas.jpg';
import papasGrandesImg from './assets/img/papasgrandes.jpg';
import crispyImg from './assets/img/crispy.jpg';
import mini4Img from './assets/img/4minihamburguesas.jpeg';
import mini6Img from './assets/img/6minihamburguesaspapasconcheddar.jpeg';


/**
 * DATOS DE PRODUCTOS
 */
const PRODUCTOS = [

  {
    id: 1,
    categoria: "Hamburguesas",
    nombre: "ESPECIAL",
    descripcion: "Pan de papa, carne, queso, lechuga, tomate, mayonesa",
    precio: 6000,
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
    agotado: false
  },
  {
    id: 2,
    categoria: "Hamburguesas",
    nombre: "Vicio's Comun",
    descripcion: "Pan de papa, doble carne, doble cheddar, panceta, mayonesa",
    precio: 6600,
    imagen: viciosComunImg,
    agotado: false
  },
  {
    id: 3,
    categoria: "Hamburguesas",
    nombre: "Vicio's Especial",
    descripcion: "Pan de papa, doble carne, doble cheddar, panceta, lechuga, tomate, mayonesa",
    precio: 7200,
    imagen: viciosEspecialImg,
    agotado: false
  },
  {
    id: 4,
    categoria: "Hamburguesas",
    nombre: "Mega Vicio's",
    descripcion: "Pan de papa, doble carne, doble cheddar, panceta, cebolla caramelizada, mayonesa",
    precio: 7800,
    imagen: megaViciosImg,
    agotado: false
  },
  {
    id: 5,
    categoria: "Hamburguesas",
    nombre: "De la casa",
    descripcion: "Pan de papa, doble carne, panceta, queso, cheddar, aderezo de la casa, mayonesa",
    precio: 7000,
    imagen: decampoImg,
    agotado: false
  },
  {
    id: 6,
    categoria: "Hamburguesas",
    nombre: "Super Vicio's",
    descripcion: "Pan de papa, triple carne, triple cheddar, huevo, panceta, lechuga, tomate, mayonesa",
    precio: 8500,
    imagen: superViciosImg,
    agotado: false
  },
  {
    id: 7,
    categoria: "Hamburguesas",
    nombre: "Vicio's Crispy",
    descripcion: "Pan de papa, doble carne, doble cheddar, huevo, panceta, cebolla crispy, mayonesa",
    precio: 7800,
    imagen: crispyImg,
    agotado: false
  }
  ,
  {
    id: 8,
    categoria: "Sandwiches",
    nombre: "Sandwiche de Milanesa",
    descripcion: "Pan de papa, milanesa de carne, queso, lechuga, tomate, mayonesa",
    precio: null,
    imagen: sandwicheImg,
    agotado: false
  },
  {
    id: 9,
    categoria: "Pizzas",
    nombre: "Pizza Especial",
    descripcion: "Prepizza casera, salsa, paleta, queso, morrón, aceitunas",
    precio: null,
    imagen: "https://images.unsplash.com/photo-1601924582975-4d15b8c0f3c3?q=80&w=500&auto=format&fit=crop",
    agotado: false
  },
  {
    id: 10,
    categoria: "Fritas",
    nombre: "Papafritas",
    descripcion: "Papas fritas",
    precio: 3500,
    imagen: papasImg,
    agotado: false
  },
  {
    id: 11,
    categoria: "Fritas",
    nombre: "Papas Grandes",
    descripcion: "Papas fritas grandes, crujientes",
    precio: 6000,
    imagen: papasGrandesImg,
    agotado: false
  },
  {
    id: 12,
    categoria: "Combos",
    nombre: "4 MINI HAMBURGUESAS",
    descripcion: "4 mini hamburguesa, 2 salsas y papas con cheddar",
    precio: 14000,
    imagen: mini4Img,
    agotado: false
  },
  {
    id: 13,
    categoria: "Combos",
    nombre: "6 MINI HAMBURGUESAS",
    descripcion: "6 mini hamburguesas, Papas con cheddar, 2 salsas",
    precio: 18000,
    imagen: mini6Img,
    agotado: false
  }
];

// Categorías mostradas en el menú (para deshabilitar secciones, quitar de esta lista)
const VISIBLE_CATEGORIES = ['Hamburguesas', 'Combos', 'Fritas'];

const Popup = ({ mensaje, tipo, visible }) => (
  <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
    <div className={`${tipo === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border-2 border-white/20 whitespace-nowrap text-lg`}>
      {mensaje}
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState('home');
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem('vicios_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [popup, setPopup] = useState({ mensaje: '', tipo: 'success', visible: false });
  const [activeCard, setActiveCard] = useState(null);
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState('');

  const getTagClass = (tag) => {
    const t = tag.toLowerCase();
    if (/carne/.test(t)) return 'bg-red-600 text-white';
    if (/cheddar|queso/.test(t)) return 'bg-amber-400 text-black';
    if (/panceta|bacon/.test(t)) return 'bg-rose-600 text-white';
    if (/huevo/.test(t)) return 'bg-amber-300 text-black';
    if (/lechuga|tomate|cebolla|morr[oó]n|morron/.test(t)) return 'bg-green-600 text-white';
    if (/mayonesa|salsa|aderezo/.test(t)) return 'bg-zinc-700 text-zinc-200';
    if (/caramelizada|crispy/.test(t)) return 'bg-indigo-600 text-white';
    if (/prepizza|pizza|paleta|aceitunas/.test(t)) return 'bg-orange-600 text-white';
    return 'bg-zinc-800 text-zinc-200';
  };

  useEffect(() => {
    localStorage.setItem('vicios_cart', JSON.stringify(carrito));
  }, [carrito]);

  const triggerPopup = (mensaje, tipo = 'success') => {
    setPopup({ mensaje, tipo, visible: true });
    setTimeout(() => setPopup(prev => ({ ...prev, visible: false })), 2000);
  };

  const agregarAlCarrito = (producto) => {
    if (producto.agotado) {
      triggerPopup(`¡${producto.nombre} no está disponible actualmente!`, 'error');
      return;
    }
    setCarrito(prev => {
      const itemExistente = prev.find(item => item.id === producto.id);
      if (itemExistente) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    triggerPopup(`¡${producto.nombre} agregado!`);
  };

  const quitarDelCarrito = (id) => {
    setCarrito(prev => {
      const item = prev.find(item => item.id === id);
      if (!item) return prev;
      if (item.cantidad > 1) {
        return prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
    triggerPopup(`Unidad removida`, 'error');
  };

  const eliminarItemTotal = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
    triggerPopup('Producto eliminado', 'error');
  };

  const subtotal = carrito.reduce((acc, item) => acc + ((item.precio || 0) * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const SHIPPING = 600;
  const totalCarrito = subtotal;
  const finalTotal = subtotal + (delivery ? SHIPPING : 0);

  const enviarWhatsapp = () => {
    if (carrito.length === 0) return;
    if (delivery && address.trim() === '') { triggerPopup('Ingrese dirección para envío', 'error'); return; }
    let mensaje = "¡Hola Vicio's Burger! 🍔 Quiero realizar este pedido:\n\n";
    carrito.forEach(item => {
      if (item.precio) {
        mensaje += `✅ ${item.cantidad}x ${item.nombre} - $${item.precio * item.cantidad}\n`;
      } else {
        mensaje += `✅ ${item.cantidad}x ${item.nombre} - Precio: Próximamente\n`;
      }
    });
    mensaje += `\n`;
    if (delivery) {
      mensaje += `🚚 Envío: Sí - $${SHIPPING}\n📍 Dirección: ${address}\n`;
    } else {
      mensaje += `🚚 Envío: No (Retiro)\n`;
    }
    mensaje += `\n💰 *Total: $${finalTotal}*`;
    const url = `https://wa.me/543482535194?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  /* CartSidebar component - compact view for menu layout */
  const CartSidebar = ({ compact = false }) => (
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
                <div className="text-xs text-zinc-400">{item.precio ? `$${item.precio}` : 'Próximamente'}</div>
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

  return (
    <div className="app-root min-h-screen bg-black text-white font-['Inter',_sans-serif] selection:bg-yellow-500 overflow-x-hidden">
      <Popup {...popup} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95" onClick={() => setView('home')}>
          <span className="text-2xl md:text-3xl font-black text-white tracking-tighter font-['Montserrat',_sans-serif] brand">VICIO'S</span>
          <span className="text-2xl md:text-3xl font-black text-yellow-500 tracking-tighter font-['Montserrat',_sans-serif] brand">BURGER</span>
        </div>

        <div className="hidden md:flex gap-8 text-xl uppercase tracking-widest text-zinc-400">
          <button onClick={() => setView('home')} className={`hover:text-yellow-500 transition-colors ${view === 'home' ? 'text-yellow-500' : ''}`}>Inicio</button>
          <button onClick={() => setView('menu')} className={`hover:text-yellow-500 transition-colors ${view === 'menu' ? 'text-yellow-500' : ''}`}>Menú</button>
          <button onClick={() => setView('cart')} className={`hover:text-yellow-500 transition-colors relative ${view === 'cart' ? 'text-yellow-500' : ''}`}>
            Carrito
            {totalItems > 0 && <span className="absolute -top-3 -right-5 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black animate-bounce">{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="pt-24 pb-32 md:pb-12 max-w-7xl mx-auto px-4 md:px-8">

        {view === 'home' && (
          <div className="relative min-h-[90vh] flex flex-col items-center py-12">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[180px] rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[200px] rounded-full -z-10" />

            <div className="grid lg:grid-cols-2 gap-16 items-center w-full mb-32 relative z-10">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-zinc-900/60 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-8 animate-bounce shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/20">
                  <span className="flex h-3 w-3 bg-red-500 rounded-full animate-ping" />
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-white">¡NUEVAS OFERTAS! 🔥</span>
                </div>

                <h1 className="text-7xl md:text-[11rem] font-black leading-[0.8] mb-10 uppercase italic font-['Montserrat',_sans-serif] tracking-tighter">
                  <span className="block text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">SABOR</span>
                  <span className="block bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-[0_15px_35px_rgba(234,179,8,0.4)]">EXTREMO</span>
                </h1>

                <p className="text-xl md:text-3xl text-zinc-400 mb-14 max-w-lg mx-auto lg:mx-0 font-sans italic leading-relaxed font-medium">
                  Las burgers más icónicas. <br className="hidden md:block" /> Un vicio del que no querrás salir. 🍔
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <button
                    onClick={() => setView('menu')}
                    className="group relative bg-yellow-500 hover:bg-white text-black px-14 py-7 rounded-[35px] text-3xl font-black transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_25px_60px_rgba(234,179,8,0.4)] font-['Montserrat',_sans-serif] overflow-hidden"
                  >
                    <span className="relative z-10">PEDIR AHORA</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-[500px]">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-[120px] rounded-full animate-pulse" />
                  <div className="relative z-10 p-4 bg-zinc-900/20 backdrop-blur-sm border border-white/10 rounded-[60px] transform hover:rotate-2 transition-transform duration-700 shadow-2xl overflow-hidden group">
                    <img
                      src={PRODUCTOS[1].imagen}
                      className="w-full rounded-[45px] transition-all duration-700 group-hover:scale-110"
                      alt="Mega Burger"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 md:-right-12 z-20 bg-black/80 backdrop-blur-xl border-4 border-yellow-500/50 p-6 rounded-[35px] shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500 cursor-default group">
                    <div className="text-yellow-500 text-sm font-black uppercase tracking-tighter mb-1">Doble Carne</div>
                    <div className="text-4xl font-black text-white italic group-hover:scale-110 transition-transform tracking-tighter">$6600</div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROMO SECTION */}
            <div className="w-full">
              <div className="flex flex-col items-center mb-16 gap-4">
                <div className="w-20 h-1.5 bg-yellow-500 rounded-full mb-2"></div>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic font-['Montserrat',_sans-serif] text-center">
                  OFERTAS <span className="text-yellow-500 tracking-tighter">LIMITED</span>
                </h2>
                <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-sm">Prueba lo nuevo de la semana</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {PRODUCTOS.filter(p => p.categoria === 'Combos').map(prod => (
                  <div key={prod.id} className="group relative bg-zinc-900/30 backdrop-blur-xl rounded-[50px] p-8 border border-white/5 hover:border-yellow-500/40 transition-all duration-500 flex flex-col sm:flex-row gap-8 items-center overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <div className="relative w-full sm:w-56 h-56 rounded-[40px] overflow-hidden flex-none shadow-2xl">
                      <img src={prod.imagen} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prod.nombre} />
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-2xl text-[10px] font-black shadow-lg uppercase tracking-widest border border-white/20 animate-pulse">PROMO 🔥</div>
                    </div>

                    <div className="flex-1 text-center sm:text-left relative z-10 flex flex-col h-full py-2">
                      <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter group-hover:text-yellow-500 transition-colors leading-none">{prod.nombre}</h3>
                      <p className="text-zinc-400 text-base mb-8 line-clamp-3 italic leading-snug font-medium">{prod.descripcion}</p>
                      <div className="mt-auto flex items-center justify-between gap-4">
                        <span className="text-4xl font-black text-white tracking-tighter filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">${prod.precio}</span>
                        <button
                          onClick={() => agregarAlCarrito(prod)}
                          className="bg-yellow-500 hover:bg-white text-black px-8 py-3 rounded-2xl font-black hover:scale-105 transition-all active:scale-95 shadow-lg flex items-center gap-2 group/btn"
                        >
                          AGREGAR <Plus size={20} strokeWidth={4} className="group-hover/btn:rotate-90 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'menu' && (
          <div>
            <h1 className="text-5xl md:text-7xl text-center mb-16 uppercase tracking-tighter font-['Montserrat',_sans-serif]">Nuestra <span className="text-yellow-500 italic">Carta</span></h1>

            {VISIBLE_CATEGORIES.map(cat => {
              const displayCat = cat === 'Hamburguesas' ? 'Burgas' : cat === 'Fritas' ? 'Papas' : cat;
              return (
                <section key={cat} className="mb-24">
                  <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                    <span className="text-4xl">{cat === 'Hamburguesas' ? '🍔' : cat === 'Combos' ? '🎁' : cat === 'Sandwiches' ? '🥪' : '🍟'}</span>
                    <h2 className="text-4xl md:text-5xl tracking-tighter text-yellow-500 font-extrabold">{displayCat}</h2>
                  </div>



                  <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4 no-scrollbar" id={`category-${cat}`}>
                    {PRODUCTOS.filter(p => p.categoria === cat).map(prod => {
                      const cant = carrito.find(i => i.id === prod.id)?.cantidad || 0;
                      const tags = prod.descripcion ? prod.descripcion.split(',').map(s => s.trim()).filter(Boolean) : [];
                      const visibleTags = tags.slice(0, 4);
                      return (
                        <div key={prod.id} onClick={() => setActiveCard(prev => prev === prod.id ? null : prod.id)} className={`group bg-zinc-900 rounded-[40px] overflow-hidden border border-white/5 hover:border-yellow-500/50 transition-all duration-300 shadow-xl flex flex-col h-[320px] snap-start flex-none w-[240px] sm:w-auto cursor-pointer relative card-elevated ${prod.agotado ? 'opacity-70 grayscale-[0.5]' : ''}`}>

                          <div className="relative h-[190px] overflow-hidden">
                            {prod.agotado && (
                              <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-sm">
                                <span className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-xl tracking-tighter shadow-2xl border-2 border-white/20 rotate-12">AGOTADO</span>
                              </div>
                            )}
                            {cant > 0 && !prod.agotado && (
                              <div className="absolute top-4 right-4 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl border-4 border-zinc-900 z-10 font-black shadow-lg">
                                {cant}
                              </div>
                            )}
                            <img
                              src={prod.imagen}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              alt={prod.nombre}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-6">
                              <span className="bg-yellow-500 text-black px-3 py-0.5 rounded-lg text-sm font-bold shadow-md badge-pill">
                                {prod.precio ? `$${prod.precio}` : 'Próximamente'}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 flex flex-col flex-grow text-center sm:text-left">
                            <h3 className="text-xl mb-1 uppercase tracking-tight leading-tight min-h-[2rem] flex items-center justify-center sm:justify-start font-extrabold">
                              {prod.nombre}
                            </h3>
                            <div className="flex flex-wrap gap-1 justify-center sm:justify-start mb-3 max-h-[2.6rem] overflow-hidden items-center">
                              {visibleTags.map((tag, i) => (
                                <span key={i} className={`${getTagClass(tag)} px-1 py-0.5 rounded-sm border border-white/5 inline-block max-w-[90px] truncate text-[9px]`}>{tag}</span>
                              ))}
                              {tags.length > visibleTags.length && (
                                <span className="text-[9px] bg-yellow-500 text-black px-1 py-0.5 rounded-sm font-bold ml-1">+{tags.length - visibleTags.length}</span>
                              )}
                            </div>

                            <div className="mt-auto flex gap-3 items-center">
                              <button
                                disabled={prod.agotado}
                                onClick={(e) => { e.stopPropagation(); agregarAlCarrito(prod); }}
                                className={`flex-1 ${prod.agotado ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-black btn-add'} py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black text-sm shadow-lg`}
                              >
                                {prod.agotado ? 'NO DISPONIBLE' : <><Plus size={20} strokeWidth={4} /> AÑADIR</>}
                              </button>
                              {cant > 0 && !prod.agotado && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); quitarDelCarrito(prod.id); }}
                                  className="bg-zinc-800 hover:bg-red-600 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-md border border-white/5"
                                >
                                  <Minus size={18} strokeWidth={3} />
                                </button>
                              )}
                            </div>
                          </div>
                          {activeCard === prod.id && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center">
                              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                              <div className="relative z-40 bg-zinc-900/95 rounded-[30px] w-[90%] h-[90%] p-6 flex items-center justify-center text-center overflow-auto">
                                <p className="text-sm text-zinc-300 max-w-3xl">{prod.descripcion}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-2xl mx-auto px-2">
            <h1 className="text-5xl md:text-7xl text-center mb-12 uppercase italic">Tu <span className="text-yellow-500 tracking-tighter">Bolsa</span></h1>

            {carrito.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/40 rounded-[30px] border-2 border-dashed border-white/10">
                <ShoppingCart size={64} className="mx-auto mb-4 text-zinc-600" />
                <p className="text-xl text-zinc-400 mb-6 uppercase">Tu bolsa está vacía</p>
                <button
                  onClick={() => setView('menu')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-lg font-black uppercase transition-transform hover:scale-105 shadow-md"
                >
                  IR A COMER
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {carrito.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-zinc-900 p-3 rounded-[20px] items-center border border-white/5 shadow-lg">
                    <img src={item.imagen} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg leading-none uppercase tracking-tight mb-1">{item.nombre}</h3>
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <p className="text-yellow-500 text-xl font-extrabold">{item.precio ? `${item.precio}` : 'Próximamente'}</p>
                        <span className="text-zinc-600 text-lg font-sans font-bold">× {item.cantidad}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex bg-zinc-950 rounded-lg p-0.5 border border-white/5 shadow-inner">
                        <button onClick={() => quitarDelCarrito(item.id)} className="p-1 text-zinc-500 hover:text-white transition-colors"><Minus size={16} /></button>
                        <span className="px-2 text-lg min-w-[34px] text-center flex items-center justify-center">{item.cantidad}</span>
                        <button onClick={() => agregarAlCarrito(item)} className="p-1 text-zinc-500 hover:text-white transition-colors"><Plus size={16} /></button>
                      </div>
                      <button
                        onClick={() => eliminarItemTotal(item.id)}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all active:scale-90"
                      >
                        <X size={20} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-8 bg-zinc-900 p-6 rounded-[30px] border-2 border-white/5 shadow-2xl overflow-hidden relative card-elevated">
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <button onClick={() => setDelivery(false)} className={`px-3 py-1 rounded-full ${!delivery ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-800 text-zinc-300'}`}>Retiro</button>
                      <button onClick={() => setDelivery(true)} className={`px-3 py-1 rounded-full ${delivery ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-800 text-zinc-300'}`}>Envío 🚚</button>
                    </div>
                    {delivery && (
                      <div className="mb-3">
                        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección de envío" className="w-full bg-zinc-800 text-white p-2 rounded-lg border border-white/5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mb-4 border-b border-zinc-800 pb-4 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-zinc-400 uppercase tracking-widest">Subtotal:</span>
                      <span className="text-lg text-zinc-400">${totalCarrito}</span>
                    </div>
                    {delivery && (
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-zinc-400 uppercase tracking-widest">Envío:</span>
                        <span className="text-lg text-zinc-400">${SHIPPING}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-zinc-400 uppercase tracking-widest">A PAGAR:</span>
                      <span className="text-3xl md:text-4xl text-yellow-500 font-black tracking-tighter">${finalTotal}</span>
                    </div>
                  </div>
                  <button
                    onClick={enviarWhatsapp}
                    className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-[18px] text-lg flex items-center justify-center gap-3 shadow-md transition-all active:scale-95 font-black uppercase tracking-tight btn btn-cta"
                  >
                    CONFIRMAR POR WHATSAPP
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* NAV MÓVIL */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-950/90 backdrop-blur-2xl border border-white/10 flex justify-around py-4 rounded-[28px] z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => setView('home')}
          className={`flex flex-col items-center gap-1 transition-all transform ${view === 'home' ? 'text-yellow-500 scale-110' : 'text-zinc-600'}`}
        >
          <Home size={26} strokeWidth={view === 'home' ? 3 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Inicio</span>
        </button>
        <button
          onClick={() => setView('menu')}
          className={`flex flex-col items-center gap-1 transition-all transform ${view === 'menu' ? 'text-yellow-500 scale-110' : 'text-zinc-600'}`}
        >
          <List size={26} strokeWidth={view === 'menu' ? 3 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Menú</span>
        </button>
        <button
          onClick={() => setView('cart')}
          className={`relative flex flex-col items-center gap-1 transition-all transform ${view === 'cart' ? 'text-yellow-500 scale-110' : 'text-zinc-600'}`}
        >
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950 font-black shadow-md">
              {totalItems}
            </span>
          )}
          <ShoppingCart size={26} strokeWidth={view === 'cart' ? 3 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Carrito</span>
        </button>
      </nav>

      <footer className="py-6 text-center text-zinc-700 font-sans text-sm tracking-widest uppercase">
        <div>&copy; 2026 VICIO'S BURGER.</div>
        <div className="mt-2 text-xs normal-case tracking-normal">
          Creado por <a href="mailto:poncefrancomiguel@gmail.com" className="text-yellow-500 underline">poncefrancomiguel@gmail.com!</a>
        </div>
      </footer>
    </div>
  );
}