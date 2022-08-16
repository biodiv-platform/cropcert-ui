import { Image } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { SITE_TITLE } from "@static/constants";
import { navmenu } from "@static/navmenu";
import NextLink from "next/link";
import React from "react";

import Arrow from "./arrow";
import OfflineStatus from "./offline-status";
import PagesNavmenu from "./pages";
import NavbarRightMenu from "./right-menu";

export default function Navbar() {
  return (
    <>
      <nav id="menu">
        <NextLink href="/" passHref={true}>
          <a className="logo">
            <Image src={SITE_CONFIG.SITE.ICON} px={4} mt={2} alt={SITE_TITLE} />
          </a>
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
      <OfflineStatus />
    </>
  );
}
