export const isBrowser = typeof window !== `undefined`;

export const SITE_TITLE = process.env.NEXT_APP_TITLE;
export const PAGINATION_LIMIT = 10;

export const DATEFORMATS = {
  DAYJS_DATE: "DD-MM-YYYY",
  DAYJS_DATETIME: "DD-MM-YYYY HH:mm",
  TIME: "HH:mm",
  DATE: "dd-MM-yyyy",
  DATETIME: "dd-MM-yyyy HH:mm",
};

export const ENDPOINT = {
  ROOT: `${process.env.NEXT_APP_ENDPOINT}`,
  CAS: `${process.env.NEXT_APP_ENDPOINT}${process.env.NEXT_ENDPOINT_CAS}`,
  USER: `${process.env.NEXT_APP_ENDPOINT}${process.env.NEXT_ENDPOINT_USER}`,
  PAGES: `${process.env.NEXT_APP_ENDPOINT}${process.env.NEXT_ENDPOINT_PAGES}`,
  TRACEABILITY: `${process.env.NEXT_APP_ENDPOINT}${process.env.NEXT_ENDPOINT_TRACEABILITY}`,
  API: `${process.env.NEXT_APP_ENDPOINT}${process.env.NEXT_ENDPOINT_API}`,
};

export const TOKEN = {
  AUTH: "token",
  USER: "user",
  ACCESS: "access_token",
  REFRESH: "refresh_token",
  TIMEOUT: "timeout",
  TYPE: "Bearer ",
};

export const PAGE_TYPE_OPTIONS = {
  CONTENT: { label: "Content", value: "CONTENT" },
  REDIRECT: { label: "Redirect", value: "REDIRECT" },
};

export const ROLES = {
  UNAUTHORIZED: "role_unauthorized",
  AUTHORIZED: "authorized",
  FARMER: "farmer",
  COLLECTION_CENTER: "cc",
  COOPERATIVE: "co",
  FACTORY: "factory",
  UNION: "union",
  ADMIN: "admin",
};

export const KEYS_TO_ROLES = {
  role_unauthorized: "Unauthorized",
  authorized: "Authorized",
  farmer: "Farmer",
  cc: "Collection center",
  co: "Cooperative",
  factory: "Factory",
  union: "Union",
  admin: "Admin",
};

export const ROLE_HIERARCHY = [
  ROLES.ADMIN,
  ROLES.UNION,
  ROLES.COOPERATIVE,
  ROLES.COLLECTION_CENTER,
];

export const BATCH_TYPE = {
  DRY: "DRY",
  WET: "WET",
};

export const TYPE_OPTIONS = {
  DRY: { label: "Dry", value: BATCH_TYPE.DRY },
  WET: { label: "Wet", value: BATCH_TYPE.WET },
};

export const MESSAGE = {
  INVALID_CREDENTIALS: "Invalid credentials",
  TREE_UPDATE_SUCCESS: "xxx",
  ALL_CC_SELECTED: "All Collection Centers selected",
  ERROR_FACTORY_REPORT: "Input quantity does not match with graded quantities",
};

export const LOT_AT = {
  COOPERATIVE: "AtCoOperative",
  FACTORY: "AtFactory",
  UNION: "AtUnion",
};

export const LOT_FLAGS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DONE: "DONE",
  NOTAPPLICABLE: "NOTAPPLICABLE",
};

export const LOT_STATUS = {
  AT_COLLECTION_CENTER: "AT_COLLECTION_CENTER",
  AT_CO_OPERATIVE: "AT_CO_OPERATIVE",
  IN_TRANSPORT: "IN_TRANSPORT",
  AT_FACTORY: "AT_FACTORY",
  AT_UNION: "AT_UNION",
};

export const LOT_STATUS_HIERARCHY = [
  "AT_COLLECTION_CENTER",
  "AT_CO_OPERATIVE",
  "IN_TRANSPORT",
  "AT_FACTORY",
  "AT_UNION",
];

export const MAP: { MAP_CENTER: [number, number]; [key: string]: any } = {
  MAP_CENTER: [0.4363, 30.1675],
  MARKER_MERGEOPTIONS: {
    iconRetinaUrl: "/assets/marker-default@2x.png",
    iconUrl: "/assets/marker-default.png",
    iconSize: [30, 70],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0],
    popupAnchor: [3, -40],
  },
  MARKER_SELECTED: {
    iconRetinaUrl: "/assets/marker-selected@2x.png",
    iconUrl: "/assets/marker-selected.png",
    iconSize: [30, 70],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0],
    popupAnchor: [3, -40],
  },
  TILE: {
    URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ATTRIBUTION: `&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
  },
};
