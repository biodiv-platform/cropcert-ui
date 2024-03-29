import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";
import { nanoid } from "nanoid";

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

export const axUploadInspectionReport = async (body) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CERTIFICATION}/inspection`, body);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

/**
 * This function will convert `base64` to `blob`, append it to `FormData`
 * and upload it to server response will contain image URL
 *
 * @param {string} base64
 * @returns
 */
export const axUploadSignature = async (base64: string) => {
  if (!base64) return;

  const r = await fetch(base64);
  const image = await r.blob();
  const imageName = `sig-${new Date().getTime()}.png`;
  const formData = new FormData();
  formData.append("upload", image, imageName);
  formData.append("hash", nanoid());
  formData.append("directory", "signature");

  const { data } = await http.post(`${ENDPOINT.FILES}/upload/resource-upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.uri;
};
