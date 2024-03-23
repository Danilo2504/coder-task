export const cartInitialState = [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  CLEAR_CART: "CLEAR_CART",
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const isProductInCart = state.findIndex(
        (product) => product.id === actionPayload.id
      );

      if (isProductInCart >= 0) {
        const newCart = state.map((item) => {
          if (item.id === actionPayload.id) {
            return {
              ...item,
              quantity: item.quantity + actionPayload.quantity,
            };
          } else {
            return item;
          }
        });
        return newCart;
      } else {
        return [...state, actionPayload];
      }
    }

    case CART_ACTION_TYPES.REMOVE_PRODUCT: {
      return state.filter((product) => product.id !== actionPayload.id);
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      return actionPayload;
    }
  }
};
