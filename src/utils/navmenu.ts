import { ROLES } from "./constants";

export const navmenu = [
  {
    id: 10000,
    title: "Dashboard",
    url: "/dashboard",
    access: [ROLES.AUTHORIZED],
  },
  {
    id: 10001,
    title: "Collection Centers",
    url: "/collection-center/list",
    access: [ROLES.AUTHORIZED],
  },
];
