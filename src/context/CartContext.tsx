import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types';
import ProductContext from './ProductContext';

interface CartContextProps {
    // cart manipulation
    cart: CartItem[];
    addToCart: (CartItem: CartItem) => void;
    removeFromCart: (CartItem: CartItem) => void;
    emptyCart: () => void;
    // payment
    method: string | null;
    setMethod: (method: string | null) => void;
    DELIVERY_COST: number;
    // topbar cart
    anchorElCart: null;
    setAnchorElCart: (target: null | HTMLElement) => void;
    // checkout process
    steps: [],
    activeStep: number;
    setActiveStep: (step: number) => void;
    isStepOptional: (step: number) => boolean;
    isStepSkipped: (step: number) => boolean;
    handleNext: () => void;
    handleBack: () => void;
    handleSkip: () => void;
    handleReset: () => void;
    setSkipped: () => void;
}

const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    emptyCart: () => {},
    method: null,
    setMethod: () => {},
    DELIVERY_COST: 0.00,
    anchorElCart: null,
    setAnchorElCart: () => {},
    steps: [],
    activeStep: 0,
    setActiveStep: () => {},
    isStepOptional: () => false,
    isStepSkipped: () => false,
    handleNext: () => {},
    handleBack: () => {},
    handleSkip: () => {},
    handleReset: () => {},
    setSkipped: () => {},
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

    const [method, setMethod] = useState<string | null>('mobilepay');
    const DELIVERY_COST = 6.90;

    const steps = ['My Bag', 'Delivery', 'Review & Order'];
    const [activeStep, setActiveStep] = useState<number>(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const { products } = useContext(ProductContext);

    // Retrieve cart data from localStorage on component mount
    useEffect(() => {
      const savedCartData = localStorage.getItem('cart');
      if (savedCartData) {
        const parsedCartData = JSON.parse(savedCartData);
        setCart(parsedCartData);
      }
    }, []);

    // Store cart data in localStorage whenever the cart state changes
    useEffect(() => {
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

    const emptyCart = () => {
      setCart([]);
    };

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        console.log(activeStep);
      };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, method, setMethod, DELIVERY_COST, anchorElCart, setAnchorElCart, steps, activeStep, handleNext, handleBack, handleReset, handleSkip, isStepOptional, isStepSkipped } as CartContextProps}>
        {children}
        </CartContext.Provider>
    );
};


export { CartProvider };
export default CartContext;