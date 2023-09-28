import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios, { AxiosResponse }  from 'axios';
import { Product, ProductImage } from '../types';

interface ProductContextProps {
  products: Product[];
  images: ProductImage[];
  isLoading: boolean;
  lang: string;
  setLang: (value: string) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  images: [],
  isLoading: false,
  lang: 'fi',
  setLang: () => {},
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<string>('fi');

  return (
    <ProductContext.Provider value={{ products, images, isLoading, lang, setLang } as unknown as ProductContextProps}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;
