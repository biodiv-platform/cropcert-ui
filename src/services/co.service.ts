import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axCoByUnionId = async unionCode => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/co/union`, {
      params: { unionCode }
    });
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: true, data: [] };
  }
};

export const axGetCoById = async id => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/co/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};
