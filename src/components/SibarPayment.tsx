import React, { useEffect, useState } from "react";
import { DollarOutlined } from "@ant-design/icons";
import { Radio, type RadioChangeEvent } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { activePaymentStatus, inActivePaymentStatus } from "../stores/payMentStatus";
export default function SibarPayment() {
  const [value3, setValue3] = useState("");
  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.itemOnCart);
  const paymentStatus = useSelector((state: RootState) => state.paymentStatus.value);


  useEffect(() => {

    if(cartItems.length > 0)  {
      dispatch(activePaymentStatus())
    } else { 
      dispatch(inActivePaymentStatus())
    }


   }, [cartItems]);

  return (
     paymentStatus && (<div className="text-white">
    <h4>
      {" "}
      <DollarOutlined /> Select Payment
    </h4>

    <div className="w-100 text-center">
      <Radio.Group
        // defaultValue={value3}
        options={[
          { label: "Qr Code", value: "qrCode" },
          { label: "Beer Payment", value: "beerPayment" },
        ]}
        onChange={onChange3}
        value={value3}
        optionType="button"
        size={"large"}
      />
    </div>
  </div>) 
     
  );
}
