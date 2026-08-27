import viciosEspecialImg from '../assets/img/viciosespecial.jpg';
import megaViciosImg from '../assets/img/megavicios.jpg';
import decampoImg from '../assets/img/decampo.jpg';
import viciosComunImg from '../assets/img/vicioscomun.jpg';
import cajaArgentinaImg from '../assets/img/cajaargentina.jpeg';
import sandwicheImg from '../assets/img/sandwiche.jpg';
import superViciosImg from '../assets/img/supervicios.jpg';
import papasImg from '../assets/img/papas.jpg';
import papasGrandesImg from '../assets/img/papasgrandes.jpg';
import crispyImg from '../assets/img/crispy.jpg';
import panchoImg from '../assets/img/13ca3035-9748-43c2-91ff-98f9b6b82522.jpg';

export const PRODUCTOS = [
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
  },
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
    precio: 1600,
    precioOculto: true,
    imagen: cajaArgentinaImg,
    agotado: false
  },
  {
    id: 14,
    categoria: "Panchos",
    nombre: "Clásico",
    descripcion: "Pan, salchicha, papas pay, aderezo a elección",
    precio: 4000,
    imagen: panchoImg,
    agotado: false
  },
  {
    id: 15,
    categoria: "Panchos",
    nombre: "JyQ",
    descripcion: "Pan, salchicha, jamón, queso, papas pay y aderezo a elección",
    precio: 5000,
    imagen: panchoImg,
    agotado: false
  },
  {
    id: 16,
    categoria: "Panchos",
    nombre: "Cheddar y panceta",
    descripcion: "Pan, salchicha, cheddar, panceta y aderezo a elección",
    precio: 5600,
    imagen: panchoImg,
    agotado: false
  }
];

export const VISIBLE_CATEGORIES = ['Hamburguesas', 'Fritas', 'Panchos', 'Extras'];
