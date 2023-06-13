import React, { useContext} from 'react';
import ProductCard from '../product/ProductCard';
import { Grid, List, ListItem, Typography } from '@mui/material';
import ProductContext from  '../../context/ProductContext';
import Spinner from '../utils/Spinner';
import { ProductImage } from '../../types';

const ProductListingPage: React.FC = () => {
    const { products, images, isLoading } = useContext(ProductContext);

    console.dir(images);
    console.log(images.filter((image) => image.productId === products[1].id));
    return (
        <>
            <Typography variant="h1" component="h1">Product listing</Typography>
            { isLoading ?
                <div id="loading">
                    <Spinner />
                </div>
            :
                (products.length === 0)?
                <div className="noResults flex items-center justify-center pt-8 pb-8 t">
                    <p> No results found </p>
                </div>
                :
                <Grid container spacing={2} component={List}>
                {
                products.map(product =>
                <Grid item xs={4} component={ListItem} key={product.id}>
                    <ProductCard product={product} productImage={images.find((image) => (image?.productId === product.id) || null )}/>
                </Grid>
                )}
                </Grid>
            }
        </>
    );
}

export default ProductListingPage;