import storage from "./storage.util";

const KEY_USER = "__user";

export const setUser = data => {
  storage.set(KEY_USER, data);
};

export const getUser = () => storage.get(KEY_USER, {});

export const getUserKey = key => getUser()[key];

export const removeUser = () => storage.remove(KEY_USER);
