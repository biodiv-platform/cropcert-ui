import { Link } from "@chakra-ui/core";
import { useStoreState } from "easy-peasy";
import NextLink from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";

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
          <NextLink href={`/auth/sign-out?t=${new Date().getTime()}`} passHref={true}>
            <Link>
              {user["firstName"]} {user["lastName"]} <FiLogOut />
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
