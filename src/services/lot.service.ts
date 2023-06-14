import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http, { plainHttp } from "@utils/http";
import notification from "@utils/notification";

export const axListLot = async (coCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY_MERN}/lot/all/coCodes`, {
      params: { coCodes: coCodes.toString(), offset, limit },
    });

    return {
      success: true,
      data: res.data,
      offset: offset + res.data.length,
      reset: offset === 0,
      hasMore: res.data.length === limit,
    };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axUpdateLot = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY_MERN}/lot/${payload.id}`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axListMarketingLot = async (coCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const res = await plainHttp.get(`${ENDPOINT.TRACEABILITY}/lot/all/marketing`, {
      params: { coCodes: coCodes.toString(), offset, limit },
    });
    return {
      success: true,
      data: res.data,
      offset: offset + res.data.length,
      hasMore: res.data.length === limit,
    };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axCreateLot = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.TRACEABILITY_MERN}/lot/new`, payload);
    // const { data } = await http.post(`http://localhost:5500/lotinfo`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axListBatchByLotId = async (lotId) => {
  try {
    console.log("lotId from api call", lotId);
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY_MERN}/lot/batches`, {
      params: { lotId },
    });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axDispatchLotCoOperative = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/lot/updateCoopAction`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axDispatchLotFactory = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/lot/updateMillingAction`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axOriginByLotId = async (id) => {
  try {
    const res1 = await http.get(`${ENDPOINT.TRACEABILITY}/lot/origin`, {
      params: { lotId: id },
    });
    const res2 = await http.get(`${ENDPOINT.ENTITIES}/cc/origin`, {
      params: {
        ccCodes: res1.data.toString(),
      },
    });
    return { success: true, data: res2.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axUpdateGRN = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/lot/grnNumber`, payload);
    return { success: true, data };
  } catch (e) {
    return { success: false, data: e.response.data.error || e.message };
  }
};

export const axGetLotById = async (lotId, ctx?) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY_MERN}/lot/${lotId}`, {
      params: { ctx },
    });
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

export const axListAllReports = async (coCodes) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CERTIFICATION}/inspection/all/coCode`, {
      params: { coCode: coCodes.toString() },
    });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};
