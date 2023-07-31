import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { CounterProvider } from './context/CounterContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductProvider>
    <CounterProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </CounterProvider>
    </ProductProvider>
  </React.StrictMode>
);
