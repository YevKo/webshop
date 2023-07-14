import React, { createContext, ReactNode, useState } from 'react';

interface CounterContextProps {
    value: number;
    handleIncrement: (max: number) => void;
    handleDecrement: () => void;
    setValue: (value: number) => void;
}

const CounterContext = createContext<CounterContextProps>({
    value: 0,
    handleIncrement: () => {},
    handleDecrement: () => {},
    setValue: () => {},
});

const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [value, setValue] = useState(1);

    const handleIncrement = (max: number) => {
        console.log(value);
        console.log(typeof value);

        if (Number(value) < max) {
            setValue((prevValue) => prevValue + 1);
        }
    };

    const handleDecrement = () => {
        if (value > 0) {
            setValue((prevValue) => prevValue - 1);
        }
    };

    return (
        <CounterContext.Provider value={{ value, setValue, handleIncrement, handleDecrement } as CounterContextProps}>
        {children}
        </CounterContext.Provider>
    );
};


export { CounterProvider };
export default CounterContext;