import { Avatar, Link } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import NextLink from "next/link";
import React, { useMemo } from "react";
import LogoutIcon from "src/icons/logout";

import Tooltip from "../tooltip";

function NavbarRightMenu() {
  const { user, authorizedRoles, isLoggedIn } = useGlobalState();

  const visualRole = useMemo(
    () =>
      isLoggedIn
        ? authorizedRoles.includes("ROLE_ADMIN")
          ? "ROLE_ADMIN".replace("_", " ").toLowerCase()
          : authorizedRoles?.[0].replace("_", " ").toLowerCase()
        : null,
    [isLoggedIn, authorizedRoles]
  );

  return (
    <ul className="main-menu right">
      {isLoggedIn ? (
        <>
          <li>
            <NextLink href={`/user/show/${user.id}`} passHref={true}>
              <Link className="user">
                <Tooltip title={`${user.name} (${visualRole})`}>
                  <Avatar size="sm" name={user.name} />
                </Tooltip>
              </Link>
            </NextLink>
          </li>
          <li>
            <NextLink href="/logout" passHref={true}>
              <Link px={0}>
                <LogoutIcon ml={1} />
              </Link>
            </NextLink>
          </li>
        </>
      ) : (
        <li>
          <NextLink href="/login" passHref={true}>
            <Link>Sign In</Link>
          </NextLink>
        </li>
      )}
    </ul>
  );
}

export default NavbarRightMenu;
