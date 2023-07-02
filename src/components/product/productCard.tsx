// Teaser render of the Product

import { ProductImage, Product } from '../../types';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CartIcon from '@mui/icons-material/LocalMall';
import DefaultProductImage from '../../assets/images/default-product.png';

const linkStyle = {
    textDecoration: "none",
    color: 'inherit'
};

const ProductCard: React.FC<{ product: Product, productImage?: ProductImage }> = ( {product, productImage} ) => {
    return (
        <Card sx={{ textAlign: 'center', width: '100%' }} elevation={0} >
        <Link to={`/products/${product.category.toLowerCase()}/${product.id}`} style={linkStyle}>
        <CardActionArea>
            { productImage ?
                <CardMedia
                    component="img"
                    height="264"
                    image={productImage.url}
                    alt={productImage.alt}
                >
                </CardMedia>
                :
                <CardMedia
                    component="img"
                    height="264"
                    image={DefaultProductImage}
                    alt={'no image'}
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
        </CardActionArea>
        </Link>

        <CardActions>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            >
            <IconButton color="inherit">
                <CartIcon sx={{display: {xs: 'flex'}, mr: 1}}/>
                <Typography variant="body1">
                    {"Add to bag"}
                </Typography>
            </IconButton>
        </Grid>
        </CardActions>
        </Card>
    );
}

export default ProductCard;