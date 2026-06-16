import { useState, useEffect } from 'react';

export const useCart = (triggerPopup) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem('vicios_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vicios_cart', JSON.stringify(carrito));
  }, [carrito]);

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
    triggerPopup('Unidad removida', 'warning');
  };

  const eliminarItemTotal = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
    triggerPopup('Producto eliminado', 'error');
  };

  const subtotal = carrito.reduce((acc, item) => acc + ((item.precio || 0) * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const SHIPPING = 600;

  return {
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    eliminarItemTotal,
    subtotal,
    totalItems,
    SHIPPING,
  };
};
