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
