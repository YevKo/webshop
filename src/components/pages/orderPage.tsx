import { Box,Grid, Stack, Typography } from "@mui/material";
import { useContext} from "react";
import CartContext from "../../context/CartContext";
import GrayBox from "../box/GrayBox";
import ButtonMain from "../buttons/ButtonMain";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { FormData } from "../../types";
import i18n from "../../i18n";
import CartSummary from "../cart/CartSummary";

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
                        <Typography variant='titleMedium' component='div' marginBottom="20px">{ i18n.t('cart.delivery_details') }</Typography>
                        <Typography>{ parsedData.name + " " + parsedData.surname + ", " + parsedData.phone + ", " + parsedData.email }</Typography>
                        <Typography> { parsedData.street + ', '  + parsedData.postcode + ', ' + parsedData.city + ', Finland'} </Typography>

                        <ButtonSecondary onClick={handleBack} text={ i18n.t('cart.edit') } />
                    </div>
                    <div>
                        <Typography variant='titleMedium' component='div' marginBottom="20px">{ i18n.t('cart.payment_type') }</Typography>
                        { method === 'cash' ? i18n.t('cart.cash') : i18n.t('cart.mobilepay') }
                    </div>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <CartSummary method={method} subTotal={subTotal} deliveryCost={deliveryCost}>
                    <ButtonSecondary type="submit" onClick={handleBack} text={ i18n.t('cart.back') } />
                    <ButtonMain onClick={() => handlePayClick()} text={ i18n.t('cart.pay') } />
                </CartSummary>
            </Grid>
        </Grid>
    );
}
export default OrderPage;