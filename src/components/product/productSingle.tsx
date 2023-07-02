// Full product page render of the Product

import React from 'react';
import { Product, ProductImage } from '../../types';
import ButtonMain from '../buttons/ButtonMain';
import ProductNote from '../box/ProductNote';
import Counter from '../buttons/Counter';
import ProductImages from './ProductImages';
import { Box, Grid, Typography, Stack, ImageList, useMediaQuery, ImageListItem } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';

const ProductSingle: React.FC<{ product: Product, productImages?: ProductImage[]}> = ( {product, productImages} ) => {

    return (
        <Grid container rowSpacing={0} columnSpacing={5} marginLeft={'-40px'} marginRight={'-40px'}>
            { productImages ?
            <Grid item sm={5}>
                {/* Images grid */}
                <ProductImages productImages={productImages}/>
            </Grid>
            : ''}
            <Grid item sm={7}>
                <Stack spacing={2}>
                    <Typography component="h1" variant="h1">{product.name}</Typography>
                    <Typography component="div" marginBottom="1rem">{product.category}</Typography>
                    <Typography component="div" marginBottom="2rem" dangerouslySetInnerHTML={{ __html: product.description }}></Typography>
                    <Typography variant="h2" component="div">€{product.price}</Typography>
                    <ProductNote/>
                    <Box sx={{'display': 'flex'}}>
                        <Counter max={product.quantity}/>
                        <ButtonMain text={"Add to bag"}>
                            <CartIcon sx={{height: '1rem', mr: 1}}/>
                        </ButtonMain>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ProductSingle;