import { Box, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GrayBox from '../box/GrayBox';
import Cart from '../cart/Cart';
import MobilepayIcon from '../../assets/icons/mobilepay.png';
import CashIcon from '../../assets/icons/cash.png';
import CartContext from '../../context/CartContext';
import ButtonMain from '../buttons/ButtonMain';
import i18n from '../../i18n';
import CartSummary from '../cart/CartSummary';

const CartPage: React.FC = () => {
    const { cart, handleNext, method, setMethod, DELIVERY_COST } = useContext(CartContext);
    const handleMethodChange = (event: React.MouseEvent<HTMLElement>, newMethod: string | null) : void => {
        if (newMethod !== null) {
            setMethod(newMethod);
        }
    };
    let subTotal = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0.00) || 0.00;
    const deliveryCost = method != 'cash' ? DELIVERY_COST : 0.00

    const handlePurchaiseClick = () : void => {
        handleNext();
    }

    return (
        <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
                <Cart checkout />
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                    <CartSummary method={method} subTotal={subTotal} deliveryCost={deliveryCost} >
                        { subTotal === 0 ?
                        <Link className='button buttonSecondary textStyleMain noUnderline' to='/products'>{ i18n.t('cart.back_to_shopping')}</Link>
                        :
                        <ButtonMain onClick={() => handlePurchaiseClick()} text={ i18n.t('cart.checkout') } />
                        }
                    </CartSummary>
                    {/* Payment gateways */}
                    <GrayBox>
                        <Typography component='h2' variant='titleMedium'>{ i18n.t('cart.payment_type')}</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={method}
                            exclusive
                            onChange={handleMethodChange}
                            aria-label={ i18n.t('cart.payment_type') }
                            sx={{ marginTop: '20px'}}
                        >
                            <ToggleButton aria-label={ i18n.t('cart.pay_with_cash') } value='cash' sx={{ width: '50%' }}>
                                <img src={CashIcon} alt='' />
                            </ToggleButton>
                            <ToggleButton aria-label={ i18n.t('cart.pay_with_mobilepay') } value='mobilepay' sx={{ width: '50%' }}>
                                <img src={MobilepayIcon} alt='' />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </GrayBox>
                    {/* Delivery info */}
                    <GrayBox>
                        <Typography component='h2' variant='titleMedium'>{ i18n.t('cart.delivery') }</Typography>
                        <ul>
                            <li>
                                Order before 12:00 and we will ship the same day.
                            </li>
                            <li>
                                Orders made after Friday 12:00 are processed on Monday.
                            </li>
                            <li>
                                No returns accepted
                            </li>
                        </ul>
                    </GrayBox>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default CartPage;