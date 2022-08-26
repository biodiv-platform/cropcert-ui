import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import { stringify } from "@utils/query-string";
import axios from "axios";

/**
 * Acquires initial tokens against provided credentials
 *
 * @param {userName: string, password: string} body
 * @returns {*}
 */
export const axSignIn = async (body) => {
  const res = await axios.post(`${ENDPOINT.USER}/v1/authenticate/login`, stringify(body));
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
