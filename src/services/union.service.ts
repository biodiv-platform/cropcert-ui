import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axListUnion = async () => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/union/all`);
    const data: any[] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};
