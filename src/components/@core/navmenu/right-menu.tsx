import { Information20, Login20, Logout20 } from "@carbon/icons-react";
import { hasAccess } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import { Link } from "gatsby";
import React from "react";

function NavbarRightMenu() {
  return (
    <ul className="main-menu right">
      <li>
        <a href="/static/LICENSES.txt" title="Licenses">
          <Information20 />
        </a>
      </li>
      {hasAccess([ROLES.AUTHORIZED]) ? (
        <li>
          <Link to="/auth/sign-out">
            <Logout20 />
            {`${getUserKey("userName")}`}
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/auth/sign-in">
            <Login20 /> Sign In
          </Link>
        </li>
      )}
    </ul>
  );
}

export default NavbarRightMenu;
