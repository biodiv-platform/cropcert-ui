import SITE_CONFIG from "@configs/site-config";

export const isBrowser = typeof window !== `undefined`;

export const SITE_TITLE = SITE_CONFIG.SITE.TITLE_LOCAL;
export const PAGINATION_LIMIT = 20;

export const DATEFORMATS = {
  DAYJS_DATE: "DD-MM-YYYY",
  DAYJS_DATETIME: "DD-MM-YYYY HH:mm",
  TIME: "HH:mm",
  DATE: "dd-MM-yyyy",
  DATETIME: "dd-MM-yyyy HH:mm",
};

export const ENDPOINT = {
  ROOT: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}`,
  ENTITIES: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}entities-api/api`,
  FILES: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}files-api/api`,
  USER: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}user-api/api`,
  PAGES: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}pages-api/api`,
  TRACEABILITY: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}traceability-api/api`,
  CERTIFICATION: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}certification-api/api`,
  ODK: `${SITE_CONFIG.SITE.API_ENDPOINT_SSR}odk-api/api`,
};

export const TOKEN = {
  USER: "user",
  ACCESS: "BAToken",
  REFRESH: "BRToken",
  TIMEOUT: "timeout",
  TYPE: "Bearer ",
};

export const PAGE_TYPE_OPTIONS = {
  CONTENT: { label: "Content", value: "CONTENT" },
  REDIRECT: { label: "Redirect", value: "REDIRECT" },
};

export const ROLES = {
  GI_ADMIN: "GI_ADMIN",
  INSPECTOR: "INSPECTOR",
  ICS_MANAGER: "ICS_MANAGER",
  UNAUTHORIZED: "ROLE_UNAUTHORIZED",
  AUTHORIZED: "AUTHORIZED",
  FARMER: "FARMER",
  COLLECTION_CENTER: "COLLECTION_CENTER_PERSON",
  COOPERATIVE: "COOPERATIVE_PERSON",
  FACTORY: "FACTORY_PERSON",
  UNION: "UNION_PERSON",
  ADMIN: "ROLE_ADMIN",
};

export const KEYS_TO_ROLES = {
  role_unauthorized: "Unauthorized",
  authorized: "Authorized",
  farmer: "Farmer",
  cc: "Collection center",
  co: "Cooperative",
  factory: "Factory",
  union: "Union",
  ROLE_ADMIN: "Admin",
};

export const COMPAT_USERKEY_MAP = {
  [`${ROLES.COLLECTION_CENTER}Code`]: "ccCode",
  [`${ROLES.COOPERATIVE}Code`]: "coCode",
  [`${ROLES.UNION}Code`]: "unionCode",
  [`${ROLES.ADMIN}Code`]: "adminCode",
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

export const VERIFICATION_MODE = {
  MANUAL: "manual",
  OAUTH_GOOGLE: "oauth-google",
};

export const RESOURCE_SIZE = {
  PAGE: "?w=1440&h=300&fit=center",
};
