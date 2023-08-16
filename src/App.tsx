import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topbar from './components/topbar/topbar';
import ProductPage from "./components/pages/productPage";
import ProductListingPage from "./components/pages/productListingPage";
import HomePage from "./components/pages/homePage";
import AboutPage from "./components/pages/aboutPage";
import CategoryPage from './components/pages/categoryPage';
import CheckoutPage from "./components/pages/checkoutPage";
import Breadcrumb from './components/navigation/Breadcrumb';
import { ThemeProvider, Box, Container } from '@mui/material';
import theme from './theme';
import Footer from "./components/topbar/footer";

const App = () => {

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Category', path: '/products/category' },
    { label: 'Product', path: '/products/category/product' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box display="flex" flexDirection="column" height="100vh">
          <Box className='fontBody' sx={{bg: 'primary'}}>
              <Topbar />
          </Box>
          <Container maxWidth="lg" sx={{ paddingBottom: "30px" }} className="fontBody">
            <Breadcrumb items={breadcrumbItems}/>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/products' element={<ProductListingPage />}/>
              <Route path='/products/:category' element={<CategoryPage />}/>
              <Route path='/products/:category/:productId' element={<ProductPage />}/>
              <Route path='/about' element={<AboutPage/>}/>
              <Route path='/checkout' element={<CheckoutPage/>}/>
            </Routes>
          </Container>
          <Box className='fontBody' sx={{backgroundColor: 'secondary.main'}}>
              <Footer />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
