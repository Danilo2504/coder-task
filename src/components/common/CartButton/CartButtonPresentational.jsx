import styles from "./styles.module.css";
import Cart from "../../../assets/cart.svg?react";
import { Link } from "react-router-dom";

const CartButtonPresentational = ({ cartCount }) => {
  return (
    <Link to={"/cart"} className={styles.cartButton}>
      <Cart />
      <span>{cartCount}</span>
    </Link>
  );
};

export default CartButtonPresentational;
