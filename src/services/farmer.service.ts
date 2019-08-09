import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axGetFarmersByCCId = async ccId => {
  try {
    const res = await http.get(
      `${ENDPOINT.USER}/farmer/collection?ccCode=${ccId}`
    );
    const data: [any] = res.data;
    return { success: true, data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: false, data: [] };
  }
};
