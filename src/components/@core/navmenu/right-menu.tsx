import { Avatar, Link } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import NextLink from "next/link";
import React, { useMemo } from "react";
import LogoutIcon from "src/icons/logout";

import Tooltip from "../tooltip";

function NavbarRightMenu() {
  const { user, authorizedRoles, isLoggedIn } = useGlobalState();

  const visualRole = useMemo(
    () => (isLoggedIn ? authorizedRoles?.[0].replace("_", " ").toLowerCase() : null),
    [isLoggedIn, authorizedRoles]
  );

  return (
    <ul className="main-menu right">
      {isLoggedIn ? (
        <>
          <li>
            <NextLink href={`/user/show/${user.id}`} passHref={true}>
              <Tooltip title={`${user.name} (${visualRole})`}>
                <Link className="user">
                  <Avatar size="sm" name={user.name} />
                </Link>
              </Tooltip>
            </NextLink>
          </li>
          <li>
            <NextLink href="/auth/sign-out" passHref={true}>
              <Link px={0}>
                <LogoutIcon ml={1} />
              </Link>
            </NextLink>
          </li>
        </>
      ) : (
        <li>
          <NextLink href="/auth/sign-in" passHref={true}>
            <Link>Sign In</Link>
          </NextLink>
        </li>
      )}
    </ul>
  );
}

export default NavbarRightMenu;
