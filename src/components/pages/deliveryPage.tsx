import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import { Box, FormControl, Grid, Input, InputLabel, Stack, Typography } from "@mui/material";
import GrayBox from "../box/GrayBox";
import ButtonMain from "../buttons/ButtonMain";
import { FormData } from "../../types";
import ButtonSecondary from "../buttons/ButtonSecondary";
import i18n from "../../i18n";
import CartSummary from "../cart/CartSummary";

const DeliveryPage: React.FC = () => {
    const { cart, handleNext, handleBack, method, DELIVERY_COST } = useContext(CartContext);

    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    const handlePaymentClick = (e: React.FormEvent) : void => {
        handleSubmit(e);
        handleNext();
    }

    const [formData, setFormData] = useState<FormData>({
        city: '',
        postcode: '',
        street: '',
        surname: '',
        phone: '',
        name: '',
        email: '',
    });
    // pre-fill the for with the data from local storage, if exist
    useEffect(() => {
        if (localStorage.getItem('contactFormData')) {
            const savedFormData = localStorage.getItem('contactFormData') || '';
            const parsedData = JSON.parse(savedFormData);
            setFormData(parsedData);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save form data to localStorage
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    };

    return (
        <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
                <Stack spacing={8}>
                    {/* Contact information, required */}
                    <div>
                        <Typography variant='titleMedium' component='div'>{ i18n.t('cart.contact_information') }</Typography>
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                            noValidate
                        >
                            <FormControl variant="standard">
                                <InputLabel htmlFor="email">{ i18n.t('cart.email') }</InputLabel>
                                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="phone">{ i18n.t('cart.phone') }</InputLabel>
                                <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/>
                            </FormControl>
                        </Box>
                    </div>
                    {/* Delivery adress, optional */}
                    <div>
                        <Typography variant='titleMedium' component='div'>{ i18n.t('cart.address') }</Typography>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                            noValidate
                        >
                            <FormControl variant="standard">
                                <InputLabel htmlFor="name">{ i18n.t('cart.name') }</InputLabel>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="surname">{ i18n.t('cart.surname') }</InputLabel>
                                <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="street">{ i18n.t('cart.street') }</InputLabel>
                                <Input id="street" name="street" value={formData.street} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="postcode">{ i18n.t('cart.postcode') }</InputLabel>
                                <Input type="number" id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="city">{ i18n.t('cart.city') }</InputLabel>
                                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="country">{ i18n.t('cart.country') }</InputLabel>
                                <Input id="country" disabled defaultValue="Finland" />
                            </FormControl>
                        </Box>
                    </div>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <CartSummary method={method} subTotal={subTotal} deliveryCost={deliveryCost}>
                    <ButtonSecondary type="submit" onClick={handleBack} text={ i18n.t('cart.back') } />
                    <ButtonMain type="submit" onClick={handlePaymentClick} text={ i18n.t('cart.pay') } />
                </CartSummary>
            </Grid>
        </Grid>
    );
}
export default DeliveryPage;