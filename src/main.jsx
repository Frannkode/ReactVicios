import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CartaMesasView from './views/CartaMesasView.jsx'
import './index.css'
import { SpeedInsights } from "@vercel/speed-insights/react"

// Punto de entrada corregido para la previsualización
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {location.pathname.replace(/\/$/, '') === '/cartamesas' ? <CartaMesasView /> : <App />}
    <SpeedInsights />
  </React.StrictMode>,
) 