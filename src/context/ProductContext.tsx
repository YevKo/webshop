import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { Product, ProductImage } from '../types';
import { Image } from '@mui/icons-material';

interface ProductContextProps {
  products: Product[];
  images: ProductImage[];
  fetchProducts: () => void;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  images: [],
  fetchProducts: () => {},
  isLoading: false,
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const { data, status } = await axios.get<any[]>(
        'http://ddev-test.ddev.site/products/?_format=json',
      );
      const fetchedProducts:Product[] = data.map((item) => (
        {
          id: item['nid'][0]['value'],
          name: item['title'][0]['value'],
          description: item['field_description'][0]['value'],
          price: item['field_price'][0]['value'],
          quantity: item['field_quantity'][0]['value'],
        }
      ));

      const fetchedImages:ProductImage[] = data.map((item) => (
        item['field_product_image'].map( (image:any) => (
          {
            id: image['target_id'],
            url: image['url'],
            alt: image['alt'],
            productId: item['nid'][0]['value']
          }
        ))));

      setProducts(fetchedProducts);
      setImages(fetchedImages.flat());

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, images, fetchProducts, isLoading } as ProductContextProps}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;
