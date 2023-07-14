import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import ProductContext from  '../../context/ProductContext';
import ButtonMain from "../buttons/ButtonMain";
import ProductCardCart from "../product/ProductCardCart";

const Cart = () => {
    const { cart, images } = useContext(ProductContext);

    let totalSum = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0)

    function handlePurchase(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '25px', maxWidth: '400px', minHeight: '500px' }}>
            <Typography id="cart-title" variant="h6" component="h2" marginBottom="40px" textTransform="capitalize">My Bag</Typography>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
            <>
                <Grid container rowSpacing={4} sx={{ marginBottom: 'auto'}}>
                    {cart.map((cartItem) => (
                        <Grid item xs={12} key={cartItem.id}>
                            <ProductCardCart cartItem={cartItem} productImage={images.find((image) => (image?.productId === cartItem.id) || null )}/>
                        </Grid>
                    ))}
                </Grid>
                <div className="divider"></div>
                <Box className="cart_total" sx={{ display: 'flex', 'justifyContent': 'space-between', margin: '20px 0'}}>
                    <Typography variant="titleSmall">{ "Total" }</Typography>
                    <Typography variant="titleMedium">€{ totalSum }</Typography>
                </Box>
                <Box className="cart_actions" sx={{display: 'flex'}}>
                    <ButtonMain text="Purchase" sx={{ width: '100%' }} onClick={() => handlePurchase()}></ButtonMain>
                </Box>
            </>
            )}
        </Box>
    );
}

export default Cart;