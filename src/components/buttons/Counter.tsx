import { Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ChangeEvent, useContext, useState } from "react";
import CounterContext from '../../context/CounterContext';

interface CounterProps {
    max: number;
}

const Counter: React.FC<CounterProps> = ({ max }) => {
    const { value, setValue, handleIncrement, handleDecrement } = useContext(CounterContext);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value) || 0);
    };

    return (
        <ButtonGroup>
            <Button variant="text" sx={{fontSize: '2rem'}} onClick={handleDecrement} disabled={value === 0}><RemoveIcon/></Button>
            <TextField
                value={value}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: max}}
                sx={{width: '50px', textAling: 'center', "& fieldset": { border: 'none' }}}
                margin={'dense'}
                size="small"
            />
            <Button variant="text" onClick={() => handleIncrement(max)} disabled={value === max}><AddIcon/></Button>
        </ButtonGroup>
    );
}

export default Counter;