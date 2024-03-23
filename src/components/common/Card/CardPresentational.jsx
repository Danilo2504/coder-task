import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const CardPresentational = ({ data, addToCart }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img src={data.image_url} className={styles.image} />
      </div>
      <Link to={`/product/${data.id}`} className={styles.textModel}>
        {data.model}
      </Link>
      <p className={styles.textInfo}>
        {data.brand} - {data.year}
      </p>
      <p className={styles.textPrice}>USD${data.price},00</p>
      <button onClick={addToCart}>Añadir al carrito</button>
    </div>
  );
};

export default CardPresentational;
