import Topbar from './components/topbar/topbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/productPage";
import ProductListingPage from "./components/pages/productListingPage";
import HomePage from "./components/pages/homePage";
import AboutPage from "./components/pages/aboutPage";
import { ThemeProvider, Box, Container } from '@mui/material';
import theme from './theme';
import { Product } from './types';

const App = () => {

  const products:Product[] = [
      {
        "id": 1,
        "name": "Product 1",
        "description": "Description for Product 1",
        "price": 10.99,
        "quantity": 5,
        "images": [
          {
            id: 1,
            url: "http://ddev-test.ddev.site/sites/default/files/2023-05/Screenshot%202023-05-17%20at%2011.16.18.png",
            alt: "image 1",
          }, {
            id: 2,
            url: "http://ddev-test.ddev.site/sites/default/files/2023-05/Screenshot%202023-05-29%20at%2012.12.36.png",
            alt: "image 2",
          }
        ]
      },
      {
        "id": 2,
        "name": "Product 2",
        "description": "Description for Product 2",
        "price": 19.99,
        "quantity": 3
      },
      {
        "id": 3,
        "name": "Product 3",
        "description": "Description for Product 3",
        "price": 14.99,
        "quantity": 8
      },
      {
        "id": 4,
        "name": "Product 4",
        "description": "Description for Product 4",
        "price": 24.99,
        "quantity": 2
      },
      {
        "id": 5,
        "name": "Product 5",
        "description": "Description for Product 5",
        "price": 9.99,
        "quantity": 10
      },
      {
        "id": 6,
        "name": "Product 6",
        "description": "Description for Product 6",
        "price": 12.99,
        "quantity": 6
      }
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
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductListingPage products={products}/>}/>
            <Route path='/products/:productId' element={<ProductPage products={products}/>}/>
            <Route path='/about' element={<AboutPage/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
