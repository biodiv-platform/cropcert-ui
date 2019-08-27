import { hasAccess } from "@utils/auth.util";
import { ENDPOINT, MESSAGE, ROLES } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";
import { getUserKey } from "@utils/user.util";

export const axListCC = async () => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/cc/all`);
    const data: [any] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: false, data: [] };
  }
};

export const axGetCCById = async id => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/cc/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: false, data: {} };
  }
};

export const axListCCAccessible = async () => {
  const endpoint = hasAccess([ROLES.COOPERATIVE])
    ? `cc/coCode/${getUserKey("coCode")}`
    : `cc/${getUserKey("ccCode")}`;
  try {
    const res = await http.get(`${ENDPOINT.USER}/${endpoint}`);
    return Array.isArray(res.data) ? res.data : [res.data];
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};
