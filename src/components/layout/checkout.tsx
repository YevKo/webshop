import { Box } from '@mui/material';
import React from 'react';
import Layout from './layout';
import CartStepper from '../cart/CartStepper';
import { ProductImage } from '../../types';

const CheckoutLayout:  React.FC<{children: React.ReactNode, images: ProductImage[]}> = ({ children, images }) => (
  <Layout images={images}>
    <Box sx={{ width: '100%' }}>
      <CartStepper />
      {children}
    </Box>
  </Layout>
)

export default CheckoutLayout;