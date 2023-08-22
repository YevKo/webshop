import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ProductProvider } from './context/ProductContext';
import { CounterProvider } from './context/CounterContext';
import { CartProvider } from './context/CartContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductProvider>
    <CounterProvider>
    <CartProvider>
    <I18nextProvider i18n={i18n} defaultNS={'en'}>
      <App />
    </I18nextProvider>
    </CartProvider>
    </CounterProvider>
    </ProductProvider>
  </React.StrictMode>
);
