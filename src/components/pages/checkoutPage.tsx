import { useContext } from "react";
import { Box, Step, StepLabel, Typography } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import CartPage from "./cartPage";
import DeliveryPage from "./deliveryPage";
import OrderPage from "./orderPage";
import CartContext from  '../../context/CartContext';
import ConfirmationPage from "./confirmationPage";

function CheckoutPage() {
    const { steps, activeStep, isStepSkipped } = useContext(CartContext);

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
      case 3:
        componentToRender = <ConfirmationPage />;
        break;
      default:
        componentToRender = <CartPage />;
    }

    return (
      <Box sx={{ width: '100%' }}>
        {activeStep}
        { (activeStep < steps.length) &&
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
        }

        { componentToRender }
    </Box>
    );
}

export default CheckoutPage;