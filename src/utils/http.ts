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
    const { accessToken, refreshToken, isExpired } = getSession();
    const finalToken = !isExpired
      ? accessToken
      : await axRenewToken(refreshToken);
    options.headers["Authorization"] = `Bearer ${finalToken}`;
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
