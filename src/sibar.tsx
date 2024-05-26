import SibarPayment from "./components/SibarPayment";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { Alert, InputNumber, NotificationArgsProps, notification    } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { MaxLengthText } from "./components/MaxLengthText";
import {
  changeAmount,
  itemOncCartState,
  removeItemOncart,
} from "./stores/itemOnCart";
 
import React from "react";
type NotificationPlacement = NotificationArgsProps['placement'];
export function TotalPrice(items: itemOncCartState[]) {
  const total = items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  return total.toFixed(2);
}

export function TotalAmount(items: itemOncCartState[]) {
  const total = items.reduce((total, item) => total + item.amount, 0);
  return total;
}

 

export default function SibarCart() {
  const cartItems = useSelector((state: RootState) => state.itemOnCart);
  const count = cartItems && cartItems.length;
  const dispatch = useDispatch();

  const total = TotalPrice(cartItems);
  const amount = TotalAmount(cartItems);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Out of stock`, 
      placement,
    });
  };
  
  return (
    <> {contextHolder}
      {/*  check out page  */}
      <div className="p-2">
        <div>
          <h2 className="text-white">
            Check Out
            <span className="ms-2 fs-6 text-warning"> ( {count} ) </span>
          </h2>
        </div>
        <div
          className="  overflow-auto"
          style={{
            maxHeight: "280px",
          }}
        >
          <ul className="list-group  ">
            {cartItems &&
              cartItems.map((item: itemOncCartState, index) => {
                // const total = item.price * item.amount;

                return (
                  <li
                    className="list-group-item  align-items-start"
                    key={index}
                  >
                    <div>
                      <div className="py-2  me-auto">
                        <div className="d-flex justify-content-between ">
                          <div className="fw-medium w-60  ">
                            {index + 1}. {MaxLengthText(item?.name, 15)}{" "}
                          </div>

                          <div className="text-warning fs-6">
                            <small> {item.price.toFixed(2)}</small>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <img
                            src={item?.image}
                            alt="beer"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/100x100/png";
                            }}
                            style={{ width: "30px" }}
                          />
                        </div>

                        <div>
                          <span className="text-gary-100">x</span>{" "}
                      
                          <InputNumber
                            min={1}
                            max={15}
                            value={item.amount}
                            defaultValue={item.amount}
                            onChange={(e) => {

                              const value = e as number;

                              if (item.stock < value) {
                                openNotification("bottomRight");
                                //  alert("Stock is not enough");

                              } else {

                                dispatch(
                                  changeAmount({ ...item, amount: e as number })
                                );
                              }




                            }}
                            size={"small"}
                            style={{ width: "50px" }}
                          />
                        </div>
                        <div>
                          <button
                            className="btn btn-danger ms-2 fs-6 btn-sm p-1 py-0"
                            onClick={() => {
                              dispatch(
                                removeItemOncart({
                                  id: item.id,
                                })
                              );
                            }}
                          >
                            <DeleteOutlined />{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="d-flex px-2  justify-content-between py-2">
          <div className="text-white fs-5">
            Total
            <span className="fs-6 ms-1  opacity-50 ">x {amount}</span>
          </div>
          <div className="text-warning fs-4"> $ {total || 0}</div>
        </div>
        {/* 
        {!payMentStatus && (
          <div>
            <button
              className="btn btn-warning w-100 mt-2 fw-bolder"
              disabled={cartItems.length === 0}
            >
              <ShoppingCartOutlined /> Check Out
            </button>
          </div>
        )} */}
      </div>

      {/*   Payment  */}
      <div className="p-2 border-top">
        <SibarPayment />
      </div>
    </>
  );
}
