import React from 'react';
import ProductCard from './ProductCard';
import { Grid, List, ListItem } from '@mui/material';
import { Product, ProductImage } from '../../types';

const ProductsList: React.FC<{products: Product[], images: ProductImage[]}> = ( {products, images} ) => {

    return (
        <Grid container spacing={2} component={List}>
            {products.map(product => <React.Fragment key={product.id}>
                <Grid item xs={12} sm={6} md={4} disableGutters component={ListItem} sx={{ alignItems: 'flex-start' }}>
                    <ProductCard product={product} productImage={images.find((image) => (image.productId === product.id) || null)} />
                </Grid>
            </React.Fragment>
            )}
        </Grid>
    );
}

export default ProductsList;