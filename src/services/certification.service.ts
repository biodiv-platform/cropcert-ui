import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axGetFarmersWithLastReportByCC = async (ccCode) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CERTIFICATION}/inspection/all/ccCode`, {
      params: { ccCode },
    });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};
