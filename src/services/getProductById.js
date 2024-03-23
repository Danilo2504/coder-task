import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const getProductById = async (id) => {
  const productsCollection = collection(db, "products");
  const productDoc = doc(productsCollection, id);

  const response = await getDoc(productDoc);
  return { ...response.data(), id: response.id };
};
