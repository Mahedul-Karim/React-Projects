import React, { useEffect, useState } from "react";

export const Product = React.createContext();

const ProductProvider = function (props) {
  const [featureItems, setFeatureItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async function () {
      setIsLoading(true);
      const res = await fetch("https://course-api.com/react-store-products");
      if (!res.ok) {
        throw new Error("Product Not Found!");
      }
      const data = await res.json();
      setFeatureItems(data.slice(0, 3));
      setIsLoading(false);
    };
    fetchData().catch((err) =>
      setTimeout(() => {
        setIsLoading(false);
        setError(err.message);
      }, 10000)
    );
  }, []);

  return (
    <Product.Provider value={{ featureItems, isLoading, error }}>
      {props.children}
    </Product.Provider>
  );
};

export default ProductProvider;
