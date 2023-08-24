import { Container, Grid } from '@mui/material';
import Logo from '../../assets/images/logo-no-background.svg';
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
                        <img src={Logo} alt='Webshop logo' width='200'/>
                    </Grid>
                    <Grid item lg={3}>
                        <a aria-label="Chat on WhatsApp" href="https://wa.me/0443207677"> <img width="200" alt="Chat on WhatsApp" src="whatsapp.png" /></a>
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