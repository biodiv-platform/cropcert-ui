import { ENDPOINT, ROLES } from "@utils/constants";
import http from "@utils/http";
import { getUserKey } from "@utils/user.util";

/**
 * Provides list of entities by role and entity code
 *
 * @param {string} role
 * @param {number} [code=-1]
 * @returns
 */
export const getByRole = async (role: string, code: number = -1) => {
  let res: any = { data: [] };

  switch (role) {
    case ROLES.UNION:
      const un = await http.get(`${ENDPOINT.USER}/union/all`);
      res = un.data.map(o => ({
        label: o.name,
        value: o.code,
      }));
      break;

    case ROLES.COOPERATIVE:
      const unionCode = code > 0 ? code : getUserKey(`unionCode`);
      const co = await http.get(`${ENDPOINT.USER}/co/union`, {
        params: { unionCode },
      });
      res = co.data.map(o => ({
        label: o.name,
        value: o.code,
      }));
      break;

    case ROLES.COLLECTION_CENTER:
      const coCode = code > 0 ? code : getUserKey(`coCode`);
      const cc = await http.get(`${ENDPOINT.USER}/cc/coCode/${coCode}`);
      res = cc.data.map(o => ({
        label: o.name,
        value: o.code,
        type: o.type,
      }));
      break;

    case ROLES.ADMIN:
      break;

    default:
      console.error("invalid role passed to getByRole");
      break;
  }

  return res;
};
