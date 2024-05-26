import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Layout,
  Skeleton,
  theme,
  NotificationArgsProps,
  notification,
  Select,
  Input,
} from "antd";
import { Card } from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutShop from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { incrementTotal } from "./stores/totalItem";
import ConvertItemToCart from "./components/convertItemTocart";
import { addItemToCart, itemOncCartState } from "./stores/itemOnCart";
import { MaxLengthText } from "./components/MaxLengthText";
import ConfirmPayment from "./pages/ConfirmPayment";
import { random } from "lodash";
import { StarOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import type { SearchProps } from "antd/es/input/Search";

interface BeerProps {
  id: number;
  name: string;
  image: string;
  rating: {
    average: number;
    reviews: number;
  };
  stock: number;
  price: number;
}
type NotificationPlacement = NotificationArgsProps["placement"];

function FilterBar({
  SortHandle,
  setFilter,
}: {
  SortHandle: (type: string) => void;
  setFilter: (value: string) => void;
}) {
  const onChange = (value: string) => {
    SortHandle(value);

    setFilter(value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <div className="mb-2">
        <div className="d-flex align-items-center">
          <span className="me-3">Filter :</span>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={[
              {
                value: "nameA-Z",
                label: "Name A-Z",
              },
              {
                value: "nameZ-A",
                label: "Name Z-A",
              },
              {
                value: "priceLow-High",
                label: " Price Low-High",
              },
              {
                value: "priceHigh-Low",
                label: " Price High-Low",
              },
              {
                value: "ratingLow-High",
                label: "Rating Low-High",
              },
              {
                value: "ratingHigh-Low",
                label: "Rating High-Low",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

function App() {
  const [BeerList, setBeerList] = useState<BeerProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [keyWord, setKeyWord] = useState("");

  // redux

  const dispatch = useDispatch();

  const endProcess = useSelector(
    (state: RootState) => state.endProcessPayment.value
  );
  const CartItem = useSelector((state: RootState) => state.itemOnCart);

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
            stock: 5,
            price: convertPrice(response.data[i].price),
          });
        }

        const FilterSearch = newData.filter((f) =>
          f.name.toLowerCase().includes(keyWord.toLowerCase())
        );

        if (keyWord === "") {
          setBeerList(newData);
        } else {
          setTimeout(() => {    setBeerList(FilterSearch);}, 500);
       
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loading && setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [keyWord]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Out of stock`,
      placement,
    });
  };

  function SortHandle(type: string) {
    const sort =
      BeerList &&
      BeerList.sort((a, b) => {
        if (type === "nameA-Z") {
          return a.name.localeCompare(b.name);
        } else if (type === "nameZ-A") {
          return b.name.localeCompare(a.name);
        } else if (type === "priceLow-High") {
          return a.price - b.price;
        } else if (type === "priceHigh-Low") {
          return b.price - a.price;
        } else if (type === "ratingLow-High") {
          return a.rating.average - b.rating.average;
        } else if (type === "ratingHigh-Low") {
          return b.rating.average - a.rating.average;
        }
        return 0;
      });

    try {
      setBeerList(sort);
    } catch {
      console.log("11");
    }
  }

 

  return (
    <>
      <LayoutShop>
        {contextHolder}

        <div className="row justify-content-between">
          <div className="col-md-6">
            <FilterBar SortHandle={SortHandle} setFilter={setFilter} />
          </div>

          <div className="col-md-3 text-end">
            <Input
              placeholder="  Search Beer"
              allowClear
             
              onChange={ (e) => setKeyWord(e.target.value)}
            />
          </div>
        </div>

        {endProcess ? (
          <ConfirmPayment />
        ) : (
          <div className="row g-2">
            {BeerList &&
              BeerList.filter((f) => f.name !== "{{&random}}").map((beer) => {
                const CovertItemToCart = ConvertItemToCart(
                  beer as unknown as itemOncCartState
                );

                return (
                  <div
                    className="mb-2 col-md-3 col-lg-3 col-xl-2 h-100  "
                    key={beer.id}
                  >
                    <div
                      className="card w-100  h-100 hover-shadow-lg beer-card "
                      style={{ width: 240 }}
                    >
                      <div className="card-body p-0">
                        <div className="text-center py-3">
                          <img
                            alt={beer.name}
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
                          <h5
                            className="card-title text-center fs-6  "
                            style={{ height: 40 }}
                          >
                            {MaxLengthText(beer.name, 28)}
                          </h5>

                          <p className="card-text text-center text-success fs-3">
                            {" "}
                            ${beer.price}
                          </p>

                          <div
                            style={{
                              justifyContent: `space-between`,
                            }}
                            className={`card-text text-center   d-flex px-2
                        ${beer.stock === 0 ? "text-danger" : "text-black"}
                        `}
                          >
                            <span>Stock: {beer.stock}</span>

                            <div className="text-warning">
                              <span className="ms-auto">
                                <StarOutlined />
                                {beer.rating?.average?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="card-footer text-center ">
                          <Button
                            disabled={beer.stock === 0}
                            type="primary"
                            className="w-100 bg-warning border-0 fw-bold "
                            icon={<ShoppingCartOutlined />}
                            onClick={() => {
                              const isExist = CartItem.find(
                                (item) => item.id === beer.id
                              ) as itemOncCartState | undefined;

                              const stockAmount = isExist?.amount || 0;
                              if (stockAmount >= beer.stock) {
                                openNotification("bottomRight");
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
          </div>
        )}
      </LayoutShop>
    </>
  );
}

export default App;
