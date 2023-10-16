import { Box, Container } from '@mui/material';
import Head from 'next/head'
import Breadcrumb from '../navigation/Breadcrumb';
import Topbar from './topbar'
import Footer from './footer'

const Layout: React.FC<{children?: React.ReactNode, className?: string}> = ({ children, className }) => {
    return (
        <>
            <Head>
                <title>KoruKahvila</title>
                <meta property="og:description" content="Handmade ihania koruja" key="description" />
                <meta property="og:image" content="../../og_image.jpg" key="image" />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta charSet='utf-8' />
                <meta name='theme-color' content='##EDBBBA' />
                <link rel='manifest' href='../../manifest.json' />
                <link rel='icon' href='../../favicon.ico'></link>
                <noscript>You need to enable JavaScript to run this app.</noscript>
            </Head>
            <Box className={className} display='flex' flexDirection='column' minHeight='100vh' justifyContent='space-between'>
                <Box className='fontBody'>
                    <Topbar />
                </Box>
                <Container maxWidth='lg' sx={{ paddingBottom: '30px', paddingTop: '60px', height: '100%' }} className='fontBody'>
                    <Breadcrumb />
                    <main>{children}</main>
                </Container>
                <Box className='fontBody' sx={{backgroundColor: 'secondary.light', marginTop: 'auto'}}>
                    <Footer />
                </Box>
            </Box>
        </>
    )
}

export default Layout;