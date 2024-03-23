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

  const removeProduct = (product) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_PRODUCT, payload: product });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTION_TYPES.CLEAR_CART, payload: [] });
  };

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, removeProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
