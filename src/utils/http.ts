import notification from "@utils/notification.util";
import axios from "axios";

import { getSession, setSession } from "./auth.util";
import { ENDPOINT } from "./constants";

/**
 * Renews `accessToken` if expired
 *
 * @param {string} refreshToken
 * @returns {string}
 */
const axRenewToken = async (refreshToken: string) => {
  const res = await axios.post(`${ENDPOINT.USER}/auth/newTokens`, null, {
    params: { refreshToken },
  });
  setSession(res.data);
  return res.data.accessToken;
};

/**
 * Returns `accessToken`
 *
 * @returns {string}
 */
export const getBearerToken = async () => {
  const { accessToken, refreshToken, isExpired } = getSession();
  const finalToken = !isExpired
    ? accessToken
    : await axRenewToken(refreshToken);
  return `Bearer ${finalToken}`;
};

const ax = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

ax.interceptors.request.use(
  async options => {
    if (options.headers["unauthorized"] && options.headers.unauthorized) {
      return options;
    }
    options.headers["Authorization"] = await getBearerToken();
    return options;
  },
  error => {
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
