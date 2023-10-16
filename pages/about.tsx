import { Typography } from '@mui/material';
import React from 'react';
import ParagraphElement from '../src/components/paragraphs/ParagraphElement';
import Layout from '../src/components/layout/layout';
import { useTranslation } from 'next-i18next';
import { ParagraphProps } from '../src/types';
import fetchPageData from './api/api_page';


export async function getServerSideProps({locale}: any) {
    // get About us page data from the nid 6 page
    const paragraphs = await fetchPageData('6', locale);

    return {
        props: {
            paragraphs
        }
    }
}

const AboutPage: React.FC<{paragraphs: ParagraphProps[]}> = ( {paragraphs} ) => {
    const { t } = useTranslation();

    return (
        <Layout>
            <Typography variant='h1' component='h1' marginBottom='3rem'>{ t('about_us.heading') }</Typography>
            { paragraphs.map((item:ParagraphProps) => <React.Fragment key={item.id}>
                <ParagraphElement par={item} />
            </React.Fragment>)}
        </Layout>
    );
}

export default AboutPage;