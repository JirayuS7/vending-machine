import React, { useState } from "react";
import { Button, Flex, GetProp, Input, InputNumber, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPhoneNumber, addSmtp, addTopUp } from "../stores/paymentTopup";
import { RootState } from "../store";

import type { OTPProps } from "antd/es/input/OTP";

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

export default function PaymentTopUp() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const phone = useSelector((state: RootState) => state.paymentTopUp.phone);

  const smtp = useSelector((state: RootState) => state.paymentTopUp.smtp);

  const isHasPhone = phone.length > 0;
  const isHasSmtp = smtp.length > 0;

  const InputPhone = () => {
    return (
      <div>
        <p>Enter Your Phone Number</p>
        <NumericInput
          style={{ width: "100%" }}
          value={value}
          onChange={setValue}

        // ;
        />
        <Button
          className="mt-1 bg-warning fw-bold"
          disabled={value.length !== 10}
          block
          onClick={() => {
            dispatch(addPhoneNumber(value));
          }}
        >
          Send OTP
        </Button>
      </div>
    );
  };

  return (
    <div className="text-white">
      {!isHasPhone && <InputPhone />}

      {!isHasSmtp && isHasPhone ? <SmtpInput /> : null}

      {isHasPhone && isHasSmtp && <Profile />}
    </div>
  );
}

//  phone
const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  const title = value ? null : "Phone Number Example: 061 229 333";

  return (
    <Tooltip
      trigger={["focus"]}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Phone Number"
        maxLength={10}
      />
    </Tooltip>
  );
};

// smtp

export const SmtpInput: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
    console.log("onChange:", text);
    setValue(text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const phone = useSelector((state: RootState) => state.paymentTopUp.phone);

  return (
    <div className="text-white">
      <div>
        <h5> Enter Smtp</h5>
        <p>
          {" "}
          Your Phone : <strong> {phone} </strong>
        </p>
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      </div>

      <div className="py-3">
        <Button
          key="back"
          className="bg-warning text-white  w-100  fw-bolder"
          onClick={() => {
            dispatch(addSmtp(value));
          }}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export const Profile = () => {
  const profile = useSelector((state: RootState) => state.paymentTopUp);
  console.log("🚀 ~ Profile ~ profile:", profile)
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  return (
    <>
      <div className="border-1 border p-2 rounded-2">
        <h4> Profile </h4>
        <p className="mb-1">Name : {"K.Json"}</p>
        <p className="mb-1">Phone : {profile.phone}</p>

        <p className="mb-1">
          Total :{" "}
          <strong className="fs-5 text-warning">
            {" "}
            $ {profile.total.toFixed(2)}
          </strong>
        </p>

        <div className="py-3">
          <Space.Compact style={{ width: "100%" }}>
            <span className="me-2">Top Up($)</span>
            <InputNumber min={0} defaultValue={0}
              value={value}
              onChange={(e) => {
                setValue(e as number);
              } }
            />
            <Button className="bg-warning"
              onClick={() => { dispatch(addTopUp(value)) }}
            
            >Add</Button>
          </Space.Compact>
          {/* <Button
          key="back"
          className="bg-warning text-white  w-100  fw-bolder"

          onClick={() => {
            dispatch(addTopUp(112))
            
          }}
        >
          Confirm Payment
        </Button> */}
        </div>
      </div>
    </>
  );
};
