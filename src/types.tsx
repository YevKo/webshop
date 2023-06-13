export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
}
export interface ProductImage {
    id: number,
    url: string,
    alt: string,
    productId?: number
}





