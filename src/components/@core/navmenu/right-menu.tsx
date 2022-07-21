import { Link } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-store";
import NextLink from "next/link";
import React from "react";
import LogoutIcon from "src/icons/logout";

function NavbarRightMenu() {
  const { user, isLoggedIn } = useGlobalState();

  return (
    <ul className="main-menu right">
      {isLoggedIn ? (
        <li>
          <NextLink href="/auth/sign-out" passHref={true}>
            <Link>
              {user["firstName"]} {user["lastName"]} <LogoutIcon ml={1} />
            </Link>
          </NextLink>
        </li>
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
