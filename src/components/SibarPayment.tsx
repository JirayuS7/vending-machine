import React, { useEffect, useState } from "react";
import { DollarOutlined } from "@ant-design/icons";
import { Button, Modal  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { CheckOutlined } from "@ant-design/icons";
import {
  activePaymentStatus,
  inActivePaymentStatus,
} from "../stores/payMentStatus";
import { endProcessPayment } from "../stores/endProcessPayment";
import { removeAllItem } from "../stores/itemOnCart";
import PaymentTopUp from "./PaymentTopUp";
export const QrCodeCard = () => {
  return (
    <div>
      <div className="  ">
        <p className="mb-1">
          Account Name : <strong> CCBBA DDF</strong>{" "}
        </p>
        <p className="mb-1">
          Account Number : <strong> 09283874388383</strong>{" "}
        </p>
      </div>
      <div>
        <img src="githubQr.png" alt="qr code" className="w-100" />
      </div>
    </div>
  );
};

export default function SibarPayment() {
  const [payMentMode, setPayMentMode] = useState<string>("  ");

  const dispatch = useDispatch();
 
  const cartItems = useSelector((state: RootState) => state.itemOnCart);
  const paymentStatus = useSelector(
    (state: RootState) => state.paymentStatus.value
  );

  useEffect(() => {
    if (cartItems.length > 0) {
      dispatch(activePaymentStatus());
    } else {
      dispatch(inActivePaymentStatus());
    }
  }, [cartItems]);

  //   modal

  const [open, setOpen] = useState(false);

 
  const ConfirmButton = () => {
    return (
      <>
        <div className="mt-3">
          <Button
            key="back"
            className="bg-success text-white   fw-bolder"
            onClick={() => {
              setOpen(false);
              dispatch(inActivePaymentStatus());
              dispatch(endProcessPayment(true));
              dispatch(removeAllItem());
            }}
          >
            Confirm Payment
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        open={open}
        title="QR Code Payment"
        onCancel={() => setOpen(false)}
        footer={[
          <ConfirmButton />,
          <Button key="link" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <QrCodeCard />
      </Modal>
      {paymentStatus && (
        <div>
          <div className="text-white">
            <h4>
              {" "}
              <DollarOutlined /> Select Payment
            </h4>

            <div className="w-100 text-center">
              <Button
                color="warning"
                className={
                  payMentMode === "beerPayment"
                    ? "text-success w-100 fw-bolder mb-2"
                    : "opacity-100 w-100 mb-2"
                }
                onClick={() => {
                  // CountDown()
                  setPayMentMode("beerPayment");
                }}
              >
                {payMentMode === "beerPayment" && (
                  <CheckOutlined className="text-success" />
                )}
                Beer Payment
              </Button>

              <Button
                color="warning"
                className={
                  payMentMode === "qrCode"
                    ? "text-success w-100 fw-bolder mb-2"
                    : "opacity-100  w-100 mb-2"
                }
                onClick={() => {
                  setOpen(true);
                  setPayMentMode("qrCode");

                  // CountDown()
                }}
              >
                {" "}
                {payMentMode === "qrCode" && (
                  <CheckOutlined className="text-success" />
                )}
                QR Code
              </Button>

              {payMentMode === "qrCode" && (
                <div>
                  <QrCodeCard />
                </div>
              )}
            </div>
          </div>

          {payMentMode === "qrCode" && (
            <div className="text-center">
              <ConfirmButton />
            </div>
          )}
        </div>
      )}
      ,{paymentStatus && payMentMode === "beerPayment" ? <PaymentTopUp /> : ""}
    </>
  );
}
