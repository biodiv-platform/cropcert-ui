export const isBrowser = typeof window !== `undefined`;
export const safeWindow = isBrowser
  ? window
  : { location: { origin: "/", pathname: "/" } };

export const SITE_TITLE = "Rwenzori Mountain Coffee";
export const PAGINATION_LIMIT = 10;

export const DATEFORMATS = {
  DAYJS_DATE: "DD-MM-YYYY",
  DAYJS_DATETIME: "DD-MM-YYYY HH:mm",
  TIME: "HH:mm",
  DATE: "dd-MM-yyyy",
  DATETIME: "dd-MM-yyyy HH:mm",
};

export const ENDPOINT = {
  ROOT: `${process.env.APP_ROOT}`,
  CAS: `${process.env.APP_ROOT}${process.env.ENDPOINT_CAS}`,
  USER: `${process.env.APP_ROOT}${process.env.ENDPOINT_USER}`,
  PAGES: `${process.env.APP_ROOT}${process.env.ENDPOINT_PAGES}`,
  TRACEABILITY: `${process.env.APP_ROOT}${process.env.ENDPOINT_TRACEABILITY}`,
  API: `${process.env.APP_ROOT}${process.env.ENDPOINT_API}`,
};

export const TOKEN = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
  TIMEOUT: "timeout",
  TYPE: "Bearer ",
};

export const BACKGROUND = {
  WHITE: "#fff",
  GRAY: "#F0F0F0",
};

export const BATCH_TYPE = {
  WET: "WET",
  DRY: "DRY",
  BOTH: "BOTH",
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
  ROLES.COLLECTION_CENTER,
];

export const TYPE_OPTIONS = {
  DRY: { label: "Dry", value: "DRY" },
  WET: { label: "Wet", value: "WET" },
};

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
  TILE: {
    URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ATTRIBUTION: `&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
  },
};

export const MESSAGE = {
  SUCCESS: "operation completed successfully",
  ERROR: "There was an error while performing this operation",
  INVALID_CREDENTIALS: "Invalid credentials",
  TREE_UPDATE_SUCCESS: "Page(s) order updated successfully",
  ALL_CC_SELECTED: "All Collection Centers selected",
};

export const OPERATION_MESSAGES = {
  READY_FOR_LOT: {
    MESSAGE: "Wet batch(s) are finalized and ready for Lot",
    BACK_LINK: "/batch/list-wet",
    BACK_TITLE: "Finalize Other Batche(s)",
  },
  BATCH_CREATED: {
    MESSAGE: "Batch created with Name ##id##",
    BACK_LINK: "/batch/create",
    BACK_TITLE: "Create Another Batch",
  },
  LOT_CREATED: {
    MESSAGE: "Lot created with Name ##id##",
    BACK_LINK: "/batch/list",
    BACK_TITLE: "Create Another Lot",
  },
  LOT_DISPATCHED_FACTORY: {
    MESSAGE: "Lot(s) dispatched to Factory",
    BACK_LINK: "/lot/list",
    BACK_TITLE: "Dispatch More Lot(s)",
  },
  LOT_DISPATCHED_UNION: {
    MESSAGE: "Lot(s) dispatched to Union",
    BACK_LINK: "/lot/milling",
    BACK_TITLE: "Dispatch More Lot(s)",
  },
  GREEN_REPORT_CREATED: {
    MESSAGE: "Green Report Created with id ##id##",
    BACK_LINK: "/report/list?type=green",
    BACK_TITLE: "Create more Reports",
  },
  CUPPING_REPORT_CREATED: {
    MESSAGE: "Cupping Report Created with id ##id##",
    BACK_LINK: "/report/list?type=green",
    BACK_TITLE: "Create more Reports",
  },
  PAGE_EDIT: {
    MESSAGE: "Page ##id## Updated",
    BACK_LINK: "/page/list",
    BACK_TITLE: "Manage Pages",
  },
  PAGE_CREATE: {
    MESSAGE: "Page ##id## Created",
    BACK_LINK: "/page/list",
    BACK_TITLE: "Manage Pages",
  },
  NA: {
    MESSAGE: "#",
    BACK_LINK: "/",
    BACK_TITLE: "#",
  },
};

export const DATATYPE = {
  DATETIME: "datetime-local",
  NUMBER: "number",
  TEXT: "text",
};

export const LOT_AT = {
  COOPERATIVE: "AtCoOperative",
  FACTORY: "AtFactory",
  UNION: "AtUnion",
};

export const REPORT_TYPE = {
  GREEN: "green",
  CUPPING: "cupping",
};
