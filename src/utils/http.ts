import { ENDPOINT } from "@static/constants";
import notification from "@utils/notification.util";
import axios from "axios";

import { getTokens, setTokens } from "./auth.util";

/**
 * Renews `access_token` if expired
 *
 * @param {string} refreshToken
 * @returns {string}
 */
const axRenewToken = async (refreshToken: string) => {
  const res = await axios.post(`${ENDPOINT.USER}/auth/renew`, null, {
    params: { refreshToken },
  });
  setTokens(res.data);
  return res.data.accessToken;
};

/**
 * Returns `access_token`
 *
 * @returns {string}
 */
export const getBearerToken = async (ctx?) => {
  const { accessToken, refreshToken, isExpired } = getTokens(ctx);
  const finalToken = !isExpired ? accessToken : await axRenewToken(refreshToken);
  return `Bearer ${finalToken}`;
};

const ax = axios.create({
  headers: {
    post: { "Content-Type": "application/json" },
    put: { "Content-Type": "application/json" },
  },
});

/*
 * Custom interceptor that allows user to pass custom context (for SSR)
 */
ax.interceptors.request.use(
  async (options) => {
    if (options.headers["unauthorized"] && options.headers.unauthorized) {
      return options;
    }

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
