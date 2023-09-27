import { Box, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import CartContext from '../../context/CartContext';
import ProductCardCart from '../product/ProductCardCart';
import { ProductImage } from '../../types';

interface CartProps {
    images: ProductImage[],
    checkout?: boolean;
}

const CartContent: React.FC<CartProps> = ({ images, checkout})  => {
    const { cart, handleReset, setAnchorElCart } = useContext(CartContext);
    const { t } = useTranslation();

    let totalSum = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0)

    function handleClick(): void {
        setAnchorElCart(null);
        handleReset();
    }

    return (
        <Box className={!checkout ? 'CartDrawer' : ''} sx={{ display: 'flex', flexDirection: 'column', padding: '25px' }}>
            { !checkout && <Typography id='cart-title' variant='h6' component='h2' marginBottom='40px' textTransform='capitalize'>{t('cart.heading')}</Typography> }
            {cart.length === 0 ? (
                <p>{ t('cart.empty') }</p>
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
                    <Typography variant='titleSmall'>{checkout ? t('cart.subtotal') : t('cart.total') }</Typography>
                    <Typography variant='titleMedium'>€{ totalSum }</Typography>
                </Box>
                <Box className='cart_actions' sx={{display: 'flex'}}>
                    { checkout ?
                    <Link className='button buttonSecondary textStyleMain noUnderline w-100' href='/products'>{ t('cart.back_to_shopping') }</Link>
                    :
                    <Link className='button buttonMain textStyleMain noUnderline w-100' href='/checkout' onClick={() => handleClick()}>{ t('cart.purchase') }</Link>
                    }
                </Box>
            </>
            )}
        </Box>
    );
}

export default CartContent;
