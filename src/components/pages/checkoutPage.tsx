import { useContext } from "react";
import { Box, Step, StepLabel, Typography } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import CartPage from "./cartPage";
import DeliveryPage from "./deliveryPage";
import OrderPage from "./orderPage";
import CartContext from  '../../context/CartContext';

function CheckoutPage() {
    const steps = ['My Bag', 'Delivery', 'Review & Order'];
    const { activeStep, handleNext, handleBack, handleSkip, isStepOptional, isStepSkipped } = useContext(CartContext);

    let componentToRender;

    switch (activeStep) {
      case 0:
        componentToRender = <CartPage />;
        break;
      case 1:
        componentToRender = <DeliveryPage />;
        break;
      case 2:
        componentToRender = <OrderPage />;
        break;
      default:
        componentToRender = <CartPage />;
    }

    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ marginBottom: '40px'}}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel sx={{ textTransform: 'uppercase' }} {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished. We will contact you soon!
            </Typography>
          </>
        ) : (
          <>
            {/* here content changes */}
            { componentToRender }
          </>
        )}
    </Box>
    );
}

export default CheckoutPage;