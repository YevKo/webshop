import React, { useContext } from 'react';
import { Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import GrayBox from '../src/components/box/GrayBox';
import CartContent from '../src/components/cart/CartContent';
import CartContext from '../src/context/CartContext';
import ButtonMain from '../src/components/buttons/ButtonMain';
import CartSummary from '../src/components/cart/CartSummary';
import CheckoutLayout from '../src/components/layout/checkout';
import fetchProducts from './api/api_products';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';

export async function getServerSideProps({locale}: any) {
    const [ products, images ]  = await fetchProducts(locale);
    return {
        props: {
            images
        }
    }
}

function CartPage ({ images }: InferGetServerSidePropsType<typeof getServerSideProps>)  {
    const { t } = useTranslation();
    const { cart, handleNext, method, setMethod, DELIVERY_COST } = useContext(CartContext);
    const router = useRouter();

    const handleMethodChange = (event: React.MouseEvent<HTMLElement>, newMethod: string | null) : void => {
        if (newMethod !== null) {
            setMethod(newMethod);
        }
    };
    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    const handlePurchaiseClick = () => {
        handleNext();
        router.push('/delivery');
    }

    return (
        <CheckoutLayout images={images}>
            <Grid container spacing={8}>
                <Grid item xs={12} md={6}>
                    <CartContent images={images} checkout />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={4}>
                        <CartSummary method={method} subTotal={subTotal} deliveryCost={deliveryCost} >
                            { subTotal === 0 ?
                            <Link className='button buttonSecondary textStyleMain noUnderline' href='/products'>{ t('cart.back_to_shopping')}</Link>
                            :
                            <ButtonMain onClick={() => handlePurchaiseClick()} text={ t('cart.checkout') } />
                            }
                        </CartSummary>
                        {/* Payment gateways */}
                        <GrayBox>
                            <Typography component='h2' variant='titleMedium'>{ t('cart.payment_type')}</Typography>
                            <ToggleButtonGroup
                                color='primary'
                                value={method}
                                exclusive
                                onChange={handleMethodChange}
                                aria-label={ t('cart.payment_type') }
                                sx={{ marginTop: '20px'}}
                            >
                                <ToggleButton aria-label={ t('cart.pay_with_cash') } value='cash' sx={{ width: '50%' }}>
                                    <Image src='/icons/cash.png' alt='cash' width={200} height={200}/>
                                </ToggleButton>
                                <ToggleButton aria-label={ t('cart.pay_with_mobilepay') } value='mobilepay' sx={{ width: '50%' }}>
                                    <Image src='/icons/mobilepay.png' alt='mobilepay' width={200} height={200}/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </GrayBox>
                        {/* Delivery info */}
                        <GrayBox>
                            <Typography component='h2' variant='titleMedium'>{ t('cart.delivery') }</Typography>
                            <ul>
                                <li>
                                    { t('cart.info') }
                                </li>
                            </ul>
                        </GrayBox>
                    </Stack>
                </Grid>
            </Grid>
        </CheckoutLayout>
    );
}

export default CartPage;