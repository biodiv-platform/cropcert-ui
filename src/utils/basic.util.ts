import dayjs from "dayjs";
import { navigate } from "gatsby";
import queryString from "query-string";

import { DATEFORMATS } from "./constants";

/**
 * Immutably updates row into Array
 *
 * @param {any[]} array
 * @param {string} key
 * @param {*} row
 * @returns {any[]}
 */
export const updateArrayImmutable = (
  array: any[],
  key: string,
  row: any
): any[] => {
  const index = array.findIndex(o => o[key] === row[key]);
  return index > -1
    ? [...array.slice(0, index), row, ...array.slice(index + 1)]
    : [...array, row];
};

export const getToday = () => {
  return dayjs().format(DATEFORMATS.DAYJS_DATE);
};

export const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

export const elipsis = (txt, max = 20, add = "...") => {
  if (!txt) {
    return txt;
  }
  return txt.length > max ? txt.substring(0, max).trim() + add : txt;
};

export const formattedTimeStamp = (d = new Date()) => {
  return dayjs(d).format(DATEFORMATS.DAYJS_DATETIME);
};

export const formattedDate = (d = new Date().getTime()) => {
  return dayjs(d).format(DATEFORMATS.DAYJS_DATE);
};

/*
 * Returns UTC date object from given local timestamp
 * If not passed returns ready to send UTC timestamp
 */
export const local2utc = (localTimeStamp?) => {
  const dateInLocal = !localTimeStamp ? new Date() : new Date(localTimeStamp);
  return new Date(
    dateInLocal.getTime() + dateInLocal.getTimezoneOffset() * 60 * 1000
  );
};

/*
 * Returns Local date object from given UTC timestamp typically comes from server side
 */
export const utc2local = (utcTimeStamp?) => {
  const dateInUtc = !utcTimeStamp ? local2utc() : new Date(utcTimeStamp);
  return new Date(
    dateInUtc.getTime() - dateInUtc.getTimezoneOffset() * 60 * 1000
  );
};

export const messageRedirect = data => {
  if (data.success) {
    navigate(`/message?${queryString.stringify(data)}`);
  }
};

export const flatten = (data: any[] = []) => {
  return data.reduce((acc, cv) => {
    const { children, ...ob } = cv;
    const processedO = (children && flatten(children)) || [];
    return [
      ...acc,
      ...processedO,
      { value: ob.name, label: ob.name, color: ob.color },
    ];
  }, []);
};

export const nonZeroFalsy = num => (num || num === 0 ? num : "");
