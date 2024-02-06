import styles from "./styles.module.css";
import Home from "../../../assets/home.svg?react";
import CartButton from "../../common/CartButton";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <a className={styles.logoContainer}>
        <Home />
        <span>INICIO</span>
      </a>
      <div className={styles.navMenu}>
        <div className={styles.navItem}>
          <a>IOS</a>
        </div>
        <div className={styles.navItem}>
          <a>Android</a>
        </div>
        <div className={styles.navItem}>
          <a>Accesorios</a>
        </div>
        <div className={styles.navItem}>
          <a>Modelos Recientes</a>
        </div>
      </div>
      <CartButton />
    </div>
  );
};

export default Navbar;
