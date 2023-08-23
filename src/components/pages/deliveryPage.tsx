import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import { Box, FormControl, Grid, Input, InputLabel, Stack, Typography } from "@mui/material";
import GrayBox from "../box/GrayBox";
import ButtonMain from "../buttons/ButtonMain";
import { FormData } from "../../types";
import ButtonSecondary from "../buttons/ButtonSecondary";
import i18n from "../../i18n";
import CartSummary from "../cart/CartSummary";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

const DeliveryPage: React.FC = () => {
    const { cart, handleNext, handleBack, method, DELIVERY_COST } = useContext(CartContext);

    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

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
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
                <Stack spacing={8}>
                    {/* Contact information, required */}
                    <div>
                        <Typography variant='titleMedium' component='div'>{ i18n.t('cart.contact_information') }</Typography>
                        {/* register your input into the hook by invoking the "register" function */}
                        <Box
                            component="div"
                            sx={{'& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                        >
                            <FormControl variant="standard" required>
                                <InputLabel htmlFor="name">{ i18n.t('cart.name') }</InputLabel>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel htmlFor="surname">{ i18n.t('cart.surname') }</InputLabel>
                                <Controller
                                    name="surname"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel htmlFor="email">{ i18n.t('cart.email') }</InputLabel>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/  }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors.email && <span>{ i18n.t('required') }</span>}
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel htmlFor="phone">{ i18n.t('cart.phone') }</InputLabel>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors.phone && <span>{ i18n.t('required') }</span>}
                            </FormControl>
                        </Box>
                    </div>
                    {/* Delivery adress, optional */}
                    <div>
                        <Typography variant='titleMedium' component='div'>{ i18n.t('cart.address') }</Typography>
                        <Box
                            component="div"
                            sx={{'& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                        >
                            <FormControl variant="standard">
                                <InputLabel htmlFor="street">{ i18n.t('cart.street') }</InputLabel>
                                <Controller
                                    name="street"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="postcode">{ i18n.t('cart.postcode') }</InputLabel>
                                <Controller
                                    name="postcode"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="city">{ i18n.t('cart.city') }</InputLabel>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
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
                    <ButtonSecondary  onClick={handleBack} text={ i18n.t('cart.back') } />
                    <ButtonMain type="submit" text={ i18n.t('cart.pay') } />
                </CartSummary>
            </Grid>
        </Grid>
        </form>
    );
}
export default DeliveryPage;