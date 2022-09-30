import { useState, useCallback } from 'react';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

export const useLocalStorageNonString = (key, initialState) => {
  const serializedInitialState = JSON.stringify(initialState);
  let storageValue = initialState;
  try {
    storageValue = JSON.parse(localStorage.getItem(key)) ?? initialState;
  } catch {
    localStorage.setItem(key, serializedInitialState);
  }
  const [value, setValue] = useState(storageValue);
  const updatedSetValue = useCallback(
    (newValue) => {
      const serializedNewValue = JSON.stringify(newValue);
      if (
        serializedNewValue === serializedInitialState
        || typeof newValue === 'undefined'
      ) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serializedNewValue);
      }
      setValue(newValue ?? initialState);
    },
    [initialState, serializedInitialState, key],
  );
  return [value, updatedSetValue];
};
