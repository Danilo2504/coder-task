import { useContext } from "react";
import styles from "./styles.module.css";
import { CartContext } from "../../../contexts/CartContext";

const Footer = () => {
  const { cart } = useContext(CartContext);

  return (
    <footer className={styles.container}>
      {JSON.stringify(cart, null, 2)}
    </footer>
  );
};

export default Footer;
