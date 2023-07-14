// Full product page render of the Product

import React, { useContext, useState } from 'react';
import { CartItem, Product, ProductImage } from '../../types';
import ButtonMain from '../buttons/ButtonMain';
import ProductNote from '../box/ProductNote';
import Counter from '../buttons/Counter';
import ProductImages from './ProductImages';
import { Box, Grid, Typography, Stack } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';
import ProductContext from  '../../context/ProductContext';
import CounterContext from  '../../context/CounterContext';

const ProductSingle: React.FC<{ product: Product, productImages?: ProductImage[]}> = ( {product, productImages} ) => {
    const { addToCart } = useContext(ProductContext);
    const { value, setValue } = useContext(CounterContext);
    // const [ inCart, setInCart ] = useState<boolean>(false);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: value,
        };
        addToCart(newItem);
        setValue(1);
            // setInCart(true);
    };

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
                        <Box sx={{display: 'flex', marginTop: '30px !important'}}>
                            <Counter max={product.quantity} />
                            <ButtonMain text={"Add to bag"} disabled={value === 0} onClick={() => handleAddToCart()}>
                                <CartIcon sx={{height: '1rem', mr: 1}}/>
                            </ButtonMain>
                        </Box>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ProductSingle;
