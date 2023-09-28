import { Typography } from '@mui/material';
import React from 'react';
import ParagraphElement from '../src/components/paragraphs/ParagraphElement';
import Layout from '../src/components/layout/layout';
import fetchProducts from './api/api_products';
import { useTranslation } from 'next-i18next';
import { ParagraphProps, ProductImage } from '../src/types';
import fetchPageData from './api/api_page';


export async function getServerSideProps({locale}: any) {
    const data = await fetchProducts(locale);
    const images = data[1];

    // get About us page data from the nid 6 page
    const paragraphs = await fetchPageData('6', locale);

    return {
        props: {
            images,
            paragraphs
        }
    }
}

const AboutPage: React.FC<{images: ProductImage[], paragraphs: ParagraphProps[]}> = ( { images, paragraphs}  ) => {
    const { t } = useTranslation();

    return (
        <Layout images={images}>
            <Typography variant='h1' component='h1' marginBottom='3rem'>{ t('about_us.heading') }</Typography>
            { paragraphs.map((item:ParagraphProps) => <React.Fragment key={item.id}>
                <ParagraphElement par={item} />
            </React.Fragment>)}
        </Layout>
    );
}

export default AboutPage;