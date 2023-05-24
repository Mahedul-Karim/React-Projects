import { Fragment, useContext } from "react";
import styles from "./Featured.module.css";
import { Link } from "react-router-dom";
import { Product } from "../store/product-context";
import numberSet from "../utilities/Number";

function Featured() {
  const ctx = useContext(Product);

  return (
    <Fragment>
      {ctx.isLoading && !ctx.error &&(
        <div className={styles.loading}>
          <div className={styles.loader}></div>
        </div>
      )}
      {ctx.error && <p className={styles.loading}>Something went wrong!Please try again later</p>}
      {!ctx.error &&
        ctx.featureItems.map((item) => {
          return (
            <div className={styles["feature-products"]} key={item.id}>
              <div className={styles.container}>
                <img src={item.image} alt="" />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles["feature-products--details"]}>
                <p>{item.name}</p>
                <span>{numberSet(item.price)}</span>
              </div>

              <div className={styles["overlay-container"]}>
                <Link
                  className={styles["single-product"]}
                  to={`/products/${item.id}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
}
export default Featured;
