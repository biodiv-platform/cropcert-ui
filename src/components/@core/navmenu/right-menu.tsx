import { Information20, Login20, Logout20 } from "@carbon/icons-react";
import { hasAccess } from "@utils/auth.util";
import { CAS_AUTH_URL, ROLES } from "@utils/constants";
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
          <a href={`${CAS_AUTH_URL}`}>
            <Login20 /> Sign In
          </a>
        </li>
      )}
    </ul>
  );
}

export default NavbarRightMenu;
