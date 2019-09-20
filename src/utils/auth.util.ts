import dayjs from "dayjs";
import { navigate } from "gatsby";

import { isBrowser, ROLE_HIERARCHY, ROLES, TOKEN } from "./constants";
import storage from "./storage.util";
import { getUser } from "./user.util";

interface Session {
  accessToken: string;
  refreshToken: string;
  timeout: string;
  isExpired?: boolean;
}

/**
 * Role based access validation
 *
 * @param {string[]} [roles=[ROLES.UNAUTHORIZED]]
 * @returns {boolean}
 */
export const hasAccess = (roles: string[] = [ROLES.UNAUTHORIZED]): boolean => {
  if (roles.includes(ROLES.UNAUTHORIZED)) {
    return true;
  }

  if (isBrowser) {
    const user = getUser();
    if (user.hasOwnProperty("role")) {
      checkSessionExpired();
      if (roles.includes(ROLES.AUTHORIZED) || roles.includes(user.role)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Sets/Updates session to localStorage
 *
 * @param {*} { access_token, refresh_token, timeout }
 */
export const setSession = ({ access_token, refresh_token, timeout }) => {
  storage.set(TOKEN.ACCESS, access_token);
  storage.set(TOKEN.REFRESH, refresh_token);
  storage.set(TOKEN.TIMEOUT, timeout);
};

/**
 * Retrive session tokens from localStorage
 *
 * @returns {Session}
 */
export const getSession = (): Session => {
  const accessToken = storage.get(TOKEN.ACCESS);
  const refreshToken = storage.get(TOKEN.REFRESH);
  const timeout = storage.get(TOKEN.TIMEOUT, 0);
  const isExpired = dayjs(timeout).isBefore(dayjs());
  return {
    accessToken,
    refreshToken,
    timeout,
    isExpired,
  };
};

/**
 * Redirect to `sign-out` page if session is expired
 *
 */
const checkSessionExpired = () => {
  const timeout = storage.get(TOKEN.TIMEOUT, 0);
  if (dayjs(timeout).isBefore(dayjs())) {
    console.info("❌ Session expired");
    navigate("/auth/sign-out");
  }
};

/**
 * Returns parent role(s) array
 *
 * @param {string} role
 * @returns {string[]}
 */
export const hierarchicalRoles = (role: string): string[] => {
  const roleIndex = ROLE_HIERARCHY.findIndex(r => r === role) + 1;
  return ROLE_HIERARCHY.slice(0, roleIndex);
};
