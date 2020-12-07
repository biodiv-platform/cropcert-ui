import { ROLE_HIERARCHY, ROLES, TOKEN } from "@static/constants";
import dayjs from "dayjs";
import { getNookie, setNookie } from "next-nookies-persist";

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
export const hasAccess = (
  roles: string[] = [ROLES.UNAUTHORIZED],
  nookies = getNookie(TOKEN.USER)
): boolean => {
  if (roles.includes(ROLES.UNAUTHORIZED)) {
    return true;
  }

  const user = nookies || {};
  if (user["role"]) {
    if (roles.includes(ROLES.AUTHORIZED) || roles.includes(user.role)) {
      return true;
    }
  }

  return false;
};

export const setTokens = (token) => {
  setNookie(TOKEN.AUTH, token);
};

export const getTokens = (ctx = {}): Session => {
  const store = getNookie(TOKEN.AUTH, ctx) || {};
  const accessToken = store[TOKEN.ACCESS];
  const refreshToken = store[TOKEN.REFRESH];
  const timeout = store[TOKEN.TIMEOUT] || 0;
  const isExpired = dayjs(timeout).isBefore(dayjs());
  return {
    accessToken,
    refreshToken,
    timeout,
    isExpired,
  };
};

export const getUserKey = (key, ctx = {}) => getNookie(TOKEN.USER, ctx)[key];

export const setUserKey = (key, value) => {
  const u = getNookie(TOKEN.USER);
  setNookie(TOKEN.USER, { ...u, [key]: value });
};

/**
 * Returns parent role(s) array
 *
 * @param {string} role
 * @returns {string[]}
 */
export const hierarchicalRoles = (role: string): string[] => {
  const roleIndex = ROLE_HIERARCHY.findIndex((r) => r === role) + 1;
  return ROLE_HIERARCHY.slice(0, roleIndex);
};
