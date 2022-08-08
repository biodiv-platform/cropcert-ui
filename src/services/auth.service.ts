import { ENDPOINT } from "@static/constants";
import http, { httpFormData } from "@utils/http";
import queryString from "query-string";

/**
 * Acquires initial tokens against provided credentials
 *
 * @param {userName: string, password: string} body
 * @returns {*}
 */
export const axSignIn = async (body) => {
  const res = await httpFormData.post(
    `${ENDPOINT.USER}/v1/authenticate/login`,
    queryString.stringify(body)
  );
  return res.data;
};

export const axGetUser = async () => {
  try {
    const res = await http.get(`${ENDPOINT.ENTITIES}/user/me`);
    const { user, ...data } = res.data;
    return { ...user, ...data };
  } catch (e) {
    console.error(e);
    return {};
  }
};
