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
import i18n from '../../i18n';
import LanguageSwitcher from '../navigation/LanguageSwitcher';

function Topbar() {

    const pages = [
        { name: i18n.t('nav.home'), ref: '/' },
        { name: i18n.t('nav.products'), ref: '/products' },
        { name: i18n.t('nav.about'), ref: '/about' }
    ];
    const { cart, anchorElCart, setAnchorElCart } = useContext(CartContext);

    const handleOpenCartPopup = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartPopup = () => {
        setAnchorElCart(null);
    };

    let total = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)

    return (
        <AppBar position='fixed' color='inherit'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                <Grid xs display='flex' justifyContent='space-between' alignItems='center' sx={{ flexWrap: { xs: 'wrap', md: 'nowrap'}}}>

                    {/* logo */}
                    <Box sx={{display: {xs: 'flex'}}}>
                        <img src={Logo} alt='Webshop logo' />
                    </Box>

                    {/* desktop menu */}
                    <MainMenu pages={pages}/>

                    {/* tools */}
                    <Box sx={{display: {xs: 'flex'}, alignItems: 'center', justifyContent: { xs: 'space-between'} }}>
                        <LanguageSwitcher />
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
                        {/* mobile menu */}
                        <MainMenu pages={pages} mobile/>
                    </Box>
                </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Topbar;