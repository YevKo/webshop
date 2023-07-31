import React, { useContext } from 'react';
import { AppBar, Container, Box, Grid, Toolbar, Drawer, Tooltip, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CartIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import MainMenu from '../navigation/MainMenu'
import SearchInput from '../../components/search/searchInput'
import Logo from '../../assets/images/logo.svg';
import Cart from '../cart/Cart';
import CartContext from '../../context/CartContext';
import ProductContext from '../../context/ProductContext';
import { wrap } from 'module';

const pages = [
    { name: 'Home', ref: '/' },
    { name: 'Products', ref: '/products' },
    { name: 'About', ref: '/about' }
];

function Topbar() {
    const { cart, anchorElCart, setAnchorElCart } = useContext(CartContext);
    const { products } = useContext(ProductContext);

    const handleOpenCartPopup = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartPopup = () => {
        setAnchorElCart(null);
    };

    let total = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)

    return (
        <AppBar position='sticky' color='inherit'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                <Grid xs display='flex' justifyContent='space-between' alignItems='center' sx={{ flexWrap: { xs: 'wrap', md: 'nowrap'}}}>
                    {/* mobile menu */}
                    <MainMenu pages={pages} mobile/>

                    {/* logo */}
                    <Box sx={{display: {xs: 'flex'}}}>
                        <img src={Logo} alt='Webshop logo' />
                    </Box>

                    {/* desktop menu */}
                    <MainMenu pages={pages}/>

                    {/* tools */}
                    <Box sx={{display: {xs: 'flex'}, alignItems: 'center', width: {xs: '100%', md: 'auto'}, justifyContent: { xs: 'space-between'} }}>
                        <Box sx={{ 'minWidth': '10rem', 'marginTop': '-16px', 'marginRight': '10px' }}>
                            <SearchInput data={products} />
                        </Box>
                        {/* cart */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open cart'>
                                <IconButton onClick={handleOpenCartPopup} color='inherit'>
                                    <Badge badgeContent={total} color='info' anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                                        <CartIcon sx={{display: {xs: 'flex'}}}/>
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Drawer
                                anchor='right'
                                open={Boolean(anchorElCart)}
                                onClose={handleCloseCartPopup}
                                aria-labelledby='cart-title'
                                sx={{ height: 'auto', bottom: 'auto' }}
                                PaperProps={{
                                    sx: { height: 'auto', bottom: 'auto' }
                                }}
                                >
                                <Cart />
                                <IconButton
                                    size='medium'
                                    aria-label='Close cart'
                                    color='inherit'
                                    onClick={handleCloseCartPopup}
                                    sx={{ position: 'absolute', right: '10px', top: '10px' }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Drawer>
                        </Box>
                    </Box>
                </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Topbar;