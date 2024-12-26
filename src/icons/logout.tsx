import React from "react";

import { createIcon } from "./createIcon";

const LogoutIcon = createIcon({
  displayName: "Logout",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.3 2.4c.2-.2.4-.3.7-.3h4a1 1 0 100-2H3a3 3 0 00-3 3v14a3 3 0 003 3h4a1 1 0 000-2H3a1 1 0 01-1-1v-14c0-.2.1-.5.3-.7zm11 2a1 1 0 011.4 0l5 5c.4.4.4 1 0 1.4l-5 5a1 1 0 01-1.4-1.4l3.3-3.3H8a1 1 0 010-2h8.6l-3.3-3.3a1 1 0 010-1.4z"
      fill="currentColor"
    ></path>
  ),
  viewBox: "0 0 20 20",
});

export default LogoutIcon;
