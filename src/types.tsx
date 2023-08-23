export interface Product {
    id: number,
    name: string,
    category: string,
    description: string,
    price: number,
    quantity: number,
    uri: string,
    customizable: boolean,
    reproducible: boolean,
}
export interface ProductImage {
    id: number,
    url: string,
    alt: string,
    productId?: number
}

export interface Cart {
    id: CartItem[];
}
export interface CartItem {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export interface FormData {
    city: string;
    postcode: string;
    street: string;
    surname: string;
    phone: string;
    name: string;
    email: string;
}





