import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { CartCard } from "../../common";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Cart = () => {
  const { cart, clearCart, totalPrice } = useContext(CartContext);

  return (
    <div className={styles.container}>
      {cart.length > 0 ? (
        <div
          style={{
            width: "80%",
            gap: 20,
            display: "grid",
            gridTemplateColumns: "1fr minmax(10em, 300px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {cart.map((product) => (
              <CartCard key={product.id} data={product} />
            ))}
          </div>
          <div
            style={{
              gap: 25,
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              boxShadow: "0px 2px 9px #dadada",
              borderRadius: 15,
              padding: 20,
            }}
          >
            <p>Total: $ {totalPrice}</p>
            <Link
              to="/checkout"
              style={
                cart.length > 0
                  ? {
                      pointerEvents: "auto",
                      border: "1px solid #2e2e2e",
                      textAlign: "center",
                    }
                  : { pointerEvents: "none", opacity: 0.6 }
              }
            >
              Comprar todo
            </Link>
            <button onClick={clearCart}>Vaciar carrito</button>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3 style={{ fontFamily: "FF Mark Pro Medium", fontSize: 20 }}>
            No hay productos
          </h3>
          <Link to="/">Volver al inicio</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
