// Teaser render of the Product

import { Product } from '../../types';
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

const productCard: React.FC<{ product: Product }> = ( {product} ) => {
    return (
        <Card sx={{ textAlign: 'center', width: '100%' }} elevation={0} >
        <Link to={`/products/${product.id}`} style={linkStyle}>
        <CardActionArea>
            { product.images ?
                <CardMedia
                    component="img"
                    height="264"
                    image={product.images[0].url}
                    alt={product.images[0].alt}
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

export default productCard;