import { IconButton, Link } from "@chakra-ui/react";
import { List } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
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
            <Link className="user" href={`/user/show/${user.id}`}>
              <Tooltip title={`${user.name} (${visualRole})`} positioning={{ placement: "bottom" }}>
                <Avatar size="sm" name={user.name} />
              </Tooltip>
            </Link>
          </List.Item>
          <List.Item px={2}>
            <Link href="/logout" className="user">
              <Tooltip title={`${user.name}`}>
                <IconButton variant={"ghost"} size="sm">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </List.Item>
        </>
      ) : (
        <List.Item>
          <Link href="/login">Sign In</Link>
        </List.Item>
      )}
    </List.Root>
  );
}

export default NavbarRightMenu;
