// Teaser render of the Product
import { useContext, useEffect, useState } from 'react';
import { ProductImage, Product, CartItem } from '../../types';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CartIcon from '@mui/icons-material/LocalMall';
import DefaultProductImage from '../../assets/images/default-product.png';
import CartContext from '../../context/CartContext';
import ButtonSecondary from '../buttons/ButtonSecondary';
import { Trans, useTranslation } from 'react-i18next';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    marginBottom: '-20px'
};

const ProductCard: React.FC<{ product: Product, productImage?: ProductImage }> = ( {product, productImage} ) => {
    const { cart, addToCart } = useContext(CartContext);
    const [ inCart, setInCart ] = useState<number>(0);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        cart.filter((item) => item.id === product.id).length > 0 ? setInCart(cart.filter((item) => item.id === product.id)[0].quantity) : setInCart(0);
    }, []);

    useEffect(() => {
        cart.filter((item) => item.id === product.id).length > 0 ? setInCart(cart.filter((item) => item.id === product.id)[0].quantity) : setInCart(0);
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
            <Link to={`/products/${product.category.toLowerCase()}/${product.id}`} style={linkStyle}>
                { productImage ?
                    <CardMedia
                        component="img"
                        height="264"
                        image={productImage.url}
                        alt=""
                    >
                    </CardMedia>
                    :
                    <CardMedia
                        component="img"
                        height="264"
                        image={DefaultProductImage}
                        alt={"image is coming"}
                    >
                    </CardMedia>
                }
                <CardContent>
                    <Typography variant="titleLarge" component="h3" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Typography variant="body1" component="span" style={{ fontWeight: 'bold' }}>
                            {product.price}€
                        </Typography>
                    </Typography>
                </CardContent>
            </Link>

            <CardActions sx={{ marginTop: "auto"}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    >
                    <ButtonSecondary sx={{padding: '10px'}} text={inCart ? inCart + " " + i18n.t('cart.in_cart') : i18n.t('product.add_to_bag')} disabled={product.quantity === 0 || inCart == product.quantity} onClick={() => handleAddToCart()}>
                        <CartIcon sx={{height: '1rem', mr: 1}}/>
                    </ButtonSecondary>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default ProductCard;