import { COMPAT_USERKEY_MAP, isBrowser, ROLE_HIERARCHY, ROLES, TOKEN } from "@static/constants";
import { AUTHWALL } from "@static/events";
import JWTDecode from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { emit } from "react-gbus";

export const cookieOpts = {
  maxAge: 60 * 60 * 24 * 7, // 1 Week
  path: "/",
};

/**
 * Role based access validation
 *
 * @param {string[]} [roles=[ROLES.UNAUTHORIZED]]
 * @returns {boolean}
 */
export const hasAccess = (roles: string[] = [ROLES.UNAUTHORIZED], user): boolean => {
  if (roles.includes(ROLES.UNAUTHORIZED)) {
    return true;
  }

  if (user?.roles) {
    if (roles.includes(ROLES.AUTHORIZED)) return true;

    const currentRoles = user.roles.map((role) => role.authority);
    if (roles.some((role) => currentRoles.includes(role))) return true;
  }

  return false;
};

export const adminOrAuthor = (authorId, ctx?) => {
  const u = getParsedUser(ctx);
  return u?.id === authorId || hasAccess([ROLES.ADMIN], u);
};

// sets/re-sets cookies on development mode
export const setCookies = ({ tokens, user }: { tokens?; user? }, ctx?) => {
  if (tokens) {
    setCookie(ctx, TOKEN.ACCESS, tokens.access_token, cookieOpts);
    setCookie(ctx, TOKEN.REFRESH, tokens.refresh_token, cookieOpts);
  }

  if (user) {
    setCookie(ctx, TOKEN.USER, JSON.stringify(user), cookieOpts);
  }
};

export const getAuthState = (ctx?) => {
  const pk = parseCookies(ctx);

  const accessToken = pk[TOKEN.ACCESS];
  const refreshToken = pk[TOKEN.REFRESH];

  const tokenUser: any = JWTDecode(accessToken);
  const isExpired = isTokenExpired(tokenUser.exp);

  return { accessToken, refreshToken, isExpired };
};

export const isTokenExpired = (exp) => {
  const currentTime = Date.now() / 1000;
  return exp ? exp < currentTime : true;
};

/**
 * Returns compat key that converts Role to /me key
 *
 * @param {*} key
 */
const getCompatKey = (key) => (COMPAT_USERKEY_MAP[key] ? COMPAT_USERKEY_MAP[key] : key);

export const getUserKey = (key, ctx = {}) => getParsedUser(ctx)?.[getCompatKey(key)];

export const setUserKey = (key, value) => {
  const u = getParsedUser();
  const cKey = getCompatKey(key);

  setCookie({}, TOKEN.USER, JSON.stringify({ ...u, [cKey]: value }), cookieOpts);
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

export const registerSW = async () => {
  if (!isBrowser || process.env.NODE_ENV === "development") {
    return;
  }

  console.debug("Registering SW");
  const wb = (window as any).workbox;
  wb.register();
};

/**
 * Manually unregisters running service worker(s)
 * After this do hard redirect so service worker can reregister itself and precache routes
 */
export const unregisterSW = async () => {
  const registrations = await navigator?.serviceWorker?.getRegistrations();

  for (const registration of registrations || []) {
    await registration.unregister();
  }
};

/**
 * Delete caches from browser `Cache`
 */
export const removeCache = async (whitelist = [] as string[]) => {
  try {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    await (window as any).workbox.register();
    caches.keys().then(async (keyList) => {
      await Promise.all(
        keyList.map((key) => {
          const cacheIndex = whitelist.findIndex((cache) => key.includes(cache));
          if (cacheIndex === -1) {
            console.debug("cache deleted", key);
            return caches.delete(key);
          } else {
            console.debug("cache skipped", key);
          }
        })
      );
    });

    if (!whitelist.length) {
      await unregisterSW();
    }
  } catch (e) {
    console.error(e);
  }
};

export const getParsedUser = (ctx?): any => {
  const cookies = parseCookies(ctx);
  return JSON.parse(cookies?.[TOKEN.USER] || "{}");
};

export const removeCookies = () => {
  const cookieOpts = { path: "/" };

  destroyCookie(null, TOKEN.ACCESS, cookieOpts);
  destroyCookie(null, TOKEN.REFRESH, cookieOpts);
  destroyCookie(null, TOKEN.USER, cookieOpts);
};

/**
 * 🌈 On the spot authorization wrapped in a one magical promise
 *
 * @returns {Promise<Record<string, unknown>>}
 */
export const waitForAuth = (): Promise<Record<string, unknown>> => {
  return new Promise((resolve: any, reject) => {
    const u = getParsedUser();
    u?.id ? resolve() : emit(AUTHWALL.INIT, { resolve, reject });
  });
};
