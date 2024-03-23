import { useState } from "react";
import styles from "./styles.module.css";

const CartCard = ({ data }) => {
  const [counter, setCounter] = useState(data.quantity);

  const handleInput = (text) => {
    if (data.stock >= +text.target.value > 0) {
      setCounter(+text.target.value);
    }
  };

  const sumar = () => {
    if (data.stock > counter) {
      setCounter((prevState) => prevState + 1);
    }
  };

  const restar = () => {
    if (counter > 1) {
      setCounter((prevState) => prevState - 1);
    }
  };

  return (
    <div className={styles.container}>
      <img src={data.image_url} className={styles.image} />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{data.model}</h2>
        <p>{`${data.brand} - ${data.year}`}</p>
      </div>
      <div className={styles.counterContainer}>
        <button onClick={sumar}>+</button>
        <input
          type="text"
          value={counter}
          onChange={(text) => handleInput(text)}
          className={styles.input}
        />
        <button onClick={restar} className={styles.button}>
          -
        </button>
      </div>
      <p>{`Stock: ${data.stock}`}</p>
      <p>{`$ ${data.price}`}</p>
    </div>
  );
};

export default CartCard;
