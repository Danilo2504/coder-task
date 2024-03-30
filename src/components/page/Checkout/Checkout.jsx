import { useContext, useState } from "react";
import { ScreenContainer } from "../../layout";
import { CartContext } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { buyProducts } from "../../../services/buyProduct";
import { useForm } from "../../../hooks/useForm";

const initialValues = {
  name: "",
  surname: "",
  email: "",
};

const toValidate = ["name", "surname", "email"];

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { values, handleOnChange, validateValues } = useForm(initialValues);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateValues(toValidate) && cart.length > 0) {
      const orderPayload = {
        buyer: values,
        items: cart,
        totalPrice,
      };

      const response = await buyProducts(orderPayload);
      setOrderId(response);
      clearCart();
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
      }}
    >
      <div
        style={{
          width: "30%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 15,
          height: "fit-content",
          padding: "15px 30px",
        }}
      >
        {orderId ? (
          <>
            <h3>Tu compra ha sido realizada con exito</h3>
            <p>
              Aqui esta tu identificador de compra: {orderId}. No lo pierdas
            </p>
            <button onClick={() => navigate("/")} style={{ width: "100%" }}>
              Voler al inicio
            </button>
          </>
        ) : (
          <>
            <p>Total: {totalPrice}</p>
            <p>
              Para finalizar esta compra rellena el siguiente formulario con tus
              datos
            </p>
            <input
              onChange={(event) => handleOnChange(event)}
              type="text"
              value={values.name}
              placeholder="Tu nombre"
              name="name"
            />
            <input
              onChange={(event) => handleOnChange(event)}
              type="text"
              value={values.surname}
              placeholder="Tu apellido"
              name="surname"
            />
            <input
              onChange={(event) => handleOnChange(event)}
              type="email"
              value={values.email}
              placeholder="example@email.com"
              name="email"
            />
            <div style={{ width: "100%", display: "flex", gap: 15 }}>
              <button
                onClick={(event) => handleSubmit(event)}
                style={{ width: "50%" }}
              >
                Finalizar Compra
              </button>
              <button
                onClick={() => navigate("/cart")}
                style={{ width: "50%" }}
              >
                Cancelar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
