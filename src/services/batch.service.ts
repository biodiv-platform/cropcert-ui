import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axCreateBatch = async (body) => {
  try {
    const res = await http.post(`${ENDPOINT.TRACEABILITY}/batch/new`, body);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axListBatch = async (coCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/batch/all/cc`, {
      params: { coCodes: coCodes.toString(), offset, limit },
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

export const axListFarmerProduceByBatchId = async (batchId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/batch/${batchId}/farmerProduce`);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axUpdateBatch = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/batch/${payload.id}`, payload); //TODO:check if we want to keep this route
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false };
  }
};
