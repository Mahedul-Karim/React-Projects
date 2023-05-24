import { Fragment } from "react";
import styles from "./AddCart.module.css";
import { Link } from "react-router-dom";
import { useCtx } from "../store/cart-context";
import numberSet from "../utilities/Number";

function AddCart() {
  const { items, totalQuantity } = useCtx().cartItems;
  const ctx = useCtx();

  const addItemHandler = function (item) {
    ctx.addToCart({ ...item, quantity: 1 });
  };

  const removeHandler = function (id) {
    ctx.removeCart(id);
  };

  const deleteHandler = function (id) {
    ctx.deleteItem(id);
  };

  console.log(items)
  const cartItems = items.map((item) => (
    <div className={styles["cart-container"]} key={item.id}>
      <div className={styles.details}>
        <img src={item.images[0].url} />

        <div>
          <h4 className={styles["item-name"]}>{item.name}</h4>
          <p className={styles.priceMid}>{numberSet(item.price)}</p>
        </div>
      </div>
      <div className={styles.singleprice}>
        <p className={styles.price}>{numberSet(item.price)}</p>
      </div>
      <div>
        <p className={styles.cart}>
          <button onClick={removeHandler.bind(null, item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={addItemHandler.bind(null, item)}>+</button>
        </p>
      </div>
      <div className={styles.price}>{numberSet(item.price * item.quantity)}</div>
      <div>
        <button
          className={styles.delete}
          onClick={deleteHandler.bind(null, item.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
    </div>
  ));

  const showItems = (
    <div>
      <div className={styles.titles}>
        <p>item</p>
        <p className={styles.pricetitle}>price</p>
        <p>quantity</p>
        <p>subtotal</p>
      </div>
      <hr />
      {cartItems}
      <hr />
      <div className={styles.buttons}>
        <Link to="/products" className={styles.continue}>
          Continue shopping
        </Link>
        <button className={styles.clear} onClick={ctx.clearItems}>
          Clear Shopping Cart
        </button>
      </div>

      <div className={styles.recipt}>
        <div className={styles.order}>
          <div>
            <span className={styles.subtotal}>subtotal:</span>
            <span className={styles["subtotal-price"]}>{numberSet(ctx.subtotal)}</span>
          </div>
          <div>
            <span className={styles.shipping}>shipping fee:</span>
            <span className={styles["shipping-fee"]}>$5.55</span>
          </div>
          <hr />
          <div>
            <span className={styles.total}>order total:</span>
            <span className={styles["total-price"]}>{numberSet(ctx.subtotal+5.55)}</span>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Fragment>
      {items.length === 0 && (
        <div className={styles.empty}>
          <p>No items in the cart!</p>
          <Link to="/products" className={styles.continue}>
            Add One?
          </Link>
        </div>
      )}
      {items.length !== 0 && showItems}
    </Fragment>
  );
}
export default AddCart;
