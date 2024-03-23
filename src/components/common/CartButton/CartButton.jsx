import CartButtonPresentational from "./CartButtonPresentational";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

const CartButton = () => {
  const { cart } = useContext(CartContext);

  return <CartButtonPresentational cartCount={cart.length} />;
};

export default CartButton;
