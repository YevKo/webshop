import React, { useContext} from 'react';
import { ButtonGroup, Grid, List, ListItem, Typography } from '@mui/material';
import Spinner from '../src/components/utils/Spinner';
import Link from 'next/link';
import Layout from '../src/components/layout/layout';
import fetchProducts from './api/api_products';
import { useTranslation } from 'next-i18next';
import fetchCategories from './api/api_categories';
import ProductsList from '../src/components/product/ProductsList';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = ( async ({locale}: any) =>  {
    const [ products, images ] = await fetchProducts(locale, null);
    const categories = await fetchCategories(locale);

    return {
        props: {
            products,
            images,
            categories
        }
    }
})

function ProductListingPage({ products, images, categories }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { t } = useTranslation();

    return (
        <Layout images={images}>
            <Typography variant="h1" component="h1" marginBottom="3rem">{t('product.our_products')}</Typography>
            {
                (products.length === 0) ?
                    <div className="noResults flex items-center justify-center pt-8 pb-8 t">
                        <p>{t('no_results')}</p>
                    </div>
                    :
                    <>
                        <Typography variant="h2" component="h2" marginTop="2rem">{t('category.browse')}</Typography>
                        <Grid container spacing={2} marginBottom="2rem" marginTop="2rem" component={ButtonGroup}>
                            {categories.map(category => <React.Fragment key={category.id}>
                                <Grid item xs={4} component={ListItem}>
                                    <Link href={"/category/" + category.id} className="textStyleMain">{category.name}</Link>
                                </Grid>
                            </React.Fragment>
                            )}
                        </Grid>
                        <ProductsList products={products} images={images} />
                    </>}
        </Layout>
    );
}

export default ProductListingPage;
