import { useContext } from "react";
import { ScreenContainer } from "../../layout";
import { CartContext } from "../../../contexts/CartContext";
import { CartCard } from "../../common";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <ScreenContainer>
      <div className={styles.container}>
        <p style={{ fontSize: 20 }}>Cart</p>
        <div
          style={{
            height: "80%",
            gap: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {cart.length > 0 ? (
            cart.map((product) => <CartCard key={product.id} data={product} />)
          ) : (
            <p>No hay productos</p>
          )}
        </div>
        <Link to="/checkout">Comprar todo</Link>
        <button onClick={clearCart}>Vaciar carrito</button>
      </div>
    </ScreenContainer>
  );
};

export default Cart;
