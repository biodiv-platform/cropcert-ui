import { ENDPOINT } from "@static/constants";
import notification from "@utils/notification.util";
import axios from "axios";

import { getAuthState, setCookies } from "./auth.util";

const defaultHeaders = {
  headers: {
    post: { "Content-Type": "application/json" },
    put: { "Content-Type": "application/json" },
  },
} as any;

/**
 * Renews `access_token` if expired
 *
 * @param {string} refreshToken
 * @returns {string}
 */
const axRenewToken = async (refreshToken: string) => {
  const res = await axios.post(`${ENDPOINT.USER}/v1/authenticate/refresh-tokens`, null, {
    params: { refreshToken },
  });
  setCookies({ tokens: res.data });
  return res.data.accessToken;
};

/**
 * Returns `access_token`
 *
 * @returns {string}
 */
export const getBearerToken = async (ctx?) => {
  try {
    const authState = getAuthState(ctx);

    const finalToken = authState.isExpired
      ? await axRenewToken(authState.refreshToken)
      : authState.accessToken;

    return `Bearer ${finalToken}`;
  } catch (e) {
    return false;
  }
};

const ax = axios.create(defaultHeaders);

/*
 * Custom interceptor that allows user to pass custom context (for SSR)
 */
ax.interceptors.request.use(
  async (options: any) => {
    const ctx = options?.params?.ctx;
    ctx && delete options.params.ctx;
    options.headers["Authorization"] = await getBearerToken(ctx);
    return options;
  },
  (error) => {
    notification("Session Expired!");
    return Promise.reject(error);
  }
);

export default ax;

/**
 * *axios* instance for `x-www-form-urlencoded` request
 *
 */
export const httpFormData = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const plainHttp = axios.create(defaultHeaders);
