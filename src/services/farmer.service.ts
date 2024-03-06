import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axListFarmerProduce = async (ccCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmerProduce/all`, {
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

export const axListFarmerMember = async (ccCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmer/all`, {
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

export const axGetFarmerById = async (farmerId, ctx?) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmer/${farmerId}`, {
      params: { ctx },
    });
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

// get farmer information for show page.
export const axGetFarmerByIdWithBatchAndFarmerProduce = async (farmerId, ctx?) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmer/show/${farmerId}`, {
      params: { ctx },
    });
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

export const axGetAllFarmerByUnion = async (unionCode) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmer/allByUnion`, {
      params: { unionCode: unionCode.toString() },
    });
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

export const axUpdateFarmerById = async (farmerId, payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.TRACEABILITY}/farmer/${farmerId}`, payload);
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

export const axDeleteFarmerById = async (farmerId) => {
  try {
    const { data } = await http.delete(`${ENDPOINT.TRACEABILITY}/farmer/${farmerId}`);
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

export const axSyncFMDataOnDemand = async () => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmer/fetchFarmerMemberFromODKApiOnDemand`
    );
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};

export const axSyncFPDataOnDemand = async () => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmerProduce/fetchFarmerProduceFromODKApiOnDemand`
    );
    return { success: true, data };
  } catch (e) {
    notification(e);
    return { success: false, data: {} };
  }
};
