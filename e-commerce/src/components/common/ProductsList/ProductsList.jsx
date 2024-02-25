import { ScreenContainer } from "../../layout";
import styles from "./styles.module.css";

const ProductsList = ({ greeting }) => {
  return (
    <ScreenContainer>
      <p className={styles.text}>{greeting}</p>
    </ScreenContainer>
  );
};

export default ProductsList;
