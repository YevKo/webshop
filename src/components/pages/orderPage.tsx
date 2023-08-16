import { Box,Grid, Stack, Typography } from "@mui/material";
import { useContext} from "react";
import CartContext from "../../context/CartContext";
import GrayBox from "../box/GrayBox";
import ButtonMain from "../buttons/ButtonMain";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { FormData } from "../../types";

const OrderPage: React.FC = () => {
    const { cart, emptyCart, handleNext, handleBack, method, DELIVERY_COST } = useContext(CartContext);

    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    const handlePayClick = () : void => {
        emptyCart();
        localStorage.setItem('contactFormData', '');
        handleNext();
    }

    const savedFormData = localStorage.getItem('contactFormData') || '';
    const parsedData:FormData = JSON.parse(savedFormData);

    return (
        <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
                <Stack spacing={8}>
                    {/* Contact information & delivery adress */}
                    <div>
                        <Typography variant='titleMedium' component='div' marginBottom="20px">Delivery details</Typography>
                        <Typography>{ parsedData.name + " " + parsedData.surname + ", " + parsedData.phone + ", " + parsedData.email }</Typography>
                        { method != 'cash' && <Typography> { parsedData.street + ', '  + parsedData.postcode + ', ' + parsedData.city + ', Finland'} </Typography>}
                        <ButtonSecondary onClick={handleBack} text="Edit" />
                    </div>
                    <div>
                        <Typography variant='titleMedium' component='div' marginBottom="20px">Payment type</Typography>
                        { method }
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
                    {  method != 'cash' && <Typography component='div' variant='body2' sx={{ marginBottom: '20px'}}>Estimated shipping time: 2 days</Typography>}
                    <ButtonSecondary type="submit" onClick={handleBack} text="Back" />
                    <ButtonMain onClick={() => handlePayClick()} text="Pay" />
                </GrayBox>
            </Grid>
        </Grid>
    );
}
export default OrderPage;