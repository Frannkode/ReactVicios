
# Vicio's Burger — Menú para delivery

Una demo ligera y móvil para mostrar productos y confirmar pedidos por WhatsApp.

Por qué es especial
- Diseño pensado para móvil: cards horizontales con snap, aspecto tipo app de delivery.
- Cards compactas 3:4, fotos destacadas y badges de ingredientes.
- Carrito optimizado, opción Envío/Retiro y generación automática de mensaje para WhatsApp.

Estado y contenido
- Código principal: `src/App.jsx` (UI, carrito, lógica de pedido).
- Estilos: Tailwind en `src/index.css` + reglas extra en `src/App.css`.
- Imágenes: `src/assets/img/` — puedes reemplazarlas por tus fotos.
- Fuentes: `Inter` para el cuerpo y `Montserrat` para títulos.

Cómo ejecutar (desarrollo)
```bash
npm install
npm run dev
```

Flujo de uso
1. Abrir la app en el móvil o emulador.
2. Ir a "Menú" — explorar Burgas y Papas.
3. Tocar "AÑADIR" para sumar al carrito.
4. En carrito elegir Retiro/Envío y confirmar por WhatsApp.

Administración rápida (idea)
Si quieres que el local pueda cerrarse/abrirse desde el celular, puedo añadir un panel admin mínimo con Firebase o Supabase que guarde el estado `closed` y `openingTime` — la app escucharía en tiempo real y mostraría un overlay "cerrado".

Contacto
- Creado por: poncefrancomiguel@gmail.com

Si quieres, implemento ahora el panel admin PoC (Firebase/Firestore).
