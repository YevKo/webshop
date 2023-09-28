import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { CartItem, ProductImage } from '../../types';
import ProductContext from  '../../context/ProductContext';
import CartContext from '../../context/CartContext';
import { useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const ProductCardCart: React.FC<{ cartItem: CartItem, productImage?: ProductImage }> = ( {cartItem, productImage} ) => { {
    const { products } = useContext(ProductContext);
    const { removeFromCart } = useContext(CartContext);
    // get the product from a list of products
    const product = products.find((p) => p.id === cartItem.id);
    const handleRemoveFromCart = (cartItem: CartItem) => {
        removeFromCart(cartItem);
    }

    const { t } = useTranslation();

    return (
        <Card sx={{ width: '100%', display: 'flex' }} elevation={0} >
            { productImage ?
                <CardMedia
                component='img'
                image={productImage.url}
                alt={productImage.alt}
                sx={{ width: '100px'}}
                >
                </CardMedia>
                :
                <CardMedia
                component='img'
                image={'defaultProduct.png'}
                alt={'default image'}
                sx={{ width: '100px'}}
                >
                </CardMedia>
            }
            <CardContent
                sx={{ padding: '0 0 0 20px !important', width: 'calc(100% - 100px)', display: 'flex', flexDirection: 'column'}}
            >
                <Grid
                    container
                    direction='row'
                    alignItems='flex-start'
                    justifyContent='space-between'
                    columnSpacing='4'
                    marginBottom='15px'
                    >
                <Grid item xs={9}>
                    <Link href={`/products/${cartItem.id}`} className='textStyleSmall'>
                        <Typography variant='body2' component='h3' gutterBottom>
                            {cartItem.name}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                    <Typography variant='h5' component='span'>
                        {cartItem.quantity}
                    </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction='row'
                    alignItems='flex-start'
                    columnSpacing='4'
                    >
                <Grid item xs={9}>
                    <Button color='inherit' sx={{ padding: 0 }} onClick={() => handleRemoveFromCart(cartItem)}>
                        <Typography variant='bold'>{t('cart.remove')}</Typography>
                    </Button>
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
                    <Typography variant='bold' color='text.secondary'>
                        €{cartItem.price}
                    </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}}

export default ProductCardCart;
