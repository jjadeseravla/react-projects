import { useState, useEffect } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const places = await fetchFn();
        setFetchedData(fetchedData);
      } catch (error) {
        setError({
          message: error.message || 'failed to fetch data'
        })
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);
  return {
    isFetching,
    fetchedData,
    error,
    setFetchedData
  }
}