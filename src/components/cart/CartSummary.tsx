import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GrayBox from '../box/GrayBox';

interface CartSummaryProps {
    method: string | null,
    subTotal: number,
    deliveryCost: number,
    children?: React.ReactNode;
}

const CartSummary: React.FC<CartSummaryProps> = ({ method, subTotal, deliveryCost, children })  => {
    const { i18n } = useTranslation();

    return (
        <GrayBox>
            <Typography component='h2' variant='titleMedium'>{ i18n.t('cart.summary') }</Typography>
            <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                <Typography variant='titleSmall'>{ i18n.t('cart.subtotal')}</Typography>
                <Typography variant='titleMedium'>€{ subTotal }</Typography>
            </Box>
                <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                <Typography variant='titleSmall'>{ i18n.t('cart.delivery_cost')}</Typography>
                <Typography variant='titleMedium'>€{ deliveryCost }</Typography>
            </Box>
            <div className='divider'></div>
            <Box className='cart_total' sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                <Typography variant='titleSmall'>{ i18n.t('cart.total')}</Typography>
                <Typography variant='titleMedium'>€{ subTotal + deliveryCost }</Typography>
            </Box>
            {  method != 'cash' && <Typography component='div' variant='body2' sx={{ marginBottom: '20px'}}>{ i18n.t('cart.shipping_time')}</Typography>}

            { children }
        </GrayBox>
    );
}

export default CartSummary;
