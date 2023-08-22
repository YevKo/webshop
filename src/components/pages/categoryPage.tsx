import React, { useContext} from 'react';
import ProductCard from '../product/ProductCard';
import { Grid, List, ListItem, Typography } from '@mui/material';
import ProductContext from  '../../context/ProductContext';
import Spinner from '../utils/Spinner';
import { useParams } from 'react-router';

const CategoryPage: React.FC = () => {
    const { products, images, isLoading } = useContext(ProductContext);
    const { category } = useParams<{ category: string }>();
    if (!category) {
        return <div>Category is missing</div>;
    }

    const filteredProducts = products.filter(p => p.category.toLowerCase() === category);
    return (
        <>
            <Typography variant="h1" component="h1" marginBottom="3rem">{ `${category.toUpperCase()} listing` }</Typography>
            { isLoading ?
                <div id="loading">
                    <Spinner />
                </div>
            :
                (filteredProducts.length === 0)?
                <div className="noResults flex items-center justify-center pt-8 pb-8 t">
                    <p> No results found </p>
                </div>
                :
                <Grid container spacing={2} component={List}>
                {
                // get the product from a list of products

                filteredProducts.map(product =>
                <Grid item xs={4} component={ListItem} key={product.id}>
                    <ProductCard product={product} productImage={images.find((image) => (image.productId === product.id) || null )}/>
                </Grid>
                )}
                </Grid>
            }
        </>
    );
}

export default CategoryPage;