import styles from "./styles.module.css";

const ProductsList = ({ greeting }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{greeting}</p>
    </div>
  );
};

export default ProductsList;
