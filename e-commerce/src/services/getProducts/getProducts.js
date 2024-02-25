import Axios from "../axiosConfig.js";

export const getProducts = async () => {
  const response = await Axios.post("/v4/all/products/?page=0", {
    category: ["Smartphones"],
    from: "2022-01-30",
  });
  console.log("[PRODUCTS] =>", response.data.data);
  return response.data;
};
