import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cart, Home, NotFound, ProductDetail } from "./components/page";
import { Layout } from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category/:categoryId" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
