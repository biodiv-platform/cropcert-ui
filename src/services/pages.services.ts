import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axListPages = async () => {
  try {
    const res = await http.get(`${ENDPOINT.PAGES}/page/all`, {
      headers: { unauthorized: true },
    });
    return res.data;
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};

export const axGetPageByPageId = async id => {
  try {
    const res = await http.get(`${ENDPOINT.PAGES}/page/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: false, data: {} };
  }
};

export const axUpdatePage = async (body, mode) => {
  try {
    const pHttp = mode === "create" ? http.post : http.put;
    const res = await pHttp(`${ENDPOINT.PAGES}/page`, body);
    return { success: true, id: res.data.title };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};
