import React from 'react';
import { Pagination, Typography } from '@mui/material';
import fetchCategories from '../api/api_categories';
import fetchProducts from '../api/api_products';
import Layout from '../../src/components/layout/layout';
import { Category } from '../../src/types';
import { useTranslation } from 'next-i18next';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import ProductsList from '../../src/components/product/ProductsList';


export async function getStaticPaths( context: { locales: any[]; } ) {
    // Return a list of categories
    const categories:Category[]  = await fetchCategories('en');

    const paths = categories.map((category) => {
        let output: any[] = [];
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

export const getStaticProps = (async (context: { params: { category_id: any; }; locale: any; }) => {
    // Fetch necessary data for the products using params.category
    const category_id = context.params.category_id;
    const locale = context.locale;
    const categories:Category[]  = await fetchCategories(locale);
    const category = categories.find(category => category.id === category_id)?.name || null;

    const [ products, images ]  = await fetchProducts({ lang: locale, category, page: 0 });

    return {
        props: {
            locale,
            products,
            images,
            category
        }
    }
})

function CategoryPage({ locale, products, images, category }: InferGetStaticPropsType<typeof getStaticProps>) {
    const { t } = useTranslation();
    const [page, setPage] = React.useState(1);
    const [prods, setProds] = React.useState(products);
    const [imgs, setImgs] = React.useState(images);

    if (!category) {
        return <div>{ t('no_category')}</div>;
    }

    const handleChange = async (event: React.ChangeEvent<unknown>, page: number) => {
        const [ productsFetched, imagesFetched ] = await fetchProducts({ lang: locale, category: null, page: page });
        setProds(productsFetched);
        setImgs(imagesFetched);
        setPage(page);
    };

    return (
        <Layout>
            <Typography variant='h1' component='h1' marginBottom='3rem'>{`${category.toUpperCase()}`}</Typography>
            {
                (products.length === 0) ?
                <div className='noResults flex items-center justify-center pt-8 pb-8 t'>
                    <p>{ t('no_results')}</p>
                </div>
                :
                <>
                    <ProductsList products={prods} images={imgs} />
                    <Pagination count={5} size="large" page={page} onChange={handleChange} />
                </>
            }
        </Layout>
    );
}

export default CategoryPage;