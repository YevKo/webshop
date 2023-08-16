import { Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ChangeEvent, useContext } from "react";
import CounterContext from '../../context/CounterContext';

interface CounterProps {
    max: number,
    disabled: boolean
}

const Counter: React.FC<CounterProps> = ({ max, disabled }) => {
    const { value, setValue, handleIncrement, handleDecrement } = useContext(CounterContext);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value) || 1);
    };

    return (
        <ButtonGroup>
            <Button variant="text" sx={{fontSize: '2rem'}} onClick={handleDecrement} disabled={value <= 1}><RemoveIcon/></Button>
            <TextField
                value={value}
                onChange={handleInputChange}
                inputProps={{ min: 1, max: max}}
                sx={{width: '50px', textAling: 'center', "& fieldset": { border: 'none' }}}
                margin={'dense'}
                disabled={disabled}
                size="small"
            />
            <Button variant="text" onClick={() => handleIncrement(max)} disabled={value === max || value < 1 || disabled}><AddIcon/></Button>
        </ButtonGroup>
    );
}

export default Counter;