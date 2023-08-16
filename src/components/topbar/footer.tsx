import { Container, Box, Grid } from '@mui/material';
import Logo from '../../assets/images/logo.svg';
import FooterMenu from '../navigation/FooterMenu';

const pages = [
    { name: 'Home', ref: '/' },
    { name: 'Products', ref: '/products' },
    { name: 'About', ref: '/about' }
];
function Footer() {

    return (
        <footer>
            <Container maxWidth='md' sx={{ paddingTop: '30px', paddingBottom: '30px'}}>
                <Grid display='flex' justifyContent='space-between' alignItems='center' sx={{ flexWrap: { xs: 'wrap', md: 'nowrap'}}}>
                    {/* logo */}
                    <Grid item lg={3}>
                        <img src={Logo} alt='Webshop logo' />
                    </Grid>
                    <Grid item lg={3}>
                        <FooterMenu pages={pages} heading="Learn"/>
                    </Grid>
                    <Grid item lg={3}>
                        <FooterMenu pages={pages} heading="Learn"/>
                    </Grid>
                    <Grid item lg={3}>
                        <FooterMenu pages={pages} heading="Learn"/>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;