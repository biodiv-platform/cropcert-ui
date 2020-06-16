import { Icon, Link } from "@chakra-ui/core";
import { useStoreState } from "easy-peasy";
import NextLink from "next/link";
import React from "react";

function NavbarRightMenu() {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const user = useStoreState((state) => state.user);

  return (
    <ul className="main-menu right">
      <li>
        <Link href="/LICENSES.txt" title="Licenses">
          Licenses
        </Link>
      </li>
      {isLoggedIn ? (
        <li>
          <NextLink href="/auth/sign-out" passHref={true}>
            <Link>
              {user["firstName"]} {user["lastName"]} <Icon ml={1} name="logout" />
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
