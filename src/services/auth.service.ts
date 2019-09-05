import { ENDPOINT } from "@utils/constants";
import http, { httpFormData } from "@utils/http";
import queryString from "query-string";

/**
 * Acquires initial tokens against provided credentials
 *
 * @param {userName: string, password: string} body
 * @returns {*}
 */
export const axSignIn = async body => {
  const res = await httpFormData.post(
    `${ENDPOINT.USER}/auth/login`,
    queryString.stringify(body)
  );
  return res.data;
};

export const axGetUser = async () => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/user/me`);
    const { user, ...data } = res.data;
    return { ...user, ...data };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const axPingAll = async (url = "ping") => {
  try {
    const ts = { t: new Date().getTime() };
    await http.get(`${ENDPOINT.PAGES}/${url}`, { params: ts });
    await http.get(`${ENDPOINT.TRACEABILITY}/${url}`, { params: ts });
    await http.get(`${ENDPOINT.USER}/${url}`, { params: ts });
  } catch (e) {
    console.error(e);
  }
};
