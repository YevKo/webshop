import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'next-i18next';
import CheckoutLayout from '../src/components/layout/checkout';
import { ProductImage } from '../src/types';
import Link from 'next/link';
import fetchProducts from './api/api_products';

export async function getServerSideProps({locale}: any) {
    const data = await fetchProducts(locale);
    const images = data[1];

    return {
        props: {
            images
        }
    }
}

const ConfirmationPage: React.FC<{images: ProductImage[]}> = ({ images }) => {
    const { t } = useTranslation();

    return (
        <CheckoutLayout images={images}>
            <Typography sx={{ mt: 2, mb: 20 }}>{ t('cart.confirmation_message') }</Typography>
            <Link className='button buttonSecondary textStyleMain noUnderline' href='/products'>{ t('cart.back_to_shopping') }</Link>
        </CheckoutLayout>
    );
}

export default ConfirmationPage;
