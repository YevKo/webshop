import { Button, ButtonProps, buttonClasses, Typography } from '@mui/material';
import { styled } from '@mui/system';

type ExtendedButtonProps = ButtonProps & {
    // Add any additional props you need
    text: string;
};

const StyledButton = styled(Button)(({ theme }) => `
  font-size: 0.875rem;
  background-color: ${theme.palette.primary.main};
  border: 0;
  border-radius: 0;
  box-shadow: none;
  min-width: 10rem;
  padding: 16px 16px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: ${theme.palette.primary.light};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,) as typeof Button;

const ButtonMain: React.FC<ExtendedButtonProps> = ({ text, children, ...rest }) => {
    return (
        <StyledButton variant="contained" {...rest}>
            {children}
            <Typography variant="body2">{text}</Typography>
        </StyledButton>
    );
}

export default ButtonMain;