import { Box, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GrayBox from '../box/GrayBox';
import Cart from '../cart/Cart';
import MobilepayIcon from '../../assets/icons/mobilepay.png';
import CashIcon from '../../assets/icons/cash.png';
import CartContext from '../../context/CartContext';
import ButtonMain from '../buttons/ButtonMain';

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
                        { subTotal === 0 ?
                        <Link className='button buttonSecondary textStyleMain noUnderline' to='/products'>Back to shopping</Link>
                        :
                        <ButtonMain onClick={() => handlePurchaiseClick()} text="Check out" />
                        }
                    </GrayBox>
                    {/* Payment gateways */}
                    <GrayBox>
                        <Typography component='h2' variant='titleMedium'>Payment type</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={method}
                            exclusive
                            onChange={handleMethodChange}
                            aria-label="Payment method"
                            sx={{ marginTop: '20px'}}
                        >
                            <ToggleButton aria-label='Pay with Mobilepay' value='mobilepay' sx={{ width: '200px' }}>
                                <img src={MobilepayIcon} alt='' />
                            </ToggleButton>
                            <ToggleButton aria-label='Pay with Cash' value='cash' sx={{ width: '200px' }}>
                                <img src={CashIcon} alt='' />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </GrayBox>
                    {/* Delivery info */}
                    <GrayBox>
                        <Typography component='h2' variant='titleMedium'>Delivery</Typography>
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