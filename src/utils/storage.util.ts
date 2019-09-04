const localStorageSupported =
  typeof window !== "undefined" &&
  typeof window["localStorage"] !== "undefined" &&
  window["localStorage"] !== null;

const set = (key: string, item: any) => {
  if (localStorageSupported) {
    localStorage.setItem(key, JSON.stringify(item));
  }
};

const get = (key: string, defaultValue: any = null): any =>
  localStorageSupported
    ? JSON.parse(localStorage.getItem(key) || "null") || defaultValue
    : defaultValue;

const remove = (key: string) => {
  if (localStorageSupported) {
    localStorage.removeItem(key);
  }
};

const clear = () => {
  if (localStorageSupported) {
    localStorage.clear();
  }
};

export default { set, get, remove, clear };
