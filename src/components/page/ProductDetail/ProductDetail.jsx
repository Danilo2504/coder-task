import { Link, useParams } from "react-router-dom";
import { Loading, ScreenContainer } from "../../layout";
import { useEffect, useState } from "react";
import ArrowLeft from "../../../assets/arrow-left.svg?react";
import styles from "./styles.module.css";
import { getProductById } from "../../../services/getProductById";
import { useFetch } from "../../../hooks/useFetch";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useFetch(getProductById, +productId);

  if (isLoading) return <Loading />;

  return (
    <ScreenContainer style={{ backgroundColor: "#fbfafa" }}>
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
            <button>+</button>
            <span>0</span>
            <button>-</button>
          </div>
          <div style={{ display: "flex", gap: 25 }}>
            <button>COMPRAR</button>
            <button>Añadir al carrito</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};

export default ProductDetail;
