import styles from "./styles.module.css";
import Cart from "../../../assets/cart.svg?react";
import { Link } from "react-router-dom";

const CartButton = () => {
  return (
    <Link to={"/cart"} className={styles.cartButton}>
      <Cart />
      <span>0</span>
    </Link>
  );
};

export default CartButton;
