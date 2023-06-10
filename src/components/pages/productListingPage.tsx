import React from 'react';
import ProductCard from '../product/productCard';
import { Product } from '../../types';
import Grid from '@mui/material/Grid';
import { List, ListItem } from '@mui/material';

const productListingPage: React.FC<{ products: Product[] }> = ( {products} ) => {
    return (
        <>
            <h1>Product listing</h1>
            {/* <Grid container spacing={2} component={'ul'}> */}
            <Grid container spacing={2} component={List}>
            {
            products.map(product =>
            <Grid item xs={4} component={ListItem} key={product.id}>
                <ProductCard product={product}/>
            </Grid>
            )}
            </Grid>
        </>
    );
}

export default productListingPage;