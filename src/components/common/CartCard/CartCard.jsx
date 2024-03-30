import { useContext, useState } from "react";
import styles from "./styles.module.css";
import { CartContext } from "../../../contexts/CartContext";

const CartCard = ({ data }) => {
  const { editProduct } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(data.price * data.quantity);

  const sumar = () => {
    if (data.stock > data.quantity) {
      editProduct(data, ["quantity", data.quantity + 1]);
      setSubTotal((prevState) => prevState + data.price);
    }
  };

  const restar = () => {
    if (data.quantity > 1) {
      editProduct(data, ["quantity", data.quantity - 1]);
      setSubTotal((prevState) => prevState - data.price);
    }
  };

  return (
    <div className={styles.container}>
      <img src={data.image_url} className={styles.image} />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{data.model}</h2>
        <p className={styles.subtitle}>{`${data.brand} - ${data.year}`}</p>
      </div>
      <div className={styles.counterContainer}>
        <button onClick={sumar} className={styles.button}>
          +
        </button>
        <div className={styles.text}>{data.quantity}</div>
        <button onClick={restar} className={styles.button}>
          -
        </button>
      </div>
      <p className={styles.info}>{`Stock: ${data.stock}`}</p>
      <p className={styles.info}>{`$ ${subTotal}`}</p>
    </div>
  );
};

export default CartCard;
