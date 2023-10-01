import { Step, StepLabel, Stepper } from '@mui/material';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';

const CartStepper = ()  => {
    const { steps, activeStep, isStepSkipped } = useContext(CartContext);

    return (
        <>
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
                    <Step key={label} {...stepProps} sx={{ pl: {xs:0}}}>
                    <StepLabel sx={{ textTransform: 'uppercase' }} {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
        }
        </>
    );
}

export default CartStepper;
