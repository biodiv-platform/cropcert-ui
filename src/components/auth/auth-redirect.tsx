import { ROLES } from "@static/constants";
import { getParsedUser, hasAccess } from "@utils/auth";
import { encode } from "base64-url";
import Router from "next/router";

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

/**
 * This function should be used in SSR based functions like `getInitialProps` etc.
 * - Don't use this function on open pages
 * - Always redirects to login if user is not logged in
 * - use `authorizedPageSSP` if you want to use it with `getServerSideProps`
 *
 * @param {Role[]} allowedRoles
 * @param {*} ctx
 * @param {boolean} [redirect=true]
 */
export const authorizedPageSSR = (
  allowedRoles,
  ctx,
  redirect = true,
  redirectNotLoggedIn = true
) => {
  const user = getParsedUser(ctx);
  const canRedirect = redirectNotLoggedIn
    ? hasAccess([ROLES.AUTHORIZED], user)
      ? redirect
      : true
    : redirect;

  if (!hasAccess(allowedRoles, user)) {
    if (canRedirect) {
      const Location = `/login?forward=${encode(ctx?.asPath || ctx?.resolvedUrl)}`;
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location,
          "Content-Type": "text/html; charset=utf-8",
        });
        ctx.res.end();
      } else {
        Router.push(Location);
      }
    } else {
      throwUnauthorized(ctx);
    }
  }
};
