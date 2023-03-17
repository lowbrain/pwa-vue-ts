const STORAGE_NAME = "AUTH_TOKEN";

const hasToken = (storage: Storage): boolean => {
  if (storage.getItem(STORAGE_NAME)) {
    return true;
  } else {
    return false;
  }
};

const setToken = (storage: Storage, token: string) => {
  storage.setItem(STORAGE_NAME, token);
};

const getToken = (storage: Storage): string => {
  return storage.getItem(STORAGE_NAME) ?? "";
};

const removeToken = (storage: Storage) => {
  storage.removeItem(STORAGE_NAME);
};

export { hasToken, setToken, getToken, removeToken };
