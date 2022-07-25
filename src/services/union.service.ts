import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";
import notification from "@utils/notification.util";

export const axListUnion = async () => {
  try {
    const res = await plainHttp.get(`${ENDPOINT.ENTITIES}/union/all`);
    const data: any[] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};
