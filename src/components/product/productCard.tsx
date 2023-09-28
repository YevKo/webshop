// Teaser render of the Product
import { useContext, useEffect, useState } from 'react';
import { ProductImage, Product, CartItem } from '../../types';
import Link from 'next/link';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CartIcon from '@mui/icons-material/LocalMall';
import CartContext from '../../context/CartContext';
import ButtonSecondary from '../buttons/ButtonSecondary';
import { useTranslation } from 'next-i18next';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    marginBottom: '-20px'
};

const ProductCard: React.FC<{ product: Product, productImage?: ProductImage }> = ( {product, productImage} ) => {
    const { cart, addToCart } = useContext(CartContext);
    const [ inCart, setInCart ] = useState<number>(0);
    const { t } = useTranslation();

    useEffect(() => {
        cart.filter((item) => item.id === product.id).length > 0 ? setInCart(cart.filter((item) => item.id === product.id)[0].quantity) : setInCart(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        cart.filter((item) => item.id === product.id).length > 0 ? setInCart(cart.filter((item) => item.id === product.id)[0].quantity) : setInCart(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        };
        addToCart(newItem);
        setInCart((prevValue) => prevValue + 1);
    };

    return (
        <Card sx={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} elevation={0} >
            <Link href={`/products/${product.id}`} style={linkStyle}>
                { productImage ?
                    <CardMedia
                        component='img'
                        height='264'
                        image={productImage.url}
                        alt=''
                    >
                    </CardMedia>
                    :
                    <CardMedia
                        component='img'
                        height='264'
                        image={'../../../public/defaultProduct.png'}
                        alt={'image is coming'}
                    >
                    </CardMedia>
                }
                <CardContent>
                    <Typography variant='titleLarge' component='h3' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        <Typography variant='body1' component='span' style={{ fontWeight: 'bold' }}>
                            {product.price}€
                        </Typography>
                    </Typography>
                </CardContent>
            </Link>

            <CardActions sx={{ marginTop: 'auto'}}>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='flex-start'
                    >
                    <ButtonSecondary sx={{padding: '10px'}} text={inCart ? inCart + ' ' + t('cart.in_cart') : t('product.add_to_bag')} disabled={product.quantity === 0 || inCart == product.quantity} onClick={() => handleAddToCart()}>
                        <CartIcon sx={{height: '1rem', mr: 1}}/>
                    </ButtonSecondary>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default ProductCard;