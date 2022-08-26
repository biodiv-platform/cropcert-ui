import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";

export const axGetLandscapeList = async (params) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.LANDSCAPE}/landscape/all`, {
      params,
    });
    return { success: true, data };
  } catch (e) {
    return { success: false, data: [] };
  }
};
