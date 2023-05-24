import styles from "./MainProduct.module.css";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState, useContext, Fragment } from "react";
import { Product } from "../store/product-context";
import numberSet from "../utilities/Number";

const init = {
  items: [],
  isRow: false,
  isSort: false,
};

const reducer = function (state, action) {
  if (action.type === "PUSH") {
    return {
      items: (state.items = action.val),
      isRow: false,
      isSort: false,
    };
  }
  if (action.type === "BTN") {
    return {
      items: state.items,
      isRow: true,
      isSort: false,
    };
  }
  if (action.type === "GRID") {
    return {
      items: state.items,
      isRow: false,
      isSort: false,
    };
  }
  if (action.type === "SORT") {
    return {
      ...state,
      isSort: true,
    };
  }
  return init;
};

function MainProduct(props) {
  const [productData, dispatchFn] = useReducer(reducer, init);
  const [error, setError] = useState(null);
  const [sortArr, setSortArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      setIsLoading(true);
      const res = await fetch("https://course-api.com/react-store-products");
      console.log(res);
      if (!res.ok) {
        throw new Error("Product not found!");
      }
      const data = await res.json();

      dispatchFn({ type: "PUSH", val: data });

      props.product(productData.items);
      setIsLoading(false);
    };

    fetchData().catch((err) => {
      setTimeout(() => {
        setIsLoading(false);
        setError(err.message);
      },10000);
    });
  }, []);

  const rowHandler = function () {
    dispatchFn({ type: "BTN" });
  };

  const gridHandler = function () {
    dispatchFn({ type: "GRID" });
  };

  const product = props.data.length !== 0 ? props.data : productData.items;

  const sorting = function (e) {
    const val = e.target.value;

    dispatchFn({ type: "SORT" });
    if (val === "Price (lowest)") {
      const newArr = product.sort((a, b) => a.price - b.price);
      setSortArr(newArr);
    }
    if (val === "Price (highest)") {
      const newArr = product.sort((a, b) => b.price - a.price);
      setSortArr(newArr);
    }
    if (val === "Name (A-Z)") {
      const newArr = product.sort((a, b) => a.name.localeCompare(b.name));
      setSortArr(newArr);
    }
    if (val === "Name (Z-A)") {
      const newArr = product.sort((a, b) => b.name.localeCompare(a.name));
      setSortArr(newArr);
    }
  };

  const sortedItem = productData.isSort ? sortArr : product;

  return (
    <Fragment>
      <div className={styles["products"]}>
        <div className={styles.topbar}>
          <div className={styles["btn-container"]}>
            <button
              onClick={gridHandler}
              className={!productData.isRow ? styles.active : ""}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
              </svg>
            </button>
            <button
              onClick={rowHandler}
              className={productData.isRow ? styles.active : ""}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                ></path>
              </svg>
            </button>
          </div>
          <div className={styles.count}>
            <span>{product.length}</span>
            <p>Products Found</p>
          </div>
          <form className={styles.sort}>
            <label htmlFor="select">Sort By</label>
            <select id="select" onChange={sorting}>
              <option>Price (lowest)</option>
              <option>Price (highest)</option>
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
            </select>
          </form>
        </div>
        {!error && isLoading && (
          <div className={styles.loading}>
            <div className={styles.loader}></div>
          </div>
        )}
        {error && (
          <p className={styles.message}>
            Products not found! Please try again later!
          </p>
        )}
        {!error && !isLoading &&(
          <main className={styles.main}>
            {!productData.isRow &&
              sortedItem.map((data) => {
                return (
                  <div className={styles["main-products"]} key={data.id}>
                    <div className={styles.container}>
                      <img src={data.image} alt="" />
                      <div className={styles.overlay}></div>
                    </div>
                    <div className={styles["main-products--details"]}>
                      <p>{data.name}</p>
                      <span>{numberSet(data.price)}</span>
                    </div>

                    <div className={styles["overlay-container"]}>
                      <Link
                        className={styles["single-product"]}
                        to={`/products/${data.id}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}

            {productData.isRow &&
              sortedItem.map((data) => {
                return (
                  <div className={styles["main-products__row"]}>
                    <div className={styles.container}>
                      <img src={data.image} alt="" />
                    </div>
                    <div className={styles["main-products__row--details"]}>
                      <h4>{data.name}</h4>
                      <span>${data.price}</span>
                      <p>{data.description}</p>
                      <Link to={`/products/${data.id}`}>details</Link>
                    </div>
                  </div>
                );
              })}
          </main>
        )}
      </div>
    </Fragment>
  );
}
export default MainProduct;
