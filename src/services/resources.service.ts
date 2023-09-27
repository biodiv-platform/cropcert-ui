import { ENDPOINT } from "@static/constants";
import { fetchWithCache } from "@utils/cached-fetch";
import http, { plainHttp } from "@utils/http";

export const axGetLicenseList = async () => {
  try {
    const data = await fetchWithCache(`${ENDPOINT.RESOURCES}/v1/license/all`);
    return {
      success: true,
      data: data.map((o) => ({ label: o.name, value: o.id.toString(), url: o.url })),
    };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axGetResourceByID = async (resourceID, format?) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.RESOURCES}/v1/resource/show/${resourceID}`, {
      params: { format },
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axDeleteResourceByID = async (resourceID) => {
  try {
    const { data } = await http.delete(`${ENDPOINT.RESOURCES}/v1/resource/show/${resourceID}`);
    return { success: true, data };
  } catch (e) {
    console.error(e.response.data.message);
    return { success: false, data: {} };
  }
};
