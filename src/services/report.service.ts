import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axGetFactoryReportById = async (factoryReportId = -1) => {
  if (factoryReportId > 0) {
    try {
      const res = await http.get(`${ENDPOINT.TRACEABILITY}/factoryReport/${factoryReportId}`);
      return { success: true, data: res.data };
    } catch (e) {
      notification(e.message);
      return { success: false, data: {} };
    }
  } else {
    return { success: true, data: {} };
  }
};

export const axGetFactoryReportByLotId = async (lotId) => {
  if (lotId > 0) {
    try {
      const res = await http.get(`${ENDPOINT.TRACEABILITY}/factoryReport/lot/${lotId}`);
      return { success: true, data: res.data };
    } catch (e) {
      notification(e.message);
      return { success: false, data: {} };
    }
  } else {
    return { success: true, data: {} };
  }
};

export const axCreateGreenReport = async (body) => {
  try {
    const http1 = body.id > 0 ? http.put : http.post;
    const { data } = await http1(`${ENDPOINT.TRACEABILITY}/report`, body);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetGreenReportById = async (reportId = -1) => {
  if (reportId > 0) {
    try {
      const res = await http.get(`${ENDPOINT.TRACEABILITY}/report/${reportId}`);
      return { success: true, data: res.data };
    } catch (e) {
      notification(e.message);
      return { success: false, data: {} };
    }
  } else {
    return { success: true, data: {} };
  }
};

export const axGetCuppingReportsByLotId = async (lotId) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/cupping/lot/${lotId}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axCreateFactoryReport = async (body) => {
  try {
    const http1 = body.id > 0 ? http.put : http.post;
    const { data } = await http1(`${ENDPOINT.TRACEABILITY}/factoryReport`, body);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axCreateCuppingReport = async (body) => {
  try {
    const http1 = body.id > 0 ? http.put : http.post;
    const { data } = await http1(`${ENDPOINT.TRACEABILITY}/cupping`, body);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetCuppingReportById = async (reportId) => {
  if (reportId > 0) {
    try {
      const res = await http.get(`${ENDPOINT.TRACEABILITY}/cupping/${reportId}`);
      return { success: true, data: res.data };
    } catch (e) {
      notification(e.message);
      return { success: false, data: {} };
    }
  } else {
    return { success: true, data: {} };
  }
};

export const axCreateInspectionReport = async (body) => {
  try {
    const body1 = { ...body, date: new Date().getTime(), farmerId: 311, inspectorId: 1 };
    const { data } = await http.post(`${ENDPOINT.CERTIFICATION}/inspection`, body1);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};
