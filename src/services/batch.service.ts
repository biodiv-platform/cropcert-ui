import { ENDPOINT } from "@static/constants";
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

export const axListBatch = async (coCodes, params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/batch/all/coCodes?coCode=${coCodes}`, {
      params,
    });
    return {
      success: true,
      data,
    };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axListAggregationBatch = async (coCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/batch/aggregation/all?coCode=${coCodes}`,
      {
        params,
      }
    );
    return {
      success: true,
      data,
    };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axBatchFilterAutoCompleteSearch = async (key, value, coCodes, model) => {
  try {
    // Format coCodes as a comma-separated string if it's an array
    const coCodesParam = Array.isArray(coCodes) ? coCodes.join(",") : coCodes;

    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/global/document/autocomplete`, {
      params: { key, value, coCodes: coCodesParam, model },
    });
    return data;
  } catch (e) {
    notification(e.response.data.message);
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
