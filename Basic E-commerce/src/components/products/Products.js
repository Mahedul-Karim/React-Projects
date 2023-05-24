import styles from "./Products.module.css";
import PageNav from "../utilities/PageNav";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import ProductForm from "./ProductForm";
import MainProduct from "./MainProduct";
import { useState } from "react";

function Products() {
  const { pathname } = useLocation();
  const loc = pathname.slice(1).trim();
  const nav = loc.charAt(0).toUpperCase() + loc.slice(1);
  const [product, setProduct] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getData = function (data) {
    setProduct((prev) => (prev = data));
  };

  const setData = function (data) {
    setFilteredData(data);
  };

  return (
    <Fragment>
      <PageNav nav={nav} />
      <div className={styles["products-container"]}>
        <div className={styles.sidebar}>
          <ProductForm filter={product} newdata={setData}/>
        </div>
        <div className={styles.main}>
          <MainProduct product={getData} data={filteredData}/>
        </div>
      </div>
    </Fragment>
  );
}
export default Products;
