import { useContext, useEffect, useState } from 'react';
import CartContext from '../src/context/CartContext';
import { Box, FormControl, Grid, Input, InputLabel, Stack, Typography } from '@mui/material';
import ButtonMain from '../src/components/buttons/ButtonMain';
import { FormData, ProductImage } from '../src/types';
import ButtonSecondary from '../src/components/buttons/ButtonSecondary';
import CartSummary from '../src/components/cart/CartSummary';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import React from 'react';
import CheckoutLayout from '../src/components/layout/checkout';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import fetchProducts from './api/api_products';

export async function getServerSideProps({locale}: any) {
    const [ products, images ]  = await fetchProducts(locale);
    return {
        props: {
            images
        }
    }
}

const DeliveryPage: React.FC<{images: ProductImage[]}> = ({ images }) => {
    const { t } = useTranslation();
    const { cart, handleNext, handleBack, method, DELIVERY_COST } = useContext(CartContext);
    const router = useRouter();

    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    const [formData, setFormData] = useState<FormData>({
        name: '',
        surname: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        postcode: '',
    });
    // pre-fill the for with the data from local storage, if exist
    useEffect(() => {
        if (localStorage.getItem('contactFormData')) {
            const savedFormData = localStorage.getItem('contactFormData') || '';
            const parsedData = JSON.parse(savedFormData);
            setFormData(parsedData);
        }
    }, []);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: formData,
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        localStorage.setItem('contactFormData', JSON.stringify(data));
        handleNext();
        router.push('/order');
    }

    const handleBackClick = () : void => {
        handleBack();
        router.push('/checkout');
    }

    return (
        <CheckoutLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={8}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={8}>
                        {/* Contact information, required */}
                        <div>
                            <Typography variant='titleMedium' component='div'>{ t('cart.contact_information') }</Typography>
                            {/* register your input into the hook by invoking the 'register' function */}
                            <Box
                                component='div'
                                sx={{'& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: {xs: '100%', md: '46%'} }}}
                            >
                                <FormControl variant='standard' required>
                                    <InputLabel htmlFor='name'>{ t('cart.name') }</InputLabel>
                                    <Controller
                                        name='name'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl variant='standard' required>
                                    <InputLabel htmlFor='surname'>{ t('cart.surname') }</InputLabel>
                                    <Controller
                                        name='surname'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl variant='standard' required>
                                    <InputLabel htmlFor='email'>{ t('cart.email') }</InputLabel>
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/  }}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl variant='standard' required>
                                    <InputLabel htmlFor='phone'>{ t('cart.phone') }</InputLabel>
                                    <Controller
                                        name='phone'
                                        control={control}
                                        rules={{ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ }}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                    {errors.phone && <span>{ t('required') }</span>}
                                </FormControl>
                            </Box>
                        </div>
                        {/* Delivery adress, optional */}
                        {/* <div>
                            <Typography variant='titleMedium' component='div'>{ t('cart.address') }</Typography>
                            <Box
                                component='div'
                                sx={{'& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                            >
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='street'>{ t('cart.street') }</InputLabel>
                                    <Controller
                                        name='street'
                                        control={control}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='postcode'>{ t('cart.postcode') }</InputLabel>
                                    <Controller
                                        name='postcode'
                                        control={control}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='city'>{ t('cart.city') }</InputLabel>
                                    <Controller
                                        name='city'
                                        control={control}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='country'>{ t('cart.country') }</InputLabel>
                                    <Input id='country' disabled defaultValue='Finland' />
                                </FormControl>
                            </Box>
                        </div> */}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CartSummary method={method} subTotal={subTotal} deliveryCost={deliveryCost}>
                        <ButtonSecondary  onClick={() => handleBackClick()} text={ t('cart.back') } />
                        <ButtonMain type='submit' text={ t('cart.pay') } />
                    </CartSummary>
                </Grid>
            </Grid>
        </form>
        </CheckoutLayout>
    );
}
export default DeliveryPage;