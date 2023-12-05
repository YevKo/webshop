import React from 'react';
import { ButtonGroup, Grid, ListItem, Pagination, Typography } from '@mui/material';
import Link from 'next/link';
import Layout from '../src/components/layout/layout';
import fetchProducts from './api/api_products';
import { useTranslation } from 'next-i18next';
import fetchCategories from './api/api_categories';
import ProductsList from '../src/components/product/ProductsList';
import { InferGetServerSidePropsType } from 'next';
// import { Product, ProductImage } from '../../src/types';

export const getServerSideProps = ( async ({locale}: any) =>  {
    let [ products, images ] = await fetchProducts({ lang: locale, category: null, page: 0 });
    const categories = await fetchCategories(locale);

    return {
        props: {
            locale,
            products,
            images,
            categories
        }
    }
})

function ProductListingPage({ locale, products, images, categories }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { t } = useTranslation();
    const [page, setPage] = React.useState(1);
    const [prods, setProds] = React.useState(products);
    const [imgs, setImgs] = React.useState(images);
    const handleChange = async (event: React.ChangeEvent<unknown>, page: number) => {
        const [ productsFetched, imagesFetched ] = await fetchProducts({ lang: locale, category: null, page: page });
        setProds(productsFetched);
        setImgs(imagesFetched);
        setPage(page);
    };

    return (
        <Layout>
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
                                <Grid item xs={6} md={4} component={ListItem}>
                                    <Link href={"/category/" + category.id} className="textStyleMain">{category.name}</Link>
                                </Grid>
                            </React.Fragment>
                            )}
                        </Grid>
                        <ProductsList products={prods} images={imgs} />
                        <Pagination count={5} size="large" page={page} onChange={handleChange} />
                    </>}
        </Layout>
    );
}

export default ProductListingPage;
