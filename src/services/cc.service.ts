import { ENDPOINT } from "@static/constants";
import { GENERIC } from "@static/messages";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axListCCByCoId = async coCode => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/cc/coCode/${coCode}`);
    const data: any[] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(GENERIC.ERROR);
    return { success: false, data: [] };
  }
};

export const axGetCCById = async id => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/cc/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(GENERIC.ERROR);
    return { success: false, data: {} };
  }
};
