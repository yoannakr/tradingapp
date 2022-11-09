import { setValueAtLocalStorage } from "./setValueAtLocalStorage";

export const getValueFromLocalStorage = (key: string, defaultValue?: any) => {
  const valueInLocalStorage = window.localStorage.getItem(key);
  if (valueInLocalStorage) {
    return JSON.parse(valueInLocalStorage);
  }

  setValueAtLocalStorage(key, defaultValue);
  return defaultValue;
};
