import { hasAccess } from "@utils/auth.util";
import { ENDPOINT, MESSAGE, ROLES } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";
import { getUserKey } from "@utils/user.util";

export const axListCCAccessible = async () => {
  const coCode = getUserKey("coCode");
  const endpoint = hasAccess([ROLES.COOPERATIVE])
    ? `cc/coOperativeId/${coCode}`
    : `cc/${coCode}`;
  try {
    const res = await http.get(`${ENDPOINT.USER}/${endpoint}`);
    return Array.isArray(res.data) ? res.data : [res.data];
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};
