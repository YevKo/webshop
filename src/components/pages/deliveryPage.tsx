import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import { Box, FormControl, Grid, Input, InputLabel, Stack, TextField, Typography } from "@mui/material";
import GrayBox from "../box/GrayBox";
import ButtonMain from "../buttons/ButtonMain";
import { FormData } from "../../types";

const DeliveryPage: React.FC = () => {
    const { cart, handleNext, method, DELIVERY_COST } = useContext(CartContext);

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
                        <Typography variant='titleMedium' component='div'>Contact information</Typography>
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                            noValidate
                        >
                            <FormControl variant="standard">
                                <InputLabel htmlFor="email">Email*</InputLabel>
                                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="phone">Mobile phone*</InputLabel>
                                <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/>
                            </FormControl>
                        </Box>
                    </div>
                    {/* Delivery adress, optional */}
                    <div>
                        <Typography variant='titleMedium' component='div'>Shipping address (optional)</Typography>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1 },'& .MuiFormControl-root': { width: '46%' },}}
                            noValidate
                        >
                            <FormControl variant="standard">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="surname">Surname</InputLabel>
                                <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="street">Street</InputLabel>
                                <Input id="street" name="street" value={formData.street} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="postcode">Postcode</InputLabel>
                                <Input type="number" id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="city">City</InputLabel>
                                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="country">Country</InputLabel>
                                <Input id="country" disabled defaultValue="Finland" />
                            </FormControl>
                        </Box>
                    </div>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                {/* Cart summary */}
                <GrayBox>
                    <Typography component='h2' variant='titleMedium'>Order summary</Typography>
                    <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                        <Typography variant='titleSmall'>Subtotal</Typography>
                        <Typography variant='titleMedium'>€{ subTotal }</Typography>
                    </Box>
                        <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                        <Typography variant='titleSmall'>Delivery</Typography>
                        <Typography variant='titleMedium'>€{ deliveryCost }</Typography>
                    </Box>
                    <div className='divider'></div>
                    <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                        <Typography variant='titleSmall'>Total</Typography>
                        <Typography variant='titleMedium'>€{ subTotal + deliveryCost }</Typography>
                    </Box>
                    <Typography component='div' variant='body2' sx={{ marginBottom: '20px'}}>Estimated shipping time: 2 days</Typography>
                    <ButtonMain type="submit" onClick={handlePaymentClick} text="Go to payment" />
                </GrayBox>
            </Grid>
        </Grid>
    );
}
export default DeliveryPage;