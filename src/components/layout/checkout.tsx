import { Box } from '@mui/material';
import React from 'react';
import Layout from './layout';
import CartStepper from '../cart/CartStepper';

const CheckoutLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <CartStepper />
        {children}
      </Box>
    </Layout>
  )
}

export default CheckoutLayout;