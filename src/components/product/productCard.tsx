// Teaser render of the Product

import { Product } from '../../types';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const linkStyle = {
    textDecoration: "none",
    color: 'inherit'
};

const productCard: React.FC<{ product: Product }> = ( {product} ) => {
    return (
        <Card sx={{ textAlign: 'center', width: '100%' }} elevation={0} >
        <Link to={`/products/${product.id}`} style={linkStyle}>
        <CardActionArea>
            <CardContent>
            <Typography variant="titleLarge" component="h3" gutterBottom>
                {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <Typography variant="body1" component="span" style={{ fontWeight: 'bold' }}>
                    {product.price}
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
            {/* <Button size="small">{  }</Button> */}
            <Button size="small">Add to cart</Button>
        </Grid>
        </CardActions>
        </Card>
    );
}

export default productCard;