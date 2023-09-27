import { Box } from '@mui/material';
import React from 'react';
import Layout from './layout';
import CartStepper from '../cart/CartStepper';

function CheckoutLayout({ children, images }) {

    return (
      <Layout images={images}>
        <Box sx={{ width: '100%' }}>
          <CartStepper />
          {children}
        </Box>
      </Layout>
    );
}

export default CheckoutLayout;