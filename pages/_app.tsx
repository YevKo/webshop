
import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/index.css';
import { appWithTranslation } from 'next-i18next'
import { CounterProvider } from '../src/context/CounterContext';
import { CartProvider } from '../src/context/CartContext';
import { ThemeProvider } from '@emotion/react';
import theme from '../src/theme';
import { ProductProvider } from '../src/context/ProductContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={theme}>
      <ProductProvider>
      <CounterProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </CounterProvider>
      </ProductProvider>
    </ThemeProvider>
)

export default appWithTranslation(MyApp)