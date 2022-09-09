import { ROLES } from "./constants";

export const navmenuPre = {
  id: 10000,
  title: "Dashboard",
  url: "/dashboard",
  access: [ROLES.AUTHORIZED],
};

export const navmenu = [
  {
    id: 10001,
    title: "Documents",
    url: "/document/list",
    access: [ROLES.UNAUTHORIZED],
  },
  {
    id: 10002,
    title: "Maps",
    url: "/map",
    access: [ROLES.UNAUTHORIZED],
  },
];
