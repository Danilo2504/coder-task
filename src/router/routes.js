import { Cart, Checkout, Home, ProductDetail } from "../components/page";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "category",
    path: "/category/:categoryId",
    Element: Home,
  },
  {
    id: "cart",
    path: "/cart",
    Element: Cart,
  },
  {
    id: "product",
    path: "/product/:productId",
    Element: ProductDetail,
  },
  {
    id: "checkout",
    path: "/checkout",
    Element: Checkout,
  },
];
