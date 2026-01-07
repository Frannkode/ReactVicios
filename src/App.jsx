import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, List, Plus, Minus, X, Instagram, Facebook } from 'lucide-react';
import viciosEspecialImg from './assets/img/viciosespecial.jpg';
import megaViciosImg from './assets/img/megavicios.jpg';
import decampoImg from './assets/img/decampo.jpg';
import sandwicheImg from './assets/img/sandwiche.jpg';
import superViciosImg from './assets/img/supervicios.jpg';
import papasImg from './assets/img/papas.jpg';
import crispyImg from './assets/img/crispy.jpg';

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
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    categoria: "Hamburguesas",
    nombre: "Vicio's Comun",
    descripcion: "Pan de papa, doble carne, doble cheddar, panceta, mayonesa",
    precio: 6600,
    imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    categoria: "Hamburguesas",
    nombre: "Vicio's Especial",
    descripcion: "Pan de papa, doble carne, doble cheddar, panceta, lechuga, tomate, mayonesa",
    precio: 7200,
    imagen: viciosEspecialImg
  },
  {
    id: 4,
    categoria: "Hamburguesas",
    nombre: "Mega Vicio's",
    descripcion: "Pan de papa, doble carne, doble cheddar, panceta, cebolla caramelizada, mayonesa",
    precio: 7800,
    imagen: megaViciosImg
  },
  {
    id: 5,
    categoria: "Hamburguesas",
    nombre: "De la casa",
    descripcion: "Pan de papa, doble carne, panceta, queso, cheddar, aderezo de la casa, mayonesa",
    precio: 7000,
    imagen: decampoImg
  },
  {
    id: 6,
    categoria: "Hamburguesas",
    nombre: "Super Vicio's",
    descripcion: "Pan de papa, triple carne, triple cheddar, huevo, panceta, lechuga, tomate, mayonesa",
    precio: 8500,
    imagen: superViciosImg
  },
  {
    id: 7,
    categoria: "Hamburguesas",
    nombre: "Vicio's Crispy",
    descripcion: "Pan de papa, doble carne, doble cheddar, huevo, panceta, cebolla crispy, mayonesa",
    precio: 7800,
    imagen: crispyImg
  }
  ,
  {
    id: 8,
    categoria: "Sandwiches",
    nombre: "Sandwiche de Milanesa",
    descripcion: "Pan de papa, milanesa de carne, queso, lechuga, tomate, mayonesa",
    precio: null,
    imagen: sandwicheImg
  },
  {
    id: 9,
    categoria: "Pizzas",
    nombre: "Pizza Especial",
    descripcion: "Prepizza casera, salsa, paleta, queso, morrón, aceitunas",
    precio: null,
    imagen: "https://images.unsplash.com/photo-1601924582975-4d15b8c0f3c3?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 10,
    categoria: "Fritas",
    nombre: "Papafritas",
    descripcion: "Papas fritas",
    precio: 3500,
    imagen: papasImg
  }
];

// Categorías mostradas en el menú (para deshabilitar secciones, quitar de esta lista)
const VISIBLE_CATEGORIES = ['Hamburguesas', 'Fritas'];

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

  const totalCarrito = carrito.reduce((acc, item) => acc + ((item.precio || 0) * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const enviarWhatsapp = () => {
    if (carrito.length === 0) return;
    if (delivery && address.trim() === '') { triggerPopup('Ingrese dirección para envío','error'); return; }
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
      mensaje += `🚚 Envío: Sí\n📍 Dirección: ${address}\n`;
    } else {
      mensaje += `🚚 Envío: No (Retiro)\n`;
    }
    mensaje += `\n💰 *Total: $${totalCarrito}*`;
    const url = `https://wa.me/543482535194?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',_sans-serif] selection:bg-yellow-500 overflow-x-hidden">
      <Popup {...popup} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95" onClick={() => setView('home')}>
          <span className="text-2xl md:text-3xl font-black text-white tracking-tighter font-['Montserrat',_sans-serif]">VICIO'S</span>
          <span className="text-2xl md:text-3xl font-black text-yellow-500 tracking-tighter font-['Montserrat',_sans-serif]">BURGER</span>
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
          <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              <div className="text-center md:text-left">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6 drop-shadow-[0_10px_20px_rgba(234,179,8,0.4)] uppercase italic font-['Montserrat',_sans-serif]">
                  Sabor <br /> <span className="text-yellow-500 tracking-tight">Extremo</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-md mx-auto md:mx-0 font-sans italic leading-relaxed">
                  Las burgers más icónicas. Ingredientes frescos y un vicio del que no querrás salir.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                  <button 
                    onClick={() => setView('menu')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-2xl text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(234,179,8,0.2)]"
                  >
                    VER LA CARTA
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/10 blur-[100px] rounded-full" />
                <img 
                  src={PRODUCTOS[2].imagen} 
                  className="relative z-10 w-full rounded-[50px] shadow-2xl border-2 border-white/5 rotate-1 hover:rotate-0 transition-transform duration-500"
                  alt="Mega Burger"
                />
              </div>
            </div>
          </div>
        )}

        {view === 'menu' && (
          <div>
            <h1 className="text-5xl md:text-7xl text-center mb-16 uppercase tracking-tighter font-['Montserrat',_sans-serif]">Nuestra <span className="text-red-500 italic">Carta</span></h1>
            
            {VISIBLE_CATEGORIES.map(cat => {
              const displayCat = cat === 'Hamburguesas' ? 'Burgas' : cat === 'Fritas' ? 'Papas' : cat;
              return (
              <section key={cat} className="mb-24">
                <div className="flex items-center gap-4 mb-10 border-b border-zinc-900 pb-4">
                  <span className="text-4xl">{cat === 'Hamburguesas' ? '🍔' : cat === 'Sandwiches' ? '🥪' : '🍟'}</span>
                    <h2 className="text-4xl md:text-5xl tracking-tighter text-yellow-500 font-extrabold">{displayCat}</h2>
                </div>

                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4 no-scrollbar">
                  {PRODUCTOS.filter(p => p.categoria === cat).map(prod => {
                    const cant = carrito.find(i => i.id === prod.id)?.cantidad || 0;
                    const tags = prod.descripcion ? prod.descripcion.split(',').map(s => s.trim()).filter(Boolean) : [];
                    const visibleTags = tags.slice(0,4);
                    return (
                      <div key={prod.id} onClick={() => setActiveCard(prev => prev === prod.id ? null : prod.id)} className="group bg-zinc-900 rounded-[40px] overflow-hidden border border-white/5 hover:border-yellow-500/50 transition-all duration-300 shadow-xl flex flex-col h-[280px] snap-start flex-none w-[210px] sm:w-auto cursor-pointer relative">
                        
                        <div className="relative h-[170px] overflow-hidden">
                          {cant > 0 && (
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
                            <span className="bg-yellow-500 text-black px-3 py-0.5 rounded-lg text-sm font-bold shadow-md">
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
                              onClick={(e) => { e.stopPropagation(); agregarAlCarrito(prod); }}
                              className="flex-1 bg-white hover:bg-yellow-500 text-black py-2 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 font-bold text-sm"
                            >
                              <Plus size={18} strokeWidth={3} /> AÑADIR
                            </button>
                            {cant > 0 && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); quitarDelCarrito(prod.id); }}
                                className="bg-zinc-800 hover:bg-red-600 text-white w-10 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-md"
                              >
                                <Minus size={16} strokeWidth={3} />
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
            <h1 className="text-5xl md:text-7xl text-center mb-12 uppercase italic">Tu <span className="text-green-500 tracking-tighter">Bolsa</span></h1>
            
            {carrito.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/40 rounded-[30px] border-2 border-dashed border-zinc-800">
                <ShoppingCart size={64} className="mx-auto mb-4 text-zinc-700" />
                <p className="text-xl text-zinc-500 mb-6 uppercase">No hay nada por aquí...</p>
                <button 
                  onClick={() => setView('menu')}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg text-lg font-black uppercase transition-transform hover:scale-105 shadow-md"
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
                        <p className="text-yellow-500 text-xl font-extrabold">{item.precio ? `$${item.precio}` : 'Próximamente'}</p>
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

                <div className="mt-8 bg-zinc-900 p-6 rounded-[30px] border-2 border-yellow-500/20 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full -mr-10 -mt-10" />
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <button onClick={() => setDelivery(false)} className={`px-3 py-1 rounded-full ${!delivery ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-300'}`}>Retiro</button>
                      <button onClick={() => setDelivery(true)} className={`px-3 py-1 rounded-full ${delivery ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-300'}`}>Envío</button>
                    </div>
                    {delivery && (
                      <div className="mb-3">
                        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección de envío" className="w-full bg-zinc-800 text-white p-2 rounded-lg border border-white/5" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-4 relative z-10">
                    <span className="text-lg text-zinc-400 uppercase tracking-widest">A PAGAR:</span>
                    <span className="text-3xl md:text-4xl text-green-500 font-black tracking-tighter">${totalCarrito}</span>
                  </div>
                  <button 
                    onClick={enviarWhatsapp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-[18px] text-lg flex items-center justify-center gap-3 shadow-md transition-all active:scale-95 font-black uppercase tracking-tight relative z-10"
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
          Creado por <a href="mailto:poncefrancomiguel@gmail.com" className="text-yellow-500 underline">poncefrancomiguel@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}