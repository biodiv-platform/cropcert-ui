import { DATEFORMATS, TYPE_OPTIONS } from "@static/constants";
import dayjs from "dayjs";
import queryString from "query-string";

export const getToday = () => {
  return dayjs().format(DATEFORMATS.DAYJS_DATE);
};

export const formattedTimeStamp = (d = new Date()) => {
  return dayjs(d).format(DATEFORMATS.DAYJS_DATETIME);
};

export const formattedDate = (d, emptyOnUndefined = false) => {
  if (emptyOnUndefined && d === undefined) {
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

export const redirect = (data, router) => {
  data.success && router.push(`/message?${queryString.stringify(data)}`);
};

export const typeList = (type) => {
  if (type === "D") {
    return [TYPE_OPTIONS.DRY];
  } else if (type === "P") {
    return [TYPE_OPTIONS.WET];
  }
  return [TYPE_OPTIONS.DRY, TYPE_OPTIONS.WET];
};

/**
 * Mutably updates object by key does immutably with `easy-peasy` because it uses "immer" internally
 *
 * @param {any[]} a
 * @param {*} o
 * @param {string} [k="id"]
 * @returns {any[]}
 */
export const updateArrayByObjectKey = (a: any[], o: any, k: string = "id"): any[] => {
  const i = a.findIndex((ao) => ao[k] === o[k]);
  a[i] = o;
  return a;
};

export const compiledMessage = (templateString: string, templateVariables) =>
  templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g]);

export const nonZeroFalsy = (num) => (num || num === 0 ? num : "");

export const isEverythingFilledExcept = (exceptionKey, values) => {
  for (let [key, value] of Object.entries(values)) {
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
