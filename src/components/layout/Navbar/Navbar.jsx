import styles from "./styles.module.css";
import { CartButton } from "../../common";
import { Link } from "react-router-dom";
import { categories } from "../../../data/categories";
import logo_brand from "../../../assets/logo-brand.png";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles.logoContainer}>
        <img src={logo_brand} width={200} height={40} alt="imagen del logo" />
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
