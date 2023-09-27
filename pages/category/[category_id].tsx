import React from 'react';
import ProductCard from '../../src/components/product/ProductCard';
import { Grid, List, ListItem, Typography } from '@mui/material';
import fetchCategories from '../api/api_categories';
import fetchProducts from '../api/api_products';
import Layout from '../../src/components/layout/layout';
import { Category } from '../../src/types';
import { useTranslation } from 'next-i18next';

export async function getStaticPaths( context ) {
    // Return a list of categories
    const categories:Category[]  = await fetchCategories('en');

    const paths = categories.map((category) => {
        let output = [];
        output = output.concat(context.locales.map((locale) => {
            return {
                params: {
                    category_id: category.id,
                },
                locale: locale
            };
        }))
        return output;
    }).flat();


    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params, locale}) {
    // Fetch necessary data for the products using params.category
    const category_id = params.category_id;
    const categories:Category[]  = await fetchCategories(locale);
    const category = categories.find(category => category.id === category_id)?.name || null;

    const [ products, images ]  = await fetchProducts(locale, category);

    return {
        props: {
            products,
            images,
            category
        }
    }
}

function CategoryPage({ products, images, category }) {
    const { t } = useTranslation();

    if (!category) {
        return <div>{ t('no_category')}</div>;
    }

    return (
        <Layout images={images}>
            <Typography variant='h1' component='h1' marginBottom='3rem'>{`${category.toUpperCase()} listing`}</Typography>
            {
                (products.length === 0) ?
                    <div className='noResults flex items-center justify-center pt-8 pb-8 t'>
                        <p>{ t('no_results')}</p>
                    </div>
                    :
                    <Grid container spacing={2} component={List}>
                        {
                            // get the product from a list of products
                            products.map(product => <Grid item xs={4} component={ListItem} key={product.id}>
                                <ProductCard product={product} productImage={images.find((image) => (image.productId === product.id) || null)} />
                            </Grid>
                            )}
                    </Grid>
                    }
        </Layout>
    );
}

export default CategoryPage;