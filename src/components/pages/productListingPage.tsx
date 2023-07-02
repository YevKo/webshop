import React, { useContext} from 'react';
import ProductCard from '../product/ProductCard';
import { Button, ButtonBase, ButtonGroup, Grid, List, ListItem, Typography } from '@mui/material';
import ProductContext from  '../../context/ProductContext';
import Spinner from '../utils/Spinner';

const ProductListingPage: React.FC = () => {
    const { products, images, isLoading } = useContext(ProductContext);

    return (
        <>
            <Typography variant="h1" component="h1" marginBottom="3rem">Product listing</Typography>
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
                <>
                <Grid container spacing={2} component={List}>
                    {products.map(product =>
                    <Grid item xs={4} component={ListItem} key={product.id}>
                        <ProductCard product={product} productImage={images.find((image) => (image?.productId === product.id) || null )}/>
                    </Grid>
                    )}
                </Grid>
                <Typography variant="h2" component="h2" marginTop="3rem">Browse by category</Typography>
                <Grid container spacing={2} marginTop="2rem" component={ButtonGroup}>
                    {products.map(product =>
                    <Grid item xs={2} component={Button} href={"/products/" + product.category.toLowerCase()} key={product.category}>
                        <div>{ product.category }</div>
                    </Grid>
                    )}
                </Grid>
                </>
            }
        </>
    );
}

export default ProductListingPage;