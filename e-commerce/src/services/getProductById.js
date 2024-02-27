import { products } from "../data/products";

export const getProductById = async (id) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      const response = products.find((product) => product.id === id);
      resolve(response);
    }, 1000)
  );
};
