import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axCreateBatch = async (body) => {
  try {
    const res = await http.post(`${ENDPOINT.TRACEABILITY}/batch`, body);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axListBatch = async (ccCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/batch/all/cc`, {
      params: { ccCodes: ccCodes.toString(), offset, limit },
    });
    return {
      success: true,
      data,
      offset: offset + data.length,
      reset: offset === 0,
      hasMore: data.length === limit,
    };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axUpdateBatch = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/batch/wetBatch`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false };
  }
};
