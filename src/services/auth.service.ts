import { ENDPOINT } from "@static/constants";
import http, { plainHttp } from "@utils/http";
import notification from "@utils/notification";
import { stringify } from "@utils/query-string";
import axios from "axios";

/**
 * Acquires initial tokens against provided credentials
 *
 * @param {userName: string, password: string} body
 * @returns {*}
 */
export const axLogin = async (body) => {
  const res = await axios.post(`${ENDPOINT.USER}/v1/authenticate/login`, stringify(body));
  return res.data;
};

export const axCreateUser = async (payload) => {
  try {
    const { data } = await axios.post(`${ENDPOINT.USERGROUP}/v1/group/register`, payload);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    notification(e?.response?.data?.message);
    return { success: false, data: {} };
  }
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

export const axUserSearch = async (name) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.USER}/v1/user/autocomplete`, {
      params: { name },
    });
    return { success: true, data: data.map((o) => ({ ...o, display: o.name })) };
  } catch (e) {
    console.error(e);
    notification(e?.response?.data?.message);
    return { success: false, data: [] };
  }
};

export const axRegenerateOTP = async (payload) => {
  try {
    const { data } = await axios.post(
      `${ENDPOINT.USER}/v1/authenticate/regenerate-otp`,
      stringify(payload)
    );
    return { success: data.status, data: `otp.messages.${data.message}` };
  } catch (e) {
    console.error(e);
    return { success: false, data: "otp.messages.could_not_send_mail_sms" };
  }
};

export const axValidateUser = async (payload) => {
  try {
    const { data } = await axios.post(`${ENDPOINT.USER}/v1/group/verify-user`, stringify(payload));
    return { success: data.status, data, message: `otp.messages.${data.message}` };
  } catch (e) {
    console.error(e);
    return { success: false, data: {}, message: "otp.messages.error" };
  }
};

export const axForgotPassword = async (payload) => {
  try {
    const { data } = await axios.post(
      `${ENDPOINT.USER}/v1/authenticate/forgot-password`,
      stringify(payload)
    );
    return { success: data.status, data: `otp.messages.${data.message}`, user: data.user || {} };
  } catch (e) {
    console.error(e);
    return { success: false, data: "otp.messages.could_not_send_mail_sms", user: {} };
  }
};

export const axResetPassword = async (payload) => {
  try {
    const { data } = await axios.post(
      `${ENDPOINT.USER}/v1/authenticate/reset-password`,
      stringify(payload)
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    notification(e?.response?.data?.message);
    return { success: false, data: {} };
  }
};
