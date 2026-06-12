import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, List, Plus, Minus, X, Instagram, Facebook } from 'lucide-react';
import viciosEspecialImg from './assets/img/viciosespecial.jpg';
import megaViciosImg from './assets/img/megavicios.jpg';
import decampoImg from './assets/img/decampo.jpg';
import viciosComunImg from './assets/img/vicioscomun.jpg';
import hamburguesaArgImg from './assets/img/hamburguesaargentina.jpeg';
import cajaArgentinaImg from './assets/img/cajaargentina.jpeg';
import sandwicheImg from './assets/img/sandwiche.jpg';
import superViciosImg from './assets/img/supervicios.jpg';
import papasImg from './assets/img/papas.jpg';
import papasGrandesImg from './assets/img/papasgrandes.jpg';
import crispyImg from './assets/img/crispy.jpg';

const FlagAR = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bandera de Argentina">
    <rect width="60" height="40" fill="#75AADB" />
    <rect y="13" width="60" height="14" fill="#FFFFFF" />
    <rect y="26" width="60" height="14" fill="#75AADB" />
  </svg>
);


/**
 * DATOS DE PRODUCTOS
 */
const PRODUCTOS = [

  {
    id: 12,
    categoria: "Hamburguesas",
    nombre: "La 10",
    descripcion: "Pan de papa celeste, panceta, huevo, doble carne más papas fritas 🍟",
    precio: 10000,
    imagen: hamburguesaArgImg,
    agotado: false
  },

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
    precio: 4500,
    imagen: papasImg,
    agotado: false
  },
  {
    id: 11,
    categoria: "Fritas",
    nombre: "Papas Grandes",
    descripcion: "Papas fritas grandes, crujientes",
    precio: 7500,
    imagen: papasGrandesImg,
    agotado: false
  },
  {
    id: 13,
    categoria: "Extras",
    nombre: "Caja de Argentina",
    descripcion: "Caja especial de Argentina",
    precio: 2000,
    precioOculto: true,
    imagen: cajaArgentinaImg,
    agotado: false
  }
];

// Categorías mostradas en el menú (para deshabilitar secciones, quitar de esta lista)
const VISIBLE_CATEGORIES = ['Hamburguesas', 'Fritas', 'Extras'];

const Stars = () => (
  <svg width="152" height="28" viewBox="0 0 152 28">
    {[0,1,2].map(i => (
      <polygon key={i}
        points="14,2 17.5,10 26,10 19.5,16 22,24 14,19 6,24 8.5,16 2,10 10.5,10"
        fill="#F6C700" stroke="#F6C700" strokeWidth="1"
        transform={`translate(${i * 40}, 0)`}
      />
    ))}
    <polygon
      points="14,2 17.5,10 26,10 19.5,16 22,24 14,19 6,24 8.5,16 2,10 10.5,10"
      fill="none" stroke="#F6C700" strokeWidth="1.5"
      transform="translate(120, 0)"
    />
    <text x="134" y="18" textAnchor="middle" fill="#F6C700"
      fontSize="11" fontWeight="900" fontFamily="Montserrat, sans-serif">?</text>
  </svg>
);

const CopaSVG = () => (
  <svg viewBox="0 0 100 140" className="absolute opacity-[0.04] pointer-events-none select-none"
    style={{ width: '320px', bottom: '-20px', right: '-40px', zIndex: 0 }}
  >
    <rect x="35" y="120" width="30" height="8" rx="2" fill="white"/>
    <rect x="25" y="128" width="50" height="6" rx="2" fill="white"/>
    <rect x="42" y="90" width="16" height="30" fill="white"/>
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="none" stroke="white" strokeWidth="6"/>
    <path d="M18 30 Q5 30 5 50 Q5 75 18 80" fill="none" stroke="white" strokeWidth="5"/>
    <path d="M82 30 Q95 30 95 50 Q95 75 82 80" fill="none" stroke="white" strokeWidth="5"/>
  </svg>
);

const Popup = ({ mensaje, tipo, visible }) => (
  <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
    <div className={`${tipo === 'success' ? 'bg-[#74ACDF]' : tipo === 'warning' ? 'bg-orange-500' : 'bg-red-600'} text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border-2 border-white/20 whitespace-nowrap text-lg`}>
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

  // Navigation helpers to ensure smooth scroll and small UX niceties
  const goToMenu = () => {
    setView('menu');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch { /* noop */ }
  };

  const goHome = () => {
    setView('home');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch { /* noop */ }
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
    triggerPopup(`Unidad removida`, 'warning');
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
      if (item.precioOculto) {
        mensaje += `✅ ${item.cantidad}x ${item.nombre}\n`;
      } else if (item.precio) {
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
                <div className="text-xs text-zinc-400">{item.precioOculto ? 'Especial' : item.precio ? `$${item.precio}` : 'Próximamente'}</div>
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
      <header className="relative fixed top-0 left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#75AADB] via-white to-[#75AADB] opacity-80 pointer-events-none" />
        <div className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95" onClick={goHome}>
          <span className="text-2xl md:text-3xl font-black text-white tracking-tighter font-['Montserrat',_sans-serif] brand">VICIO'S</span>
          <span className="text-2xl md:text-3xl font-black text-[#74ACDF] tracking-tighter font-['Montserrat',_sans-serif] brand">BURGER</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
          <button onClick={goHome} className={`hover:text-[#74ACDF] transition-colors ${view === 'home' ? 'text-[#74ACDF]' : ''}`}>Inicio</button>
          <button onClick={goToMenu} className={`hover:text-[#74ACDF] transition-colors ${view === 'menu' ? 'text-[#74ACDF]' : ''}`}>Menú</button>
          <button onClick={() => setView('cart')} className={`hover:text-[#74ACDF] transition-colors relative ${view === 'cart' ? 'text-[#74ACDF]' : ''}`}>
            Carrito
            {totalItems > 0 && <span className="absolute -top-3 -right-5 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black animate-bounce">{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="pt-20 md:pt-24 pb-32 md:pb-12 max-w-7xl mx-auto px-4 md:px-8">

        {view === 'home' && (
          <div className="relative flex flex-col items-center pt-4 pb-8 md:py-12">
            {/* Background Decorations */}
            <div className="absolute -left-40 top-6 w-[160%] h-24 rotate-12 bg-gradient-to-r from-[#75AADB] to-white opacity-10 -z-20 rounded-full pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[180px] rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[200px] rounded-full -z-10" />
            <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full -z-10"
              style={{ background: 'rgba(116, 172, 223, 0.06)', filter: 'blur(120px)' }} />

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center w-full mb-8 md:mb-32 relative z-10">
              <div className="text-center lg:text-left order-1">
                <div className="flex justify-center lg:justify-start mb-4">
                  <Stars />
                </div>
                <div className="relative inline-flex items-center gap-2 bg-zinc-900/60 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/20">
                  <span className="flex h-3 w-3 bg-red-500 rounded-full animate-ping" />
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-white">¡NUEVAS OFERTAS! 🔥 🇦🇷</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black leading-none mb-10 uppercase italic font-['Montserrat',_sans-serif] tracking-tighter">
                  <span className="block text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">SABOR</span>
                  <span className="block whitespace-nowrap bg-clip-text text-transparent filter drop-shadow-[0_15px_35px_rgba(234,179,8,0.4)]" style={{ backgroundImage: 'linear-gradient(90deg, #fde047, #f97316, #74ACDF)' }}>EXTREMO</span>
                </h1>

                <p className="text-base md:text-xl text-zinc-300 mb-8 md:mb-14 max-w-lg mx-auto lg:mx-0 font-sans italic leading-relaxed font-medium">
                  Las burgers más <span style={{ color: '#74ACDF', fontWeight: 800 }}>icónicas</span>. <br className="hidden md:block" /> Un vicio del que no querrás salir. 🍔
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <button
                    onClick={goToMenu}
                    className="group relative text-black px-8 py-4 md:px-12 md:py-6 rounded-[35px] text-lg md:text-2xl font-black transition-all duration-500 hover:scale-105 hover:brightness-110 active:scale-95 shadow-[0_25px_60px_rgba(116,172,223,0.35)] font-['Montserrat',_sans-serif] overflow-hidden"
                    style={{ background: '#74ACDF' }}
                  >
                    <span className="relative z-10">PEDIR AHORA</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>

              <div className="relative order-2 flex justify-center pb-12">
                <div className="relative w-full max-w-[500px] max-h-[300px] lg:max-h-none">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-[120px] rounded-full animate-pulse" />
                  <svg aria-hidden className="absolute -top-16 left-1/4 w-[380px] h-[380px] opacity-10 -z-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="g1" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#F6E27A" stopOpacity="0.95" />
                        <stop offset="70%" stopColor="#F6E27A" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#F6E27A" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="60" fill="url(#g1)" />
                    <g fill="#F2C94C">
                      {[...Array(12)].map((_,i)=>null)}
                    </g>
                  </svg>
                  <div className="relative z-10 p-4 bg-zinc-900/20 backdrop-blur-sm border border-white/10 rounded-[60px] transform hover:rotate-2 transition-transform duration-700 shadow-2xl overflow-hidden max-h-[300px] lg:max-h-none group ring-0 sm:ring-4 sm:ring-[#75AADB]/20">
                    <img
                      src={hamburguesaArgImg}
                      className="w-full h-full object-cover max-h-[300px] lg:max-h-none rounded-[45px] transition-all duration-700 group-hover:scale-110"
                      alt="La 10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute -inset-0 rounded-[45px] pointer-events-none" />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-8 -right-6 md:-right-12 z-20 bg-black/80 backdrop-blur-xl border-4 border-[#74ACDF]/50 p-6 rounded-[35px] shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500 cursor-default group min-w-[140px]">
                    <div className="text-sm font-black uppercase tracking-tighter mb-1" style={{ color: '#74ACDF' }}>La 10</div>
                    <div className="text-4xl font-black italic group-hover:scale-110 transition-transform tracking-tighter" style={{ color: '#74ACDF' }}>$10000</div>
                  </div>
                  {/* 'La 10' badge */}
                  <div className="absolute top-6 left-6 z-30 bg-[#75AADB]/10 border border-[#75AADB]/30 text-[#75AADB] px-4 py-2 rounded-full font-black tracking-tighter flex items-center gap-2">La 10 <span className="ml-1"><FlagAR className="w-4 h-3 inline-block" /></span></div>
                </div>
              </div>
            </div>

            {/* PROMO SECTION (oculta temporalmente por falta de stock) */}
            <CopaSVG />
          </div>
        )}

        {view === 'menu' && (
          <div>
            <h1 className="text-5xl md:text-7xl text-center mb-8 uppercase tracking-tighter font-['Montserrat',_sans-serif]">Nuestra <span className="italic" style={{ color: '#74ACDF' }}>Carta</span></h1>

            {VISIBLE_CATEGORIES.map(cat => {
              const displayCat = cat === 'Hamburguesas' ? 'Burgas' : cat === 'Fritas' ? 'Papas' : cat;
              return (
                <section key={cat} className="mb-10 md:mb-20">
                  <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                    <span className="text-4xl">{cat === 'Hamburguesas' ? '🍔' : cat === 'Combos' ? '🎁' : cat === 'Sandwiches' ? '🥪' : '🍟'}</span>
                    <h2 className="text-4xl md:text-5xl tracking-tighter font-extrabold" style={{ color: '#74ACDF' }}>{displayCat}</h2>
                  </div>



                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible sm:gap-6 lg:grid-cols-3 xl:grid-cols-4" id={`category-${cat}`}>
                    {PRODUCTOS.filter(p => p.categoria === cat).map(prod => {
                      const cant = carrito.find(i => i.id === prod.id)?.cantidad || 0;
                      const tags = prod.descripcion ? prod.descripcion.split(',').map(s => s.trim()).filter(Boolean) : [];
                      const visibleTags = tags.slice(0, 4);
                      return (
                        <div key={prod.id} onClick={() => setActiveCard(prev => prev === prod.id ? null : prod.id)} className={`group bg-zinc-900 rounded-[40px] overflow-hidden border border-white/5 hover:border-[#74ACDF]/50 transition-all duration-300 shadow-xl flex flex-col min-h-[320px] snap-start flex-none w-[220px] sm:w-auto cursor-pointer relative card-elevated h-auto ${prod.agotado ? 'opacity-70 grayscale-[0.5]' : ''}`}>

                          <div className="relative h-[160px] overflow-hidden">
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
                              <span className="bg-[#74ACDF] text-black px-3 py-0.5 rounded-lg text-sm font-bold shadow-md badge-pill">
                                {prod.precioOculto ? 'Caja especial' : prod.precio ? `$${prod.precio}` : 'Próximamente'}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 flex flex-col flex-grow text-left">
                            <h3 className="text-base mb-1 uppercase tracking-tight leading-tight line-clamp-2 flex items-center justify-start font-extrabold">
                              {prod.nombre}
                            </h3>
                            <div className="flex flex-wrap gap-1 justify-center sm:justify-start mb-3 max-h-[2.6rem] overflow-hidden items-center">
                              {visibleTags.map((tag, i) => (
                                <span key={i} className={`${getTagClass(tag)} px-1 py-0.5 rounded-sm border border-white/5 inline-block max-w-[90px] truncate text-[9px]`}>{tag}</span>
                              ))}
                              {tags.length > visibleTags.length && (
                                <span className="text-[9px] bg-[#74ACDF] text-black px-1 py-0.5 rounded-sm font-bold ml-1">+{tags.length - visibleTags.length}</span>
                              )}
                            </div>

                            <div className="mt-auto flex gap-3 items-center">
                                <button
                                disabled={prod.agotado}
                                onClick={(e) => { e.stopPropagation(); agregarAlCarrito(prod); }}
                                className={`flex-1 ${prod.agotado ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#74ACDF] hover:bg-[#5a96c9] text-black btn-add'} py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black text-sm shadow-lg`}
                              >
                                {prod.agotado ? 'NO DISPONIBLE' : <><Plus size={20} strokeWidth={4} /> AÑADIR</>}
                              </button>
                              {cant > 0 && !prod.agotado && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); quitarDelCarrito(prod.id); }}
                                  aria-label={`Quitar una unidad de ${prod.nombre}`}
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
            <h1 className="text-5xl md:text-7xl text-center mb-6 uppercase italic">Tu <span className="tracking-tighter" style={{ color: '#74ACDF' }}>Bolsa</span></h1>

            {carrito.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/40 rounded-[30px] border-2 border-dashed border-white/10">
                <ShoppingCart size={64} className="mx-auto mb-4 text-zinc-600" />
                <p className="text-xl text-zinc-400 mb-6 uppercase">Tu bolsa está vacía</p>
                <button
                  onClick={goToMenu}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-lg font-black uppercase transition-transform hover:scale-105 shadow-md"
                >
                  IR A COMER
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {carrito.map(item => (
                  <div key={item.id} className="flex flex-row gap-4 bg-zinc-900 p-3 rounded-[20px] items-center border border-white/5 shadow-lg">
                    <img src={item.imagen} className="w-14 h-14 object-cover rounded-lg shadow-md" />
                    <div className="flex-1 text-left">
                      <h3 className="text-lg leading-none uppercase tracking-tight mb-1">{item.nombre}</h3>
                      <p className="text-[#74ACDF] text-xl font-extrabold">{item.precioOculto ? 'Especial' : item.precio ? `$${item.precio} × ${item.cantidad}` : 'Próximamente'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex bg-zinc-950 rounded-lg p-0.5 border border-white/5 shadow-inner">
                        <button onClick={() => quitarDelCarrito(item.id)} aria-label={`Quitar una unidad de ${item.nombre}`} className="p-1 text-zinc-500 hover:text-white transition-colors"><Minus size={16} /></button>
                        <span className="px-2 text-lg min-w-[34px] text-center flex items-center justify-center">{item.cantidad}</span>
                        <button onClick={() => agregarAlCarrito(item)} aria-label={`Agregar una unidad de ${item.nombre}`} className="p-1 text-zinc-500 hover:text-white transition-colors"><Plus size={16} /></button>
                      </div>
                      <button
                        onClick={() => eliminarItemTotal(item.id)}
                        aria-label={`Eliminar ${item.nombre}`}
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
                      <button onClick={() => setDelivery(false)} className={`px-3 py-1 rounded-full ${!delivery ? 'bg-[#74ACDF] text-black font-bold' : 'bg-zinc-800 text-zinc-300'}`}>Retiro</button>
                      <button onClick={() => setDelivery(true)} className={`px-3 py-1 rounded-full ${delivery ? 'bg-[#74ACDF] text-black font-bold' : 'bg-zinc-800 text-zinc-300'}`}>Envío 🚚</button>
                    </div>
                    {delivery && (
                      <div className="mb-3">
                        <label htmlFor="direccion" className="sr-only">Dirección de envío</label>
                        <input id="direccion" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección de envío" className="w-full bg-zinc-800 text-white p-2 rounded-lg border border-white/5" />
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
                      <span className="text-3xl md:text-4xl text-[#74ACDF] font-black tracking-tighter">${finalTotal}</span>
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
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-950/90 backdrop-blur-2xl flex justify-around py-3 rounded-[28px] z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#75AADB] via-white to-[#75AADB] rounded-t-[28px] opacity-80 pointer-events-none" />
        <button
          onClick={goHome}
          className={`flex flex-col items-center gap-1 transition-all transform ${view === 'home' ? 'text-[#74ACDF] scale-110' : 'text-zinc-600'}`}
        >
          <Home size={22} strokeWidth={view === 'home' ? 3 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Inicio</span>
        </button>
        <button
          onClick={goToMenu}
          className={`flex flex-col items-center gap-1 transition-all transform ${view === 'menu' ? 'text-[#74ACDF] scale-110' : 'text-zinc-600'}`}
        >
          <List size={22} strokeWidth={view === 'menu' ? 3 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Menú</span>
        </button>
        <button
          onClick={() => setView('cart')}
          className={`relative flex flex-col items-center gap-1 transition-all transform ${view === 'cart' ? 'text-[#74ACDF] scale-110' : 'text-zinc-600'}`}
        >
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950 font-black shadow-md">
              {totalItems}
            </span>
          )}
          <ShoppingCart size={22} strokeWidth={view === 'cart' ? 3 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Carrito</span>
        </button>
      </nav>

      <footer className="py-6 text-center text-zinc-700 font-sans text-sm tracking-widest uppercase">
        <div>&copy; {new Date().getFullYear()} VICIO'S BURGER.</div>
        <div className="mt-2 text-xs normal-case tracking-normal">
          Creado por <a href="mailto:poncefrancomiguel@gmail.com" className="text-yellow-500 underline">poncefrancomiguel@gmail.com!</a>
        </div>
      </footer>
    </div>
  );
}