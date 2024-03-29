import React from 'react';
import type { InferGetServerSidePropsType, Metadata } from 'next'
import { Box, ButtonGroup, Grid, ListItem, Typography } from '@mui/material';
import Layout from '../src/components/layout/layout';
import SearchInput from '../src/components/search/searchInput';
import fetchProducts from './api/api_products';
import { useTranslation } from 'next-i18next';
import fetchPageData from './api/api_page';
import ParagraphElement from '../src/components/paragraphs/ParagraphElement';
import { ParagraphProps } from '../src/types';
import ProductsList from '../src/components/product/ProductsList';
import fetchCategories from './api/api_categories';
import Link from 'next/link';

export const getServerSideProps = ( async ({locale}: any) =>  {
  const [ products, images ]  = await fetchProducts({ lang: locale, category: null, page: 0 });
  const latest = products.slice(0,3);
  const latestImages = images.slice(0,3);
  const categories = await fetchCategories(locale);

  // get Home page data from the nid 1 page
  const paragraphs = await fetchPageData('1', locale);

  return {
      props: {
        products,
        paragraphs,
        latest,
        latestImages,
        categories
      }
  }
});

function App({ products, paragraphs, latest, latestImages, categories }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();

  return (
    <Layout className={'home'}>
      { paragraphs.map( (item:ParagraphProps) => <React.Fragment key={item.id}>
          <ParagraphElement par={item} />
        </React.Fragment>)
      }
      <Box sx={{ backgroundColor: 'primary.light', minWidth: '10rem', maxWidth: '600px', margin: '3rem auto', padding: '3rem', textAlign: 'center' }}>
        <Typography variant='h3' component='h2'>{t('search.heading')}</Typography>
          <SearchInput data={products} />
          <Grid container spacing={2} marginTop='2rem' component={ButtonGroup} justifyContent={'center'}>
              {categories.map(category => <React.Fragment key={category.id}>
                  <Grid item xs={6} md={4} component={ListItem} justifyContent={'center'}>
                      <Link href={'/category/' + category.id} className='textStyleMain'>{category.name}</Link>
                  </Grid>
              </React.Fragment>
              )}
          </Grid>
      </Box>
      <Typography variant='h2' component='h2' marginTop='3rem'>{t('product.latest')}</Typography>
      <ProductsList products={latest} images={latestImages} />
    </Layout>
  )
}

export default App;
