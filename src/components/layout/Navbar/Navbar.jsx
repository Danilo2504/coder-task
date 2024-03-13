import styles from "./styles.module.css";
import Home from "../../../assets/home.svg?react";
import { CartButton } from "../../common";
import { Link } from "react-router-dom";
import { categories } from "../../../data/categories";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles.logoContainer}>
        <Home />
        <span>INICIO</span>
      </Link>
      <div className={styles.navMenu}>
        {categories.map((category) => (
          <Link
            key={category.id}
            className={styles.navItem}
            to={`/category/${category.category}`}
          >
            {category.label}
          </Link>
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Navbar;
