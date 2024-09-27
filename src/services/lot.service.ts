import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http, { plainHttp } from "@utils/http";
import notification from "@utils/notification";

export const axListLot = async (coCodes, params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/lot/all/coCodes?coCodes=${coCodes}`, {
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

export const axListAggregationLot = async (coCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/lot/aggregation/all?coCodes=${coCodes}`,
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

export const axLotFilterAutoCompleteSearch = async (key, value, coCodes, model) => {
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

export const axUpdateLot = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/lot/${payload.id}`, payload);
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
    const { data } = await http.post(`${ENDPOINT.TRACEABILITY}/lot/new`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axListBatchByLotId = async (lotId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/lot/batches`, {
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
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/lot/show/${lotId}`, {
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
