import { useEffect, useState } from "react";

const useFetch = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fetchProps, setFetchProps] = useState(props);

  useEffect(() => {
    setFetchProps({
      url: props.url,
      method: props.method,
      body: props.body,
      token: props.token,
    });
  }, [props.body, props.method, props.token, props.url]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${fetchProps.url}`,
        {
          headers: {
            "Content-Type": "Application/json",
            ...(fetchProps.token && {
              authorization: fetchProps.token,
            }),
          },
          method: fetchProps.method,
          ...(fetchProps.body && {
            body: JSON.stringify(fetchProps.body),
          }),
        }
      );
      const dataJson = await response.json();
      if (!dataJson.success) {
        throw new Error(dataJson.message);
      }
      setData(dataJson);
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return [{ fetchData, data, error, loading, fetchProps }, setFetchProps];
};

export default useFetch;
