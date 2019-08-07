import { CAS_LOGOUT_URL, ENDPOINT } from "@utils/constants";
import http from "@utils/http";

export const axGetUser = async () => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/me`);
    return res.data;
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

export const axSignOut = async () => {
  try {
    const res = await http.get(`${CAS_LOGOUT_URL}`);
    await http.get(`${ENDPOINT.PAGES}/logout`);
    await http.get(`${ENDPOINT.TRACEABILITY}/logout`);
    await http.get(`${ENDPOINT.USER}/logout`);
    return res.data;
  } catch (e) {
    console.error(e);
    return {};
  }
};
