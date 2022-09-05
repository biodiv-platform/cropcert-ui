import { plainHttp } from "@utils/http";

export const axGetOpenGraphMeta = async (url) => {
  try {
    const { data } = await plainHttp.get(`/api/meta`, { params: { url } });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};
