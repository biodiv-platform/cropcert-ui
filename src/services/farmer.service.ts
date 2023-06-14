import { ENDPOINT, PAGINATION_LIMIT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

export const axListFarmer = async (ccCodes, offset = 0, limit = PAGINATION_LIMIT) => {
  try {
    const { data } = await http.get(`${ENDPOINT.TRACEABILITY_MERN}/farmerProduce/all`, {
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
