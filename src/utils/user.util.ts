import react from "react";
import { isBrowser } from "./constants";

const KEY_USER = "ecoUser";

export const getUser = () => JSON.parse(localStorage.getItem(KEY_USER) || "{}");

export const getUserKey = key => {
  const value = getUser();
  return value && value.hasOwnProperty(key) ? value[key] : undefined;
};

export const setUser = (user = {}) => {
  localStorage.setItem(
    KEY_USER,
    JSON.stringify({ ...user, lts: new Date().getTime() })
  );
};

export const removeUser = () => isBrowser && localStorage.removeItem(KEY_USER);
