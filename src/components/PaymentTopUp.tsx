import React, { useEffect, useState } from "react";
import { Button, GetProp, Input, InputNumber,    Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addSmtp, addPhoneNumber, addTopUp, addTotal } from "../stores/paymentTopup";
import { RootState } from "../store";
import type { OTPProps } from "antd/es/input/OTP";
import NumberInputPhone from "./NumberInput";
import { QrCodeCard } from "./SibarPayment";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { inActivePaymentStatus } from "../stores/payMentStatus";
import { endProcessPayment } from "../stores/endProcessPayment";
import { removeAllItem } from "../stores/itemOnCart";
import { TotalPrice } from "../sibar";
export default function PaymentTopUp() {
  const phone = useSelector((state: RootState) => state.paymentTopUp.phone);

  const smtp = useSelector((state: RootState) => state.paymentTopUp.smtp);

  const isHasPhone = phone.length > 0;
  const isHasSmtp = smtp.length > 0;

  return (
    <div className="text-white">
      {!isHasPhone && <NumberInputPhone />}

      {!isHasSmtp && isHasPhone ? <SmtpInput /> : null}

      {isHasPhone && isHasSmtp && <Profile />}
    </div>
  );
}

//  phone

// smtp

export const SmtpInput: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {

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
          disabled={value.length !== 6}
          className="bg-warning text-white  w-100  fw-bolder"
          onClick={() => {
            dispatch(addSmtp(value));
          }}
        >
          Send Confirm OTP
        </Button>
      </div>
    </div>
  );
};

export const Profile = () => {
  const profile = useSelector((state: RootState) => state.paymentTopUp);
  const cartItems = useSelector((state: RootState) => state.itemOnCart);
  const totalPriceOnCart = TotalPrice(cartItems);
 
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [turnOnQr, setTurnOnQr] = useState(false);

  useEffect(() => {
    const total = profile.topUp + profile.total;
    dispatch(addTotal(total));
  }, [profile?.topUp]);

  return (
    <>
      <div className="border-1 border p-2 rounded-2">
        <h4 className="d-flex justify-content-bettween"> Profile   </h4>
        <p className="mb-1">Name : {"K.Json"}</p>
        <p className="mb-1">Phone : {profile.phone}</p>

        <p className="mb-1">
          Total :{" "}
          <strong className="fs-5 text-warning">
            {" "}
            $ {profile.total.toFixed(2)}
          </strong>
        </p>

        <p>
          <button className="  text-danger btn btn-sm   border-1 border border-danger"
            onClick={() => {
              dispatch(addSmtp(""));
              dispatch(addTopUp(0));
              dispatch(addPhoneNumber(""));
              dispatch(addTotal(0));
            }}
          >Change Account</button>
        </p>

        <div className="py-3">
          <div className="me-2 mb-1">Top Up($)</div>
          <Space.Compact style={{ width: "100%" }}>
            <InputNumber
              min={0}
              disabled={turnOnQr ? true : false}
              defaultValue={0}
              value={value}
              onChange={(e) => {
                setValue(e as number);
              }}
            />

            <Button
              className="bg-warning"
              disabled={turnOnQr || value === 0 ? true : false}
              onClick={async () => {
                setTurnOnQr(true);
              }}
            >
              Add
            </Button>
          </Space.Compact>
        </div>


        {turnOnQr && <div id="topUpQr">
          <h6> Top Up Amount :  $ {value.toFixed(2)}</h6>
          <QrCodeCard />
          <div className="py-3">
            <Button
              className="bg-success text-white  w-100  fw-bolder"
              onClick={() => {
                dispatch(addTopUp(value));
                setValue(0);
                setTurnOnQr(false)
              }}
            >
              Confirm Payment
            </Button>
            <Button className="bg-danger text-white  w-100  fw-bolder mt-2"
              onClick={() => {
                setValue(0);
                setTurnOnQr(false)
              }} > Cancel </Button>
          </div>
        </div>}



      </div>   <div>
        <button
          className="btn btn-warning w-100 mt-2 fw-bolder"
          disabled={profile.total === 0}
          onClick={() => {

            if (profile.total <  Number(totalPriceOnCart)) {

              alert("Your balance is not enough to pay for this item. Please top up more money.")

            } else {
              dispatch(inActivePaymentStatus());
              dispatch(endProcessPayment(true));
              dispatch(removeAllItem());
            }


             
          }}
        >
          <ShoppingCartOutlined /> Buy Now !
        </button>
      </div>
    </>
  );
};
