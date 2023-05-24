import { Fragment } from "react";
import MainHeader from "./components/header/MainHeader";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import About from "./components/pages/About";
import ProductDetails from "./components/pages/ProductDetails";
import Footer from "./components/footer/Footer";
import ProductProvider from "./components/store/product-context";
import CartPage from "./components/pages/CartPage";
import CartProvider from "./components/store/cart-context";
import Sidebar from "./components/sidebar/Sidebar";
import SidebarProvider from "./components/store/sidebar-context";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <SidebarProvider>
          <Sidebar />
          <MainHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </SidebarProvider>
      </CartProvider>
    </ProductProvider>
  );
}
export default App;