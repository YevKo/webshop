import { Container, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import FooterMenu from '../navigation/FooterMenu';
import Image from 'next/image';


function Footer() {
    const { t } = useTranslation();
    const pages = [
        { name: t('nav.products'), ref: '/products' },
        { name: t('nav.about'), ref: '/about' }
    ];

    return (
        <footer>
            <Container maxWidth='md' sx={{ paddingTop: '30px', paddingBottom: '30px'}}>
                <Grid display='flex' justifyContent='space-between' sx={{ alignItems:{ xs: 'flex-start', md:'center'}, flexWrap: 'nowrap', flexDirection: {xs: 'column', md: 'row'}}}>
                    {/* logo */}
                    <Grid item xs={12} lg={3} sx={{ marginBottom:'3rem' }}>
                        <Image src='../../images/logo-no-background.svg' alt='Webshop logo' width='150' height='150'/>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <a aria-label={t('footer.whatsapp')} href='https://wa.me/3584578739767'> <Image width='200' height='100' alt='Chat on WhatsApp' src='/whatsapp.png' /></a>
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ marginTop: '3rem'}}>
                        <FooterMenu pages={pages} heading={t('footer.menu')}/>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;