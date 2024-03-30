import { createContext, useReducer } from "react";
import {
  CART_ACTION_TYPES,
  cartInitialState,
  cartReducer,
} from "../reducers/cart";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product });
  };

  const editProduct = (product, value) => {
    dispatch({
      type: CART_ACTION_TYPES.EDIT_PRODUCT,
      payload: { product, value },
    });
  };

  const removeProduct = (product) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_PRODUCT, payload: product });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTION_TYPES.CLEAR_CART, payload: [] });
  };

  const totalPrice = state
    .map((item) => item.price * item.quantity)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        editProduct,
        removeProduct,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
