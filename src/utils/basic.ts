import { DATEFORMATS, TYPE_OPTIONS } from "@static/constants";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

export const formattedTimeStamp = (d = new Date()) => {
  return dayjs(d).format(DATEFORMATS.DAYJS_DATETIME);
};

export const formattedDate = (d, emptyOnUndefined = false) => {
  if (emptyOnUndefined && (d === undefined || d === null || d === "null")) {
    return;
  }
  return dayjs(d || new Date().getTime()).format(DATEFORMATS.DAYJS_DATE);
};

// Utility to get current timestamp in YYYYMMDD_HHmmss format
export function getCurrentTimestamp() {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(
    now.getHours()
  )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

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
  } else if (type === "F") {
    return [TYPE_OPTIONS.FAQ];
  }
  return [TYPE_OPTIONS.DRY, TYPE_OPTIONS.WET, TYPE_OPTIONS.FAQ];
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

/**
 * Safely retrieves a value from a nested object using a dot-separated path.
 * @param {Object} obj - The object to query.
 * @param {string} path - The dot-separated path to the desired value.
 * @param {any} [defaultValue] - The value to return if the path does not exist.
 * @returns {any} - The value at the specified path or the default value.
 */
export const getNestedValue = (obj, path, defaultValue) => {
  return (
    path
      .split(".")
      .reduce((acc, level) => (acc && acc[level] !== undefined ? acc[level] : undefined), obj) ??
    defaultValue
  ); // Return the defaultValue if the path is undefined
};

export const normalizeFileName = (s) => `${nanoid()}_${s.replace(/([^a-z0-9\.\s]+)/gi, "-")}`;

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

// capitalize first letter of string
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const generatePassword = (passwordLength) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordArray = Array.from(
    { length: passwordLength },
    () => characters[Math.floor(Math.random() * characters.length)]
  );
  const newPassword = passwordArray.join("");

  return newPassword;
};

export const generateBackBtnStr = (previousPath: string, defaultPath: string) => {
  let backButtonText = "Back to List";

  switch (true) {
    case previousPath.includes("/traceability/lot"):
      backButtonText = "Back to Lot List";
      break;
    case previousPath.includes("/traceability/batch"):
      backButtonText = "Back to Batch List";
      break;
    case previousPath.includes("/traceability/farmer-produce"):
      backButtonText = "Back to Produce List";
      break;
    case previousPath.includes("/farmer/list"):
      backButtonText = "Back to Farmer List";
      break;
    case previousPath.includes("/farmer/show"):
      backButtonText = "Go Back";
      break;
    case previousPath.includes("/farmer-produce/show"):
      backButtonText = "Go Back";
      break;
    case previousPath.includes("/batch/show"):
      backButtonText = "Go Back";
      break;
    case previousPath.includes("/lot/show"):
      backButtonText = "Go Back";
      break;
    default:
      backButtonText = defaultPath;
  }

  return {
    backButtonText,
    backLink: previousPath ?? "/",
  };
};
