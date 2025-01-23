import { IconButton, Link } from "@chakra-ui/react";
import { List } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import NextLink from "next/link";
import React, { useMemo } from "react";
import LogoutIcon from "src/icons/logout";

import { Avatar } from "@/components/ui/avatar";

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
    <List.Root as="ul" className="main-menu right">
      {isLoggedIn ? (
        <>
          <List.Item>
            <NextLink href={`/user/show/${user.id}`} passHref={true} legacyBehavior>
              <Link className="user">
                <Tooltip
                  title={`${user.name} (${visualRole})`}
                  positioning={{ placement: "bottom" }}
                >
                  <Avatar size="sm" name={user.name} />
                </Tooltip>
              </Link>
            </NextLink>
          </List.Item>
          <List.Item px={2}>
            <NextLink href="/logout" passHref={true} legacyBehavior>
              <Link className="user">
                <Tooltip title={`${user.name}`}>
                  <IconButton variant={"ghost"} size="sm">
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </NextLink>
          </List.Item>
        </>
      ) : (
        <List.Item>
          <NextLink href="/login" passHref={true} legacyBehavior>
            <Link>Sign In</Link>
          </NextLink>
        </List.Item>
      )}
    </List.Root>
  );
}

export default NavbarRightMenu;
