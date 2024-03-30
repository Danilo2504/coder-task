import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const buyProducts = async (data) => {
  const orderRef = collection(db, "orders");
  const response = await addDoc(orderRef, data);
  return response.id;
};
