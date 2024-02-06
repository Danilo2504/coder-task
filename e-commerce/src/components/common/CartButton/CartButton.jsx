import styles from "./styles.module.css";
import Cart from "../../../assets/cart.svg?react";

const CartButton = () => {
  return (
    <button className={styles.cartButton}>
      <Cart />
      <span>0</span>
    </button>
  );
};

export default CartButton;
