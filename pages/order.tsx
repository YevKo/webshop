import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import CartContext from "../src/context/CartContext";
import ButtonMain from "../src/components/buttons/ButtonMain";
import ButtonSecondary from "../src/components/buttons/ButtonSecondary";
import { FormData, ProductImage } from "../src/types";
import CartSummary from "../src/components/cart/CartSummary";
import CheckoutLayout from "../src/components/layout/checkout";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import fetchProducts from "./api/api_products";

export async function getServerSideProps({locale}) {
    const [ products, images ]  = await fetchProducts(locale);
    return {
        props: {
            images
        }
    }
}

const OrderPage: React.FC<{images: ProductImage[]}> = ({ images }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { cart, emptyCart, handleNext, handleBack, method, DELIVERY_COST } = useContext(CartContext);

    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    const [formData, setFormData] = useState<FormData>({} as FormData);

    const handlePayClick = () : void => {
        emptyCart();
        localStorage.setItem('contactFormData', '');
        handleNext();
        router.push('/confirmation');
    }

    const handleBackClick = () : void => {
        handleBack();
        router.push('/delivery');
    }

    useEffect(() => {
        const savedFormData = localStorage.getItem('contactFormData') || '""';
        const parsedData:FormData = JSON.parse(savedFormData);
        setFormData(parsedData);
    }, []);

    return (
        <CheckoutLayout images={images}>
            <Grid container spacing={8}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={8}>
                        {/* Contact information & delivery adress */}
                        <div>
                            <Typography variant='titleMedium' component='div' marginBottom="20px">{ t('cart.delivery_details') }</Typography>
                            <Typography>{ formData.name + " " + formData.surname + ", " + formData.phone + ", " + formData.email }</Typography>
                            <Typography> { formData.street + ', '  + formData.postcode + ', ' + formData.city + ', Finland'} </Typography>

                            <ButtonSecondary onClick={() => handleBackClick()} text={ t('cart.edit') } />
                        </div>
                        <div>
                            <Typography variant='titleMedium' component='div' marginBottom="20px">{ t('cart.payment_type') }</Typography>
                            { method === 'cash' ? t('cart.cash') : t('cart.mobilepay') }
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CartSummary method={method} subTotal={subTotal} deliveryCost={deliveryCost}>
                        <ButtonSecondary type="submit" onClick={() => handleBackClick()} text={ t('cart.back') } />
                        <ButtonMain onClick={() => handlePayClick()} text={ t('cart.pay') } />
                    </CartSummary>
                </Grid>
            </Grid>
        </CheckoutLayout>
    );
}
export default OrderPage;