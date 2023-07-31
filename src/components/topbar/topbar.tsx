import React, { useContext, useState } from 'react';
import { AppBar, Container, Box, Grid, Toolbar, Typography, Menu, MenuItem, Drawer, Tooltip, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CartIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MainMenu from '../navigation/MainMenu'
import SearchInput from '../../components/search/searchInput'
import Logo from '../../assets/images/logo.svg';
import Cart from '../cart/Cart';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const pages = [
    { name: 'Home', ref: '/' },
    { name: 'Products', ref: '/products' },
    { name: 'About', ref: '/about' }
];
const settings = ['Log In', 'Account', 'Logout'];

function Topbar() {
    const { cart, anchorElCart, setAnchorElCart } = useContext(CartContext);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenCartPopup = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartPopup = () => {
        setAnchorElCart(null);
    };

    let total = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)

    return (
        <AppBar position="sticky" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Grid xs display="flex" justifyContent='space-between' alignItems="center">
                    {/* mobile menu */}
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link to={page.ref}>{page.name}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* logo */}
                    <Box sx={{display: {xs: 'flex'}}}>
                        <img src={Logo} alt="Webshop logo" />
                    </Box>

                    {/* desktop menu */}
                    <MainMenu pages={pages}/>

                    {/* tools */}
                    <Box sx={{display: {xs: 'flex'}, 'alignItems': 'center' }}>
                        <Box sx={{ 'minWidth': '10rem', 'marginTop': '-16px', 'marginRight': '10px' }}>
                            <SearchInput data={pages} />
                        </Box>
                        {/* user account menu */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} color="inherit">
                                    <PersonIcon sx={{display: {xs: 'flex'}, mr: 1}}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="userMenu"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                        {/* cart */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open cart">
                                <IconButton onClick={handleOpenCartPopup} color="inherit">
                                    <Badge badgeContent={total} color="info" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                                        <CartIcon sx={{display: {xs: 'flex'}}}/>
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Drawer
                                anchor="right"
                                open={Boolean(anchorElCart)}
                                onClose={handleCloseCartPopup}
                                aria-labelledby="cart-title"
                                sx={{ height: 'auto', bottom: 'auto' }}
                                PaperProps={{
                                    sx: { height: 'auto', bottom: 'auto' }
                                }}
                                >
                                <Cart />
                                <IconButton
                                    size="medium"
                                    aria-label="Close cart"
                                    color="inherit"
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