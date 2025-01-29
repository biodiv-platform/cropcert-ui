import { Box, Image } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { SITE_TITLE } from "@static/constants";
import { navmenu } from "@static/navmenu";
import NextLink from "next/link";
import React from "react";

import Container from "../container";
import Arrow from "./arrow";
import OfflineStatus from "./offline-status";
import PagesNavmenu from "./pages";
import NavbarRightMenu from "./right-menu";

export default function Navbar() {
  return (
    <Box borderBottom="1px solid" borderColor="gray.200">
      <Container>
        <nav id="menu">
          <NextLink href="/" passHref={true} className="logo">
            <Image src={SITE_CONFIG.SITE.ICON} pr={2} alt={SITE_TITLE} />
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
      </Container>
      <OfflineStatus />
    </Box>
  );
}
