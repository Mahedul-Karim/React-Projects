import React, { useContext, useReducer, useState, useEffect } from "react";

const Cart = React.createContext();

const init = {
  items: [],
  totalQuantity: 0,
};

const reducer = function (state, action) {
  if (action.type === "CART") {
    const amount = state.totalQuantity + action.payload.quantity;

    const existingIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingItem = state.items[existingIndex];
    let newArr;
    if (existingItem) {
      const exItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.payload.quantity,
      };
      newArr = [...state.items];
      newArr[existingIndex] = exItem;
    } else {
      newArr = state.items.concat(action.payload);
    }
    return {
      items: newArr,
      totalQuantity: amount,
    };
  }

  if (action.type === "REM") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.payload
    );
    const existingItem = state.items[existingIndex];

    let newArr;

    if (existingItem.quantity === 1) {
      return {
        items: state.items,
        totalQuantity: state.totalQuantity,
      };
    } else {
      const exItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      newArr = [...state.items];
      newArr[existingIndex] = exItem;
      return {
        items: newArr,
        totalQuantity: state.totalQuantity - 1,
      };
    }
  }

  if (action.type === "DELETE") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.payload
    );
    const existingItem = state.items[existingIndex];
    const amount = state.totalQuantity - existingItem.quantity;
    const newArr = state.items.filter((item) => item.id !== existingItem.id);
    return {
      items: newArr,
      totalQuantity: amount,
    };
  }

  if (action.type === "CLEAR") {
    return init;
  }
  return init;
};

function CartProvider(props) {
  const [cartItems, dispatchFn] = useReducer(reducer, init);
  const [subtotal, setSubtotal] = useState(0);

  const addToCart = function (item) {
    dispatchFn({ type: "CART", payload: item });
  };

  const removeCart = function (id) {
    dispatchFn({ type: "REM", payload: id });
  };

  const deleteItem = function (id) {
    dispatchFn({ type: "DELETE", payload: id });
  };

  const clearItems = function () {
    dispatchFn({ type: "CLEAR" });
  };

  useEffect(() => {
    const totalPrice = cartItems.items.reduce(
      (acc, v) => acc + v.price * v.quantity,
      0
    );
    setSubtotal(totalPrice);
  }, [cartItems.items]);

  return (
    <Cart.Provider
      value={{
        cartItems,
        addToCart,
        removeCart,
        deleteItem,
        clearItems,
        subtotal,
      }}
    >
      {props.children}
    </Cart.Provider>
  );
}

export default CartProvider;

export const useCtx = function () {
  return useContext(Cart);
};
