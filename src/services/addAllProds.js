import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import products from "../mocks/products.json";

export const addAllProds = () => {
  const productsRef = collection(db, "products");
  products.forEach((product) =>
    addDoc(productsRef, {
      ...product,
      stock: Math.floor(Math.random() * 38) + 1,
    })
  );
};
