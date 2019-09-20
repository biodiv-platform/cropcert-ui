import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axGetCoById = async coId => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/co/code/${coId}`);
    return res.data;
  } catch (e) {
    notification(MESSAGE.ERROR);
    return {};
  }
};

export const axCoByUnionId = async unionCode => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/co/union`, {
      params: { unionCode },
    });
    return { success: true, data: res.data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: true, data: [] };
  }
};
