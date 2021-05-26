import { Link } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import NextLink from "next/link";
import React from "react";
import LogoutIcon from "src/icons/logout";

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
