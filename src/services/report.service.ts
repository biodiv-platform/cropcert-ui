import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axCreateGreenReport = async body => {
  try {
    const http1 = body.id > 0 ? http.put : http.post;
    const res = await http1(`${ENDPOINT.TRACEABILITY}/report`, body);
    return { success: true, id: res.data.id };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};

export const axGetGreenReportById = async reportId => {
  if (reportId > 0) {
    try {
      const res = await http.get(`${ENDPOINT.TRACEABILITY}/report/${reportId}`);
      return { success: true, data: res.data };
    } catch (e) {
      notification(MESSAGE.ERROR);
      return { success: false, data: {} };
    }
  } else {
    return { success: true, data: {} };
  }
};

export const axGetCuppingReportsByLotId = async lotId => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/cupping/lot/${lotId}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: false, data: {} };
  }
};

export const axCreateCuppingReport = async body => {
  try {
    const http1 = body.id > 0 ? http.put : http.post;
    const res = await http1(`${ENDPOINT.TRACEABILITY}/cupping`, body);
    return { success: true, id: res.data.id };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};

export const axGetCuppingReportById = async reportId => {
  if (reportId > 0) {
    try {
      const res = await http.get(
        `${ENDPOINT.TRACEABILITY}/cupping/${reportId}`
      );
      return { success: true, data: res.data };
    } catch (e) {
      notification(MESSAGE.ERROR);
      return { success: false, data: {} };
    }
  } else {
    return { success: true, data: {} };
  }
};
