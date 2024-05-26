import React, { useState } from 'react';
import { Button, Input,   } from 'antd';
import { useDispatch } from 'react-redux';
import { addPhoneNumber, } from "../stores/paymentTopup";
interface NumericInputProps {
    style: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
    const { value, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

 

    return (
        <Input
            {...props}
            onChange={handleChange}
            onBlur={handleBlur}
            className='w-100'
            placeholder="Input a Phone Number"
            minLength={10}
            maxLength={10}
        />
    );
};

const NumberInputPhone: React.FC = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    return (<> <NumericInput style={{ width: 120 }} value={value} onChange={setValue} />
        <div>
            <Button
                className="mt-1 bg-warning fw-bold"
                  disabled={value.length !== 10}
                block
                onClick={() => {
                    dispatch(addPhoneNumber(value));
                }}
            >
                Send OTP
            </Button></div>
    </>);
};

export default NumberInputPhone;