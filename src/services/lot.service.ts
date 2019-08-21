import { hasAccess } from "@utils/auth.util";
import {
  ENDPOINT,
  LOT_AT,
  MESSAGE,
  PAGINATION_LIMIT,
  ROLES,
} from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";
import { getUserKey } from "@utils/user.util";

export const axCreateLotFromBatches = async body => {
  try {
    await http.post(`${ENDPOINT.TRACEABILITY}/lotCreation`, body);
    return { success: true, id: body.lotName };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false };
  }
};

export const axLotByLotId = async id => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/lot/${id}`);
    const data: [any] = res.data;
    return { success: true, data };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false, data: {} };
  }
};

export const axOriginByLotId = async id => {
  try {
    const res1 = await http.get(
      `${ENDPOINT.TRACEABILITY}/lotCreation/lot/origin`,
      { params: { lotId: id } }
    );
    const res2 = await http.get(`${ENDPOINT.USER}/cc/origin`, {
      params: {
        ccCodes: res1.data.toString(),
      },
    });
    return { success: true, data: res2.data };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false, data: {} };
  }
};

export const axGetBatchesByLotId = async id => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/lotCreation/lotId`, {
      params: {
        lotId: id,
      },
    });
    const data: [any] = res.data;
    return { success: true, data };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false, data: [] };
  }
};

export const axLotDispatch = async (to, body) => {
  try {
    await http.put(`${ENDPOINT.TRACEABILITY}/lot/dispatch/${to}`, body);
    return { success: true, id: to };
  } catch (e) {
    console.error(e);
    notification(MESSAGE.ERROR);
    return { success: false };
  }
};

export const axLazyListLot = async (at, params) => {
  try {
    const res = await http.get(`${ENDPOINT.TRACEABILITY}/lot/all/${at}`, {
      params: {
        limit: PAGINATION_LIMIT,
        coCodes: await getCoCodes(),
        ...params,
      },
    });
    const data: any[] = res.data.map(o => {
      switch (at) {
        case LOT_AT.FACTORY:
          return {
            ...o,
            disabled: o.millingTime && o.outTurn > 0 ? false : true,
          };

        default:
          return o;
      }
    });
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
    console.error(e);
    notification(MESSAGE.ERROR);
    return {
      success: false,
      offset: params.offset,
      lazyListHasMore: false,
      data: [],
    };
  }
};

const getCoCodes = async () => {
  if (hasAccess([ROLES.COOPERATIVE])) {
    return Promise.resolve(getUserKey("coCode"));
  } else {
    const res = await http.get(`${ENDPOINT.USER}/co/union`, {
      params: {
        unionCode: getUserKey("unionCode"),
      },
    });
    const data: [any] = res.data;
    return data.map(co => co.coCode).toString();
  }
};