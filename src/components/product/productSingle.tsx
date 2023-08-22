// Full product page render of the Product

import React, { useContext, useEffect, useState } from 'react';
import { CartItem, Product, ProductImage } from '../../types';
import ButtonMain from '../buttons/ButtonMain';
import ProductNote from '../box/ProductNote';
import Counter from '../buttons/Counter';
import ProductImages from './ProductImages';
import { Box, Grid, Typography, Stack } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';
import CartContext from  '../../context/CartContext';
import CounterContext from  '../../context/CounterContext';
import i18n from '../../i18n';

const ProductSingle: React.FC<{ product: Product, productImages?: ProductImage[]}> = ( {product, productImages} ) => {
    const { cart, addToCart } = useContext(CartContext);
    const { value, setValue } = useContext(CounterContext);
    const [ inCart, setInCart ] = useState<number>(0);

    useEffect(() => {
        setValue(1);
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
            quantity: value,
        };
        addToCart(newItem);
        // how many added to cart
        setInCart((prevValue) => prevValue + value);
        setValue(1);
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
                        <Counter max={product.quantity} disabled={inCart === product.quantity} />
                        <ButtonMain text={i18n.t('product.add_to_bag')} disabled={inCart === product.quantity} onClick={() => handleAddToCart()}>
                            <CartIcon sx={{height: '1rem', mr: 1}}/>
                        </ButtonMain>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ProductSingle;
