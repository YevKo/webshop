export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    images?: {
        id: number,
        url: string,
        alt: string
    }[],
}


