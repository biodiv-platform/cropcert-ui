import "./navmenu.scss";

import { SITE_TITLE } from "@static/constants";
import { navmenu } from "@static/navmenu";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";
import React from "react";

import Arrow from "./arrow";
import PagesNavmenu from "./pages";
import NavbarRightMenu from "./right-menu";

export default function Navbar() {
  return (
    <nav id="menu">
      <NextLink href="/" passHref={true}>
        <Link p={1} fontWeight="bold">
          {SITE_TITLE}
        </Link>
      </NextLink>
      <input type="checkbox" id="tm" />
      <label htmlFor="tm" id="toggle-menu">
        <span className="drop-icon">
          <Arrow direction="h" />
        </span>
      </label>
      <PagesNavmenu staticLinks={navmenu} />
      <NavbarRightMenu />
    </nav>
  );
}
