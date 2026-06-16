import { useState, useEffect } from 'react';
import { usePopup } from './hooks/usePopup';
import { useCart } from './hooks/useCart';
import Popup from './components/ui/Popup';
import SplashScreen from './components/ui/SplashScreen';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import CartView from './views/CartView';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState('home');
  const [activeCard, setActiveCard] = useState(null);
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState('');

  const { popup, triggerPopup } = usePopup();
  const { carrito, agregarAlCarrito, quitarDelCarrito, eliminarItemTotal, subtotal, totalItems, SHIPPING } = useCart(triggerPopup);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const totalCarrito = subtotal;
  const finalTotal = subtotal + (delivery ? SHIPPING : 0);

  const goToMenu = () => {
    setView('menu');
    setActiveCard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    setActiveCard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enviarWhatsapp = () => {
    if (carrito.length === 0) return;
    if (delivery && address.trim() === '') { triggerPopup('Ingresá la dirección de envío', 'error'); return; }
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
    if (delivery) {
      mensaje += `\n🚚 Envío: Sí - $${SHIPPING}\n📍 Dirección: ${address}\n`;
    } else {
      mensaje += `\n🚚 Envío: No (Retiro)\n`;
    }
    mensaje += `\n💰 *Total: $${finalTotal}*`;
    window.open(`https://wa.me/543482535194?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  if (showSplash) return <SplashScreen />;

  return (
    <div className="app-root bg-[#0A0A0A] text-white font-['Nunito',_sans-serif] overflow-x-hidden">
      <Popup {...popup} />

      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <Header view={view} goHome={goHome} goToMenu={goToMenu} setView={setView} totalItems={totalItems} />

        <main className="flex-1 px-4 pb-32">
          {view === 'home' && <HomeView goToMenu={goToMenu} />}
          {view === 'menu' && (
            <MenuView
              carrito={carrito}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              agregarAlCarrito={agregarAlCarrito}
              quitarDelCarrito={quitarDelCarrito}
            />
          )}
          {view === 'cart' && (
            <CartView
              carrito={carrito}
              delivery={delivery}
              setDelivery={setDelivery}
              address={address}
              setAddress={setAddress}
              quitarDelCarrito={quitarDelCarrito}
              eliminarItemTotal={eliminarItemTotal}
              agregarAlCarrito={agregarAlCarrito}
              totalCarrito={totalCarrito}
              SHIPPING={SHIPPING}
              finalTotal={finalTotal}
              goToMenu={goToMenu}
              enviarWhatsapp={enviarWhatsapp}
            />
          )}
        </main>

        <Footer />
        <MobileNav view={view} goHome={goHome} goToMenu={goToMenu} setView={setView} totalItems={totalItems} hidden={activeCard !== null} />
      </div>
    </div>
  );
}
