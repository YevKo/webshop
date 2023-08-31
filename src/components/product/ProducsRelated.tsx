import React, { useContext} from 'react';
import ProductCard from '../product/ProductCard';
import { Grid, List, ListItem, Typography } from '@mui/material';
import ProductContext from  '../../context/ProductContext';
import Spinner from '../utils/Spinner';
import { useTranslation } from 'react-i18next';

const ProductsRelated: React.FC<{category: string, id: number}> = ( {category, id} ) => {
    const { products, images, isLoading } = useContext(ProductContext);
    const { t, i18n } = useTranslation();
    const relatedProducts = products.filter((product) => ((product.category === category) && (product.id !== id)));
    console.log(relatedProducts);
    return (
        <>
            { relatedProducts.length !== 0 &&
                <Typography variant="h2" component="h3" marginBottom="2rem" marginTop="3rem">{ i18n.t('product.related_products')}</Typography> }

            { isLoading ?
                <div id="loading">
                    <Spinner />
                </div>
            :
                relatedProducts.length !== 0 &&
                <>
                    <Grid container spacing={2} component={List}>
                        {relatedProducts.map(product =>
                        <Grid item xs={4} component={ListItem} key={product.id} sx={{ alignItems: 'flex-start'}}>
                            <ProductCard product={product} productImage={images.find((image) => (image.productId === product.id) || null )}/>
                        </Grid>
                        )}
                    </Grid>
                </>
            }
        </>
    );
}

export default ProductsRelated;