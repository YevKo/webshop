import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'next-i18next';
import CheckoutLayout from '../src/components/layout/checkout';
import Link from 'next/link';

const ConfirmationPage: React.FC<{}> = () => {
    const { t } = useTranslation();

    return (
        <CheckoutLayout>
            <Typography sx={{ mt: 2, mb: 20 }}>{ t('cart.confirmation_message') }</Typography>
            <Link className='button buttonSecondary textStyleMain noUnderline' href='/products'>{ t('cart.back_to_shopping') }</Link>
        </CheckoutLayout>
    );
}

export default ConfirmationPage;
