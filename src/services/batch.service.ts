import { ENDPOINT, MESSAGE, PAGINATION_LIMIT } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

const getEndpoint = type => {
  return type === "WET" ? "wetbatch" : "batch";
};

export const isRowDisabled = o => {
  return o.type === "DRY" ||
    (o.startTime &&
      o.fermentationEndTime &&
      o.dryingEndTime &&
      o.perchmentQuantity > 0)
    ? false
    : true;
};

export const axCreateBatch = async ({ type, ...body }) => {
  try {
    const res = await http.post(
      `${ENDPOINT.TRACEABILITY}/${getEndpoint(type)}`,
      body
    );
    return { success: true, id: res.data.batchName };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false };
  }
};

export const axLazyListBatch = async (type, params) => {
  try {
    const res = await http.get(
      `${ENDPOINT.TRACEABILITY}/${getEndpoint(type)}/cc`,
      {
        params: { limit: PAGINATION_LIMIT, ...params },
      }
    );
    const data: any[] = res.data
      .filter(o => o.type === type)
      .map(o => ({
        ...o,
        disabled: isRowDisabled(o),
      }));
    return {
      success: true,
      offset: params.offset + PAGINATION_LIMIT,
      lazyListHasMore:
        res.data.length === 0 || res.data.length < PAGINATION_LIMIT
          ? false
          : true,
      data,
    };
  } catch (e) {
    notification(e);
    return {
      success: false,
      offset: params.offset,
      lazyListHasMore: false,
      data: [],
    };
  }
};

export const axUpdateWetBatch = async (keyName, body) => {
  try {
    const r = await http.put(
      `${ENDPOINT.TRACEABILITY}/wetbatch/${keyName}`,
      body
    );
    notification(MESSAGE.SUCCESS, "success");
    return { success: true, body: r.data };
  } catch (e) {
    notification(e);
    return { success: false, body: {} };
  }
};

export const axFinalizeWetBatch = async body => {
  try {
    await http.put(`${ENDPOINT.TRACEABILITY}/wetbatch/readyForLot`, body);
    return { success: true };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false };
  }
};
