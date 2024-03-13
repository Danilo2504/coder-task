import { useEffect, useState } from "react";

export const useFetch = (callback, options) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    const getData = async () => {
      setState({
        ...state,
        isLoading: true,
      });

      const response = await callback(options);
      setState({
        data: response,
        isLoading: false,
      });
    };

    getData();
  }, [options]);

  return {
    data: state.data,
    isLoading: state.isLoading,
  };
};
