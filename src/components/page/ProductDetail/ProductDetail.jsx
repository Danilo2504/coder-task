import { Link, useParams } from "react-router-dom";
import { Loading, ScreenContainer } from "../../layout";
import ArrowLeft from "../../../assets/arrow-left.svg?react";
import styles from "./styles.module.css";
import { getProductById } from "../../../services/getProductById";
import { useFetch } from "../../../hooks/useFetch";
import { CartContext } from "../../../contexts/CartContext";
import { useContext, useState } from "react";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useFetch(getProductById, productId);
  const { addToCart } = useContext(CartContext);
  const [counter, setCounter] = useState(1);

  const sumar = () => {
    if (product.stock > counter) {
      setCounter((prevState) => prevState + 1);
    }
  };

  const restar = () => {
    if (counter > 1) {
      setCounter((prevState) => prevState - 1);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <ScreenContainer
      style={{
        backgroundColor: "#fbfafa",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={styles.productContainer}>
        <div className={styles.leftCol}>
          <img src={product?.image_url} height={600} className={styles.image} />
        </div>
        <div className={styles.rightCol}>
          <Link to={-1} className={styles.goBackButton}>
            <ArrowLeft />
            <p>Volver</p>
          </Link>
          <p>
            {product?.category?.toUpperCase()} | {product?.type?.toUpperCase()}
          </p>
          <p>{product?.model}</p>
          <p>
            {product?.brand} - {product?.year}
          </p>
          <p>Color: {product?.color}</p>
          <p>USD${product?.price}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={sumar}>+</button>
            <span>{counter}</span>
            <button onClick={restar}>-</button>
          </div>
          <div style={{ display: "flex", gap: 25 }}>
            <button>COMPRAR</button>
            <button
              onClick={() => addToCart({ ...product, quantity: counter })}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};

export default ProductDetail;
