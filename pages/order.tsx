import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import CartContext from "../src/context/CartContext";
import ButtonMain from "../src/components/buttons/ButtonMain";
import ButtonSecondary from "../src/components/buttons/ButtonSecondary";
import { CartItem, FormData, ProductImage } from "../src/types";
import CartSummary from "../src/components/cart/CartSummary";
import CheckoutLayout from "../src/components/layout/checkout";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import fetchProducts from "./api/api_products";
import { v4 } from 'uuid';

const nodePostUrl = 'https://main-bvxea6i-33i32kvwbas3y.de-2.platformsh.site/node/';

const OrderPage: React.FC<{}> = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const { cart, emptyCart, handleNext, handleBack, method, DELIVERY_COST } = useContext(CartContext);

    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    let orderData = '';
    cart.map((cartItem: CartItem) => {
        orderData = orderData + '<a href="/node/' + cartItem.id + '">' + cartItem.name + '</a>, ' + cartItem.quantity + 'kpl.\n'
    });
    orderData = orderData + 'Summa ' + subTotal + ' eur. Maksaa: ' + method;

    const [formData, setFormData] = useState<FormData>({} as FormData);
    let contactData = formData.name + ' ' + formData.surname + ', ' + formData.phone;

    const handlePayClick = () : void => {
        sendOrder();
        emptyCart();
        handleNext();
        localStorage.setItem('contactFormData', '');
        router.push('/confirmation');
    }

    const handleBackClick = () : void => {
        handleBack();
        router.push('/delivery');
    }

    const sendOrder = async() => {
        await PostData(orderData);
    }

    function PostData(orderData: string) {
        let requestURL = nodePostUrl + '?_format=json';
        return new Promise((resolve, reject) => {
            fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Basic ${btoa(`admin:admin`)}`,
                },
                body: JSON.stringify({
                    'type': 'order',
                    'field_order_id': {
                        'value': v4()
                    },
                    'field_date': {
                        'value': new Date().toISOString().split('.')[0] + '+5:00'
                    },
                    'title': {
                        'value' : 'Order from ' + formData['name'] + ' on ' + new Date().toLocaleString()
                    },
                    'field_contact_information': {
                        'value' : contactData,
                    },
                    'field_details': [{
                        'value' : orderData,
                        'format': 'full_html',
                    }],
                })
            })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                console.log('error while creating the order', error)
                reject(error);
            });
        });
    }

    useEffect(() => {
        const savedFormData = localStorage.getItem('contactFormData') || '""';
        const parsedData:FormData = JSON.parse(savedFormData);
        setFormData(parsedData);
    }, []);

    return (
        <CheckoutLayout>
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
                        <ButtonMain onClick={() => handlePayClick()} text={ t('cart.finalise') } />
                    </CartSummary>
                </Grid>
            </Grid>
        </CheckoutLayout>
    );
}
export default OrderPage;