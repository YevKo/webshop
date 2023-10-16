import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Product, ProductImage } from '../../types';
import ProductsList from './ProductsList';

const ProductsRelated: React.FC<{products: Product[], images: ProductImage[], category: string, id: number}> = ( {products, images, category, id} ) => {
    const { t } = useTranslation();
    const relatedProducts = products.filter((product) => ((product.category === category) && (product.id !== id)));
    return (
        <>
            { relatedProducts.length !== 0 &&
            <>
                <Typography variant='h2' component='h3' marginBottom='2rem' marginTop='3rem'>{ t('product.related_products')}</Typography>
                <ProductsList products={relatedProducts} images={images} />
            </>
            }
        </>
    );
}

export default ProductsRelated;