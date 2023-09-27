import React, { useContext} from 'react';
import ProductCard from './ProductCard';
import { Grid, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Product, ProductImage } from '../../types';

const ProductsRelated: React.FC<{products: Product[], images: ProductImage[], category: string, id: number}> = ( {products, images, category, id} ) => {
    const { t } = useTranslation();
    const relatedProducts = products.filter((product) => ((product.category === category) && (product.id !== id)));
    return (
        <>
            { relatedProducts.length !== 0 &&
            <>
                <Typography variant='h2' component='h3' marginBottom='2rem' marginTop='3rem'>{ t('product.related_products')}</Typography>
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