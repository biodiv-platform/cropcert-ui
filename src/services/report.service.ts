import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axCreateGreenReport = async body => {
  try {
    const res = await http.post(`${ENDPOINT.TRACEABILITY}/report`, body);
    return { success: true, id: res.data.id };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};

export const axCreateCuppingReport = async body => {
  try {
    const res = await http.post(`${ENDPOINT.TRACEABILITY}/cupping`, body);
    return { success: true, id: res.data.id };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};
