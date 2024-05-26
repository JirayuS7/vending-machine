import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Empty, Layout, Skeleton, theme } from "antd";
import { Card } from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutShop from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { incrementTotal } from "./stores/totalItem";
import ConvertItemToCart from "./components/convertItemTocart";
import { addItemToCart, itemOncCartState } from "./stores/itemOnCart";
import { endProcessPayment } from "./stores/endProcessPayment";
import { MaxLengthText } from "./components/MaxLengthText";
import ConfirmPayment from "./pages/ConfirmPayment";
import { random } from "lodash";

interface BeerProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  stock: number;
  price: number;
}

function App() {
  const [BeerList, setBeerList] = useState<BeerProps[]>([]);
  const [loading, setLoading] = useState(false);
  // redux

  const dispatch = useDispatch();


  const endProcess = useSelector((state: RootState) => state.endProcessPayment.value);
  const CartItem = useSelector((state: RootState) => state.itemOnCart);
  console.log("🚀 ~ App ~ CartItem:", CartItem)

  async function getData() {
    setLoading(true);
    axios
      .get("https://api.sampleapis.com/beers/ale")
      .then((response) => {
        const newData = [] as BeerProps[];

        const convertPrice = (price: string) => {
          const remove = price.replace("$", "");

          return Number(remove);
        };

        for (let i = 0; i < response.data.length; i++) {
          newData.push({
            id: response.data[i].id,
            name: response.data[i].name,
            image: response.data[i].image,
            rating: response.data[i].rating,
            stock: random(1, 15),
            price: convertPrice(response.data[i].price),
          });
        }

        setBeerList(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loading && setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);





  return (
    <>
      <LayoutShop>
        {endProcess ? <ConfirmPayment /> : <div className="row g-2">
          {BeerList &&
            BeerList.map((beer) => {
              const CovertItemToCart = ConvertItemToCart(
                beer as unknown as itemOncCartState
              );

              return (
                <div className="mb-2 col-md-3 col-lg-3 col-xl-2 h-100  " key={beer.id}>
                  <div
                    className="card w-100  h-100 hover-shadow-lg beer-card "
                    style={{ width: 240 }}
                  >
                    <div className="card-body p-0">
                      <div className="text-center py-3">
                        <img
                          alt="example"
                          src={beer.image}
                          className="img-fluid"
                          style={{ width: 200 }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/200x280/png";
                          }}
                        />
                      </div>

                      <div className="py-3">
                        <h5 className="card-title text-center fs-6  "
                          style={{ height: 40 }}
                        >
                          {MaxLengthText(beer.name, 28)}
                        </h5>
                        <p className="card-text text-center text-success fs-3">
                          {" "}
                          ${beer.price}
                        </p>
                        <p
                          className={`card-text text-center
                        ${beer.stock === 0 ? "text-danger" : "text-black"}
                        `}
                        >
                          Stock: {beer.stock}
                        </p>
                      </div>

                      <div className="card-footer text-center ">
                        <Button
                          disabled={beer.stock === 0}
                          type="primary"
                          className="w-100 bg-warning border-0 fw-bold "
                          icon={<ShoppingCartOutlined />}
                          onClick={() => {


                            const isExist = CartItem.find((item) => item.id === beer.id) as itemOncCartState | undefined;

                            const stockAmount = isExist?.amount || 0;
                            if (stockAmount >= beer.stock) {
                              alert("Stock is not enough");

                            } else {
                              dispatch(addItemToCart(CovertItemToCart));

                            }


                          }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {loading ? (
            <div className="text-center">
              <Skeleton active />
            </div>
          ) : null}
        </div>}

      </LayoutShop>
    </>
  );
}

export default App;
