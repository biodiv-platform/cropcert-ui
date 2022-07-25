import { ENDPOINT } from "@static/constants";
import http, { plainHttp } from "@utils/http";
import notification from "@utils/notification.util";

export const axCoByUnionId = async (unionCode) => {
  try {
    const res = await plainHttp.get(`${ENDPOINT.ENTITIES}/co/union`, {
      params: { unionCode },
    });
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: true, data: [] };
  }
};

export const axGetCoByCode = async (id) => {
  try {
    const res = await http.get(`${ENDPOINT.ENTITIES}/co/code/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};
