import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request'
    );
  }
  const responseData = await response.json();
  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();

  const sendRequest = useCallback(async function sendRequest() {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (err) {
      setErr(err.message || 'something went wrong')
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if (config && (config.method === 'GET' || !config.method) || !config) {
      
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data, isLoading, err, sendRequest
  }
}