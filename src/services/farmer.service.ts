import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axListFarmerProduce = async (ccCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmerProduce/all?ccCodes=${ccCodes}`,
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

export const axListAggregationFarmerProduce = async (ccCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmerProduce/aggregation/all?ccCodes=${ccCodes}`,
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

export const axListFarmerMember = async (ccCodes, params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmer/all?ccCodes=${ccCodes}`, {
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

export const axListAggregationFarmerMember = async (ccCodes, params) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmer/aggregation/all?ccCodes=${ccCodes}`,
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

export const axDocumentAutoCompleteSearch = async (key, value, ccCodes, model) => {
  try {
    // Format ccCodes as a comma-separated string if it's an array
    const ccCodesParam = Array.isArray(ccCodes) ? ccCodes.join(",") : ccCodes;

    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/global/document/autocomplete`, {
      params: { key, value, ccCodes: ccCodesParam, model },
    });
    return data;
  } catch (e) {
    notification(e.response.data.message);
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

export const axGetFarmerDetailsByUUID = async (uuid) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY}/farmer/uuid/${uuid}`);
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

// get farmer produce information for show page.
export const axGetFarmerProduceDetailsById = async (farmerProduceId, ctx?) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmerProduce/show/${farmerProduceId}`,
      {
        params: { ctx },
      }
    );
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
    const backendMsg = e?.response?.data?.message;
    const backendCode = e?.response?.status;
    notification(
      backendMsg ? `Error: ${backendMsg}${backendCode ? ` (Code: ${backendCode})` : ""}` : e.message
    );
    return { success: false, data: {} };
  }
};

export const axDeleteFarmerById = async (farmerId) => {
  try {
    const { data } = await http.delete(`${ENDPOINT.TRACEABILITY}/farmer/${farmerId}`);
    return { success: true, data };
  } catch (e) {
    const backendMsg = e?.response?.data?.message;
    const backendCode = e?.response?.status;
    notification(
      backendMsg ? `Error: ${backendMsg}${backendCode ? ` (Code: ${backendCode})` : ""}` : e.message
    );
    return { success: false, data: {} };
  }
};

export const axSyncFMDataOnDemand = async (key) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmer/fetchFarmerMemberFromODKApiOnDemand?key=${key}`
    );
    return { success: true, data };
  } catch (e) {
    const backendMsg = e?.response?.data?.message;
    const backendCode = e?.response?.status;
    notification(
      backendMsg ? `Error: ${backendMsg}${backendCode ? ` (Code: ${backendCode})` : ""}` : e.message
    );
    return { success: false, data: {} };
  }
};

export const axSyncFPDataOnDemand = async (key) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.TRACEABILITY}/farmerProduce/fetchFarmerProduceFromODKApiOnDemand?key=${key}`
    );
    return { success: true, data };
  } catch (e) {
    const backendMsg = e?.response?.data?.message;
    const backendCode = e?.response?.status;
    notification(
      backendMsg ? `Error: ${backendMsg}${backendCode ? ` (Code: ${backendCode})` : ""}` : e.message
    );
    return { success: false, data: {} };
  }
};
