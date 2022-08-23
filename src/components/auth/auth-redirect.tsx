import { ROLES } from "@static/constants";
import { getParsedUser, hasAccess } from "@utils/auth.util";
import { encode } from "base64-url";

export const throwUnauthorized = (ctx) => {
  if (ctx.res) {
    ctx.res.writeHead(401, { "Content-Type": "text/html; charset=utf-8" });
    ctx.res.write("🍃 Unauthorized");
    ctx.res.end();
  }
};

/**
 * Improved version of `authorizedPageSSR` redirects to login if user is not authorized
 *
 * @param {*} allowedRoles
 * @param {*} ctx
 * @return {*}
 */
export const authorizedPageSSP = (allowedRoles, ctx) => {
  const user = getParsedUser(ctx);
  const isLoggedIn = hasAccess([ROLES.AUTHORIZED], user);

  if (!hasAccess(allowedRoles, user)) {
    if (isLoggedIn) throwUnauthorized(ctx);

    return {
      redirect: {
        permanant: false,
        destination: `/login?forward=${encode(ctx?.asPath || ctx?.resolvedUrl)}`,
      },
      props: {},
    };
  }
};
