import { Fragment, useEffect, useState } from "react";
import styles from "./SingleProduct.module.css";
import { useParams, Link } from "react-router-dom";
import { useCtx } from "../store/cart-context";

function SingleProduct() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useCtx();

  const increase = function () {
    setProductQuantity((prev) => prev + 1);
  };
  const decrease = function () {
    if (productQuantity !== 1) {
      setProductQuantity((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const fetchData = async function () {
      setIsLoading(true);
      const res = await fetch(
        `https://course-api.com/react-store-single-product?id=${id}`
      );
      const data = await res.json();
      setSingleProduct(data);
      setIsLoading(false);
    };
    fetchData().catch((err) => console.error(err));
  }, [id]);

  return (
    <Fragment>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.loader}></div>
        </div>
      )}
      {!isLoading && (
        <div>
          <div>
            <Link to="/products" className={styles.button}>
              Back to products
            </Link>
          </div>
          <div className={styles["single-products__container"]}>
            <div className={styles["single-products"]}>
              <img
                src={singleProduct.images ? singleProduct.images[0].url : ""}
                alt=""
              />
            </div>
            <div className={styles["single-products__details"]}>
              <h2 className={styles.title}>{singleProduct.name}</h2>
              <h4 className={styles.price}>${singleProduct.price}</h4>
              <p className={styles.description}>{singleProduct.description}</p>
              <p className={styles.available}>
                <span>Available:</span>
                {singleProduct.stock}
              </p>
              <p className={styles.sku}>
                <span>SKU:</span>
                {id}
              </p>
              <p className={styles.brand}>
                <span>Brand:</span>
                {singleProduct.brand}
              </p>
              <p className={styles.cart}>
                <button onClick={decrease}>-</button>
                <span>{productQuantity}</span>
                <button onClick={increase}>+</button>
              </p>
              <Link
                to="/cart"
                className={styles.button}
                onClick={() => {
                  ctx.addToCart({
                    ...singleProduct,
                    quantity: productQuantity,
                  });
                }}
              >
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default SingleProduct;
