import Axios from "../axiosConfig.js";

export const getCategories = async () => {
  const response = await Axios.get("/v4/all/categories");
  return response.data;
};
