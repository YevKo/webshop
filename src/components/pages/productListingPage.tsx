import React from 'react';
import ProductCard from '../product/productCard';
import { Product } from '../../types';

const productListingPage: React.FC<{ products: Product[] }> = ( {products} ) => {
    return (
        <>
            <h1>Product listing</h1>
            <ul>
                {
                products.map(product =>
                <li key={product.id}>
                    <ProductCard product={product}/>
                </li>
                )}
            </ul>
        </>
    );
}

export default productListingPage;