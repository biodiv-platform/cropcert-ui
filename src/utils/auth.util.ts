import { navigate } from "gatsby";

import { isBrowser, ROLES } from "./constants";
import { getUser } from "./user.util";

export const hasAccess = (roles: string[] = [ROLES.UNAUTHORIZED]) => {
  if (roles.includes(ROLES.UNAUTHORIZED)) {
    return true;
  }

  if (isBrowser) {
    const user = getUser();
    if (user.hasOwnProperty("role")) {
      checkSessionExpired(user.lts);
      if (roles.includes(ROLES.AUTHORIZED) || roles.includes(user.role)) {
        return true;
      }
    }
  }

  return false;
};

/*
 * Temp Fix for session expiration after 2 Hours
 */
const checkSessionExpired = (lts = 0) => {
  const diff = (new Date().getTime() - lts) / 60000;
  if (diff > 120) {
    console.info("❌ Session expired");
    navigate("/auth/sign-out");
  }
};
