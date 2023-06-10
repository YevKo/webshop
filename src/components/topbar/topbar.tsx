import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import CartIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import MainMenu from '../../components/menus/mainmenu'
import SearchInput from '../../components/search/searchInput'
import Logo from '../../assets/images/logo.svg';

import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';


import Tooltip from '@mui/material/Tooltip';


const pages = [
    { name: 'Home', ref: '/' },
    { name: 'Products', ref: '/products' },
    { name: 'About', ref: '/about' }
];
const settings = ['Log In', 'Account', 'Logout'];


function Topbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(null);

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


    return (
        <AppBar position={'sticky'}>
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
                                    <Typography component='a' textAlign="center" href={page.ref}>{page.name}</Typography>
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
                    <Box sx={{display: {xs: 'flex'}, 'align-items': 'center' }}>
                        <Box sx={{ 'min-width': '10rem', 'margin-top': '-16px', 'margin-right': '10px' }}>
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
                                    <CartIcon sx={{display: {xs: 'flex'}, mr: 1}}/>
                                </IconButton>
                            </Tooltip>
                            <Drawer
                                anchor="right"
                                open={Boolean(anchorElCart)}
                                onClose={handleCloseCartPopup}
                                aria-labelledby="cart-title"
                                >
                                <Box sx={{'padding': '30px', 'width': '30%', 'min-width': '300px', 'height': 'auto' }}>
                                    <Typography id="cart-title" variant="h6" component="h2">
                                        <h2>My Bag</h2>
                                    </Typography>
                                    { ' Cart content' }
                                    <IconButton
                                        size="medium"
                                        aria-label="Close cart"
                                        color="inherit"
                                        onClick={handleCloseCartPopup}
                                        sx={{ position: 'absolute', right: '10px', top: '10px' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
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