type KeyType = "token" | "language";

export const setKeyWithValue = (key: KeyType, value: string) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, value);
};

export const getValueByKey = (key: KeyType) => {
  return localStorage.getItem(key);
};
