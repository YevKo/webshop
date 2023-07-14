import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topbar from './components/topbar/topbar';
import ProductPage from "./components/pages/productPage";
import ProductListingPage from "./components/pages/productListingPage";
import HomePage from "./components/pages/homePage";
import AboutPage from "./components/pages/aboutPage";
import CategoryPage from './components/pages/categoryPage';
import Breadcrumb from './components/navigation/Breadcrumb';
import { ThemeProvider, Box, Container } from '@mui/material';
import theme from './theme';
import CartPage from "./components/pages/cartPage";

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
        <Box className='fontBody' sx={{bg: 'primary'}}>
          <header>
            <Topbar />
          </header>
        </Box>
        <Container maxWidth="lg" className="fontBody">
          <Breadcrumb items={breadcrumbItems}/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductListingPage />}/>
            <Route path='/products/:category' element={<CategoryPage />}/>
            <Route path='/products/:category/:productId' element={<ProductPage />}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
