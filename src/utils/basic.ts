import { DATEFORMATS, TYPE_OPTIONS } from "@static/constants";
import dayjs from "dayjs";

export const formattedTimeStamp = (d = new Date()) => {
  return dayjs(d).format(DATEFORMATS.DAYJS_DATETIME);
};

export const formattedDate = (d, emptyOnUndefined = false) => {
  if (emptyOnUndefined && (d === undefined || d === null || d === "null")) {
    return;
  }
  return dayjs(d || new Date().getTime()).format(DATEFORMATS.DAYJS_DATE);
};

/*
 * Returns UTC date object from given local timestamp
 * If not passed returns ready to send UTC timestamp
 */
export const local2utc = (localTimeStamp?) => {
  const dateInLocal = !localTimeStamp ? new Date() : new Date(localTimeStamp);
  return new Date(dateInLocal.getTime() + dateInLocal.getTimezoneOffset() * 60 * 1000);
};

/*
 * Returns Local date object from given UTC timestamp typically comes from server side
 */
export const utc2local = (utcTimeStamp?) => {
  const dateInUtc = !utcTimeStamp ? local2utc() : new Date(utcTimeStamp);
  return new Date(dateInUtc.getTime() - dateInUtc.getTimezoneOffset() * 60 * 1000);
};

export const typeList = (type) => {
  if (type === "D") {
    return [TYPE_OPTIONS.DRY];
  } else if (type === "P") {
    return [TYPE_OPTIONS.WET];
  }
  return [TYPE_OPTIONS.DRY, TYPE_OPTIONS.WET];
};

export const compiledMessage = (templateString: string, templateVariables) =>
  templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g]);

export const nonZeroFalsy = (num) => (num || num === 0 ? num : "");

export const isEverythingFilledExcept = (exceptionKey, values) => {
  for (const [key, value] of Object.entries(values)) {
    if (key !== exceptionKey && !value) {
      return false;
    }
  }
  return true;
};

export const flatten = (data: any[] = []) => {
  return data.reduce((acc, cv) => {
    const { children, ...ob } = cv;
    const processedO = (children && flatten(children)) || [];
    return [...acc, ...processedO, { value: ob.name, label: ob.name, color: ob.color }];
  }, []);
};

export const booleanOrText = (v, parseDate?) =>
  typeof v === "boolean"
    ? v
      ? "Yes"
      : "No"
    : parseDate && typeof v === "number"
    ? formattedDate(utc2local(v))
    : v;

/**
 * Works similar to loadash's `_.get` to retrive value from nested objects
 * getByPath(input,path)
 * path input.0.name
 * input [{name:"text"}]
 * output "text"
 * @param {*} obj
 * @param {*} path
 * @returns
 */
export const getByPath = (obj, path) => {
  path.split(".").forEach(function (level) {
    if (!obj) {
      return;
    }
    obj = obj[level];
  });

  return obj;
};

export const getCoords = async () => {
  try {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return [pos.coords.latitude, pos.coords.longitude].join(",");
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const toKey = (s = "") => s.split(" ").join("_").toUpperCase();

export const generatePassword = (passwordLength) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordArray = Array.from(
    { length: passwordLength },
    () => characters[Math.floor(Math.random() * characters.length)]
  );
  const newPassword = passwordArray.join("");

  return newPassword;
};
