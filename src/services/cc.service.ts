import { ENDPOINT } from "@static/constants";
import { GENERIC } from "@static/messages";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axListCCByCoId = async (coCode) => {
  if (!coCode) {
    return { success: false, data: [] };
  }

  try {
    const res = await http.get(`${ENDPOINT.USER}/cc/coCode/${coCode}`);
    const data: any[] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(GENERIC.ERROR);
    return { success: false, data: [] };
  }
};

export const axGetCCByCode = async (id) => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/cc/code/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(GENERIC.ERROR);
    return { success: false, data: {} };
  }
};

export const axListCC = async () => {
  try {
    const { data } = await http.get(`${ENDPOINT.USER}/cc/all`, { headers: { unauthorized: true } });
    return { success: true, data };
  } catch (e) {
    notification(GENERIC.ERROR);
    return { success: false, data: [] };
  }
};
