import "./navmenu.scss";

import { SITE_TITLE } from "@utils/constants";
import { navmenu } from "@utils/navmenu";
import { Link } from "gatsby";
import React from "react";

import Arrow from "./arrow";
import PagesNavmenu from "./pages";
import NavbarRightMenu from "./right-menu";

export default function Navbar() {
  return (
    <nav id="menu">
      <label htmlFor="tm" id="toggle-menu">
        {SITE_TITLE}
        <span className="drop-icon">
          <Arrow direction="h" />
        </span>
      </label>
      <Link to="/" className="title">
        {SITE_TITLE}
      </Link>
      <input type="checkbox" id="tm" />
      <PagesNavmenu staticLinks={navmenu} />
      <NavbarRightMenu />
    </nav>
  );
}
