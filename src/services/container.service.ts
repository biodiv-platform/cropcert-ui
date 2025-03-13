import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axListContainer = async (coCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/container/all/coCodes?coCode=${coCodes}`,
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

export const axListAggregationContainer = async (coCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/container/aggregation/all?coCode=${coCodes}`,
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

export const axCreateContainer = async (body) => {
  try {
    const res = await http.post(`${ENDPOINT.TRACEABILITY}/container/new`, body);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axUpdateContainer = async (payload) => {
  try {
    const res = await http.put(`${ENDPOINT.TRACEABILITY}/container/${payload.id}`, payload);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axListLotByContainerId = async (containerId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/container/lots`, {
      params: { containerId },
    });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axGetContainerById = async (lotId, ctx?) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/container/show/${lotId}`, {
      params: { ctx },
    });
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};
