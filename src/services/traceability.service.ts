import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification";

// get  modal columns by Batch or Lot
export const axGetColumns = async (fieldsOf) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/modalFields/all/${fieldsOf}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

// get last synced time for farmer member and produce from product collection

export const axGetLastSyncedTimeFM = async (key) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/product/lastSyncedTimeFM?key=${key}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetLastSyncedTimeFP = async (key) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/product/lastSyncedTimeFP?key=${key}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetGlobalCount = async (union) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/global/count?union=${union}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};
