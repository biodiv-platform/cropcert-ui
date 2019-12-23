import { ROLES } from "./constants";

export const navmenu = [
  {
    id: 10000,
    title: "Dashboard",
    url: "/dashboard",
    access: [ROLES.AUTHORIZED]
  }
];
