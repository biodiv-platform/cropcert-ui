import { ROLES } from "./constants";

export const containerMaxW = { md: "6xl", lg: "7xl" };

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
  {
    id: 10003,
    title: "Users",
    url: "/user/list",
    access: [ROLES.UNAUTHORIZED],
  },
  {
    id: 3,
    title: "Media gallery",
    access: [ROLES.UNAUTHORIZED],
    url: "/resource/list",
    children: [
      {
        id: 4,
        title: "All media",
        url: "/resource/list",
        access: [ROLES.UNAUTHORIZED],
      },
      {
        id: 5,
        title: "Media Gallery list",
        url: "/media-gallery/list",
        access: [ROLES.UNAUTHORIZED],
      },
      {
        id: 6,
        title: "Media Gallery Create",
        url: "/media-gallery/create",
        access: [ROLES.ADMIN],
      },
    ],
  },
];
