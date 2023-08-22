import { Box, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import ProductContext from  '../../context/ProductContext';
import ProductCardCart from '../product/ProductCardCart';

interface CartProps {
    checkout?: boolean;
}

const Cart: React.FC<CartProps> = ({checkout})  => {
    const { images } = useContext(ProductContext);
    const { cart, handleReset, setAnchorElCart } = useContext(CartContext);
    const { i18n } = useTranslation();

    let totalSum = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0)

    function handleClick(): void {
        setAnchorElCart(null);
        handleReset();
    }

    return (
        <Box className={!checkout ? 'CartDrawer' : ''} sx={{ display: 'flex', flexDirection: 'column', padding: '25px' }}>
            { !checkout && <Typography id='cart-title' variant='h6' component='h2' marginBottom='40px' textTransform='capitalize'>{i18n.t('cart.heading')}</Typography> }
            {cart.length === 0 ? (
                <p>{ i18n.t('cart.empty') }</p>
            ) : (
            <>
                <Grid container rowSpacing={4} sx={{ marginBottom: 'auto'}}>
                    {cart.map((cartItem) => (
                        <Grid item xs={12} key={cartItem.id}>
                            <ProductCardCart cartItem={cartItem} productImage={images.find((image) => (image.productId === cartItem.id) || null) }/>
                        </Grid>
                    ))}
                </Grid>
                <div className='divider'></div>
                <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                    <Typography variant='titleSmall'>{checkout ? i18n.t('cart.subtotal') : i18n.t('cart.total') }</Typography>
                    <Typography variant='titleMedium'>€{ totalSum }</Typography>
                </Box>
                <Box className='cart_actions' sx={{display: 'flex'}}>
                    { checkout ?
                    <Link className='button buttonSecondary textStyleMain noUnderline w-100' to='/products'>{ i18n.t('cart.back_to_shopping') }</Link>
                    :
                    <Link className='button buttonMain textStyleMain noUnderline w-100' to='/checkout' onClick={() => handleClick()}>{ i18n.t('cart.purchase') }</Link>
                    }
                </Box>
            </>
            )}
        </Box>
    );
}

export default Cart;
