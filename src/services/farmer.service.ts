import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axListFarmer = async (ccCodes, offset = 0, limit = PAGINATION_LIMIT) => {
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
