import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import axios, { AxiosResponse }  from 'axios';
import { Product, ProductImage, CartItem } from '../types';

interface ProductContextProps {
  products: Product[];
  images: ProductImage[];
  fetchProducts: () => void;
  isLoading: boolean;
  cart: CartItem[];
  addToCart: (CartItem: CartItem) => void;
  removeFromCart: (CartItem: CartItem) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  images: [],
  fetchProducts: () => {},
  isLoading: false,
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([])

  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      // getting all available products
      const { data } = await axios.get<any[]>(
        'http://ddev-test.ddev.site/products/?_format=json',
      );

      let fetchedProducts:Product[] = data.map( item => {
          return {
            id: item['nid'][0]['value'],
            name: item['title'][0]['value'],
            category: item['field_category'][0]['target_id'],
            description: item['field_description'][0]['value'],
            price: item['field_price'][0]['value'],
            quantity: item['field_quantity'][0]['value'],
          }
        }
      );

      (async function updateProducts(): Promise<void> {
        try {
          const updatedProducts = await Promise.all(fetchedProducts.map( async (product:Product) => {
            const response: AxiosResponse<any> = await axios.get<any>(
              `http://ddev-test.ddev.site/taxonomy/term/${product.category}/?_format=json`
            );
            const responseData: any = response.data;

            return {
              ...product,
              category: responseData['name'][0]['value']
            }
          }));
          setProducts(updatedProducts);

        } catch (error) {
          console.error(error);
        }
      })();

      const fetchedImages:ProductImage[] = data.map((item) => (
        item['field_product_image'].map( (image:any) => (
          {
            id: image['target_id'],
            url: image['url'],
            alt: image['alt'],
            productId: item['nid'][0]['value']
          }
      ))));

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

  useEffect(() => {
    // Retrieve cart data from localStorage on component mount
    const savedCartData = localStorage.getItem('cart');
    if (savedCartData) {
      const parsedCartData = JSON.parse(savedCartData);
      setCart(parsedCartData);
    }
  }, []);

  useEffect(() => {
    // Store cart data in localStorage whenever the cart state changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cart.findIndex(i => i.id === item.id);
    const product = products.find(p => p.id === item.id);
    // if product is in the cart, update it's quantity
    const updatedCart = cart.map((i, index) => {
      // compare a final quantity added to the available product quantity
      let newQuantity = i.quantity + item.quantity;
        if (product && product.quantity != undefined) {
          newQuantity = (i.quantity + item.quantity) >= product.quantity ? product.quantity : i.quantity + item.quantity;
        }
        return (index === existingItemIndex) ? { ...i, quantity: newQuantity } : i
    });
    setCart(updatedCart);

    // if product is not in the cart, just add it
    if(existingItemIndex === -1 ) {
      setCart([...cart, item]);
    }
  }

  const removeFromCart = (item: CartItem) => {
    setCart((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <ProductContext.Provider value={{ products, images, cart, addToCart, removeFromCart, fetchProducts, isLoading } as unknown as ProductContextProps}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;
