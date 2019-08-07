import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axGetCoById = async coId => {
  try {
    const res = await http.get(`${ENDPOINT.USER}/co/coCode?coCode=${coId}`);
    return res.data;
  } catch (e) {
    notification(MESSAGE.ERROR);
    return {};
  }
};
