import { useState } from "react";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validateValues = (rules = []) => {
    const isCheck = rules.every((key) => {
      const value = values[key];
      if (key === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value !== "" && value !== null && regex.test(value);
      } else {
        return value !== "" && value !== null;
      }
    });
    return isCheck;
  };

  return { values, setValues, handleOnChange, validateValues };
};
