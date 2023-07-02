import Topbar from './components/topbar/topbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/productPage";
import ProductListingPage from "./components/pages/productListingPage";
import HomePage from "./components/pages/homePage";
import AboutPage from "./components/pages/aboutPage";
import Breadcrumb from './components/navigation/Breadcrumb';
import { ThemeProvider, Box, Container } from '@mui/material';
import theme from './theme';
import CategoryPage from './components/pages/categoryPage';

const App = () => {

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Category', path: '/products/category' },
    { label: 'Product', path: '/products/category/product' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box className='App' sx={{bg: 'primary'}}>
          <header className='App-header'>
            <Topbar />
          </header>
        </Box>
        <Container maxWidth="lg">
          <Breadcrumb items={breadcrumbItems}/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductListingPage />}/>
            <Route path='/products/:category' element={<CategoryPage />}/>
            <Route path='/products/:category/:productId' element={<ProductPage />}/>
            <Route path='/about' element={<AboutPage/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
