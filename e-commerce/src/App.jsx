import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cart, Home, ProductDetail } from "./components/page";
import { Navbar } from "./components/layout";
import { useEffect } from "react";
import { getCategories } from "./services/getCategories/getCategories";
import { getProducts } from "./services/getProducts/getProducts";

function App() {
  useEffect(() => {
    // getCategories();
    // getProducts();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/categories/:category" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
