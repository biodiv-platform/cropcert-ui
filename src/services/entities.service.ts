import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axListUnion = async () => {
  try {
    const res = await http.get(`${ENDPOINT.ENTITIES}/user/union/all`);
    const data: any[] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axCoByUnionId = async (unionCodes) => {
  try {
    const res = await http.get(`${ENDPOINT.ENTITIES}/user/union`, {
      params: { unionCodes },
    });
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: true, data: [] };
  }
};
