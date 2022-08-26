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
    title: "Documents",
    url: "/document/list",
    access: [ROLES.UNAUTHORIZED],
  },
  {
    id: 10002,
    title: "Lots for Sale",
    url: "/marketing",
    access: [ROLES.UNAUTHORIZED],
  },
];
