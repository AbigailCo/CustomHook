import { useEffect, useState } from "react";

const localCache = {};
export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    errorMessages: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      errorMessages: null,
    });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      console.log("Usando cache");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        errorMessages: null,
      });
      return;
    }

    setLoadingState();

    const respons = await fetch(url);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!respons.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        errorMessages: {
          code: respons.status,
          message: respons.statusText,
        },
      });
      return;
    }

    const data = await respons.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      errorMessages: null,
    });

    localCache[url] = data;

    console.log(data);
    const { name } = data;
    console.log("este es el nombre " + name);
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
