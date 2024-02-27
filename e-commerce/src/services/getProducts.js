import { products } from "../data/products";

export const getProducts = async (categoryId) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      if (categoryId) {
        const response = products.filter(
          (product) => product.category === categoryId
        );
        resolve(response);
      }
      resolve(products);
    }, 1000)
  );
};
