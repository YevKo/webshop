import { Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ChangeEvent, useState } from "react";

interface CounterProps {
    max: number;
}

const Counter: React.FC<CounterProps> = ({ max }) => {
    const [value, setValue] = useState(0);

    const handleIncrement = () => {
        if (value < max) {
            setValue((prevValue) => prevValue + 1);
        }
    };

    const handleDecrement = () => {
        if (value > 0) {
            setValue((prevValue) => prevValue - 1);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const isMinValueReached = value === 0;
    const isMaxValueReached = value === max;

    return (
        <ButtonGroup>
            <Button variant="text" sx={{'font-size': '2rem'}} onClick={handleDecrement} disabled={isMinValueReached}><RemoveIcon/></Button>
            <TextField
                type="number"
                value={value}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: max}}
                sx={{ 'appearance': 'none' }}
                margin={'dense'}
                size="small"
            />
            <Button variant="text" onClick={handleIncrement} disabled={isMaxValueReached}><AddIcon/></Button>
        </ButtonGroup>
    );
}

export default Counter;