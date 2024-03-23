import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const getProducts = async (categoryId) => {
  const productsRef = collection(db, "products");

  let products;

  if (categoryId) {
    const productsFiltered = query(
      productsRef,
      where("category", "==", categoryId)
    );
    products = productsFiltered;
  } else {
    products = productsRef;
  }
  const response = await getDocs(products);

  return response.docs.map((product) => {
    return { ...product.data(), id: product.id };
  });
};
