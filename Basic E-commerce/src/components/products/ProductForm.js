import styles from "./ProductForm.module.css";
import { useEffect, useState, useRef } from "react";
import numberSet from "../utilities/Number";

function ProductForm(props) {
  const btn = new Set(props.filter.map((filt) => filt.category));
  const btnUnique = [...btn];
  const [filteredItems, setFilteredItem] = useState([]);
  const [price,setPrice]=useState();
  const comp = new Set(props.filter.map((filt) => filt.company));
  const compUniq = [...comp];
  
   const maxPrice=Math.max(...props.filter.map(item=>item.price));
  console.log(maxPrice)

  const itemFilterHandler = function (filt) {
    setFilteredItem(props.filter.filter((item) => item.category === filt));
  };

  const allData = function () {
    setFilteredItem(props.filter);
  };

  const productSearch = function (e) {
    const value = e.target.value;
    setFilteredItem(props.filter.filter((item) => item.name.startsWith(value)));
  };

  const value = (e) => {
    const opt = e.target.value;
    setFilteredItem(props.filter.filter((item) => item.company === opt));
  };

  const range=(e)=>{
    const price=e.target.value;
    setPrice(price);
    setFilteredItem(props.filter.filter(item=>item.price <= price));
  }

  const check=(e)=>{
    const freeShip=e.target.checked;
    setFilteredItem(props.filter.filter(item=>item.shipping === freeShip))
  }

  props.newdata(filteredItems);

  return (
    <div className={styles["sidebar-container"]}>
      <input
        type="text"
        placeholder="Search"
        className={styles.search}
        onChange={productSearch}
      />
      <h4>Category</h4>
      <button onClick={allData}>All</button>

      {btnUnique.map((filt) => {
        return (
          <button
            onClick={() => {
              itemFilterHandler(filt);
            }}
            key={filt}
          >
            {filt}
          </button>
        );
      })}
      <h4>Company</h4>
      <select onChange={value}>
        <option value="all">all</option>
        {compUniq.map((filt) => {
          return (
            <option key={filt} value={filt}>
              {filt}
            </option>
          );
        })}
      </select>
      <h4>Price</h4>
      <p>${price ? price : "309999"}</p>
      <input type="range" min="0" max="309999" value={price ? price : "309999"} name="price" onChange={range}/>
      <div className={styles.check}>
        <input type="checkbox" id="ship" onChange={check}/>
        <label htmlFor="ship">Free Shipping</label>
      </div>
    </div>
  );
}
export default ProductForm;
