// Teaser render of the Product
import { useContext } from 'react';
import { ProductImage, Product, CartItem } from '../../types';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CartIcon from '@mui/icons-material/LocalMall';
import DefaultProductImage from '../../assets/images/default-product.png';
import ProductContext from '../../context/ProductContext';
import ButtonSecondary from '../buttons/ButtonSecondary';

const linkStyle = {
    textDecoration: "none",
    color: 'inherit'
};

const ProductCard: React.FC<{ product: Product, productImage?: ProductImage }> = ( {product, productImage} ) => {
    const { addToCart } = useContext(ProductContext);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        };
        addToCart(newItem);
            // setInCart(true);
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
                    <ButtonSecondary text={"Add to bag"} disabled={product.quantity === 0} onClick={() => handleAddToCart()}>
                        <CartIcon sx={{height: '1rem', mr: 1}}/>
                    </ButtonSecondary>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default ProductCard;