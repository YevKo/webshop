import React, { useContext } from 'react';
import { AppBar, Container, Box, Grid, Toolbar, Drawer, Tooltip, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CartIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import MainMenu from '../navigation/MainMenu'
import CartContent from '../cart/CartContent';
import CartContext from '../../context/CartContext';
import LanguageSwitcher from '../navigation/LanguageSwitcher';
import { ProductImage } from '../../types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

const Topbar: React.FC<{ images: ProductImage[]}> = ({ images }) => {
    const { t } = useTranslation();

    const pages = [
        { name: t('nav.home'), ref: '/' },
        { name: t('nav.products'), ref: '/products' },
        { name: t('nav.about'), ref: '/about' }
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
        <AppBar position='fixed' color='inherit' sx={{backgroundColor: 'primary.dark'}} suppressHydrationWarning={true}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{ width: '100%', justifyContent: 'space-between' }}>
                    {/* logo */}
                    <Link href='/' style={{ display: 'inline-flex'}}><Image src={'/images/logo-color.png'} alt='Webshop logo' width='250' height='89'/></Link>

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
                                <CartContent images={images}/>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Topbar;