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

const API_ENDPOINT = SITE_CONFIG.SITE.API_ENDPOINT_SSR;

export const ENDPOINT = {
  ROOT: `${API_ENDPOINT}`,
  ACTIVITY: `${API_ENDPOINT}activity-api/api`,
  DOCUMENT: `${API_ENDPOINT}document-api/api`,
  ESMODULE: `${API_ENDPOINT}esmodule-api/api`,
  ENTITIES: `${API_ENDPOINT}entities-api/api`,
  INTEGRATOR: `${API_ENDPOINT}integrator-api/api`,
  FILES: `${API_ENDPOINT}files-api/api`,
  GEOENTITIES: `${API_ENDPOINT}geoentities-api/api`,
  USER: `${API_ENDPOINT}user-api/api`,
  RAW: `${API_ENDPOINT}biodiv`,
  LANDSCAPE: `${API_ENDPOINT}landscape-api/api`,
  RESOURCES: `${API_ENDPOINT}resources-api/api`,
  PAGES: `${API_ENDPOINT}pages-api/api`,
  TRACEABILITY: `${API_ENDPOINT}traceability-api/api`,
  CERTIFICATION: `${API_ENDPOINT}certification-api/api`,
  ODK: `${API_ENDPOINT}odk-api/api`,
  UTILITY: `${API_ENDPOINT}utility-api/api`,
};

export const TOKEN = {
  USER: "user",
  ACCESS: "BAToken",
  REFRESH: "BRToken",
  TIMEOUT: "timeout",
  TYPE: "Bearer ",
};

export const FLAG_OPTIONS = [
  "DETAILS_INAPPROPRIATE",
  "LOCATION_INAPPROPRIATE",
  "DATE_INAPPROPRIATE",
];

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

export const LOT_FLAGS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DONE: "DONE",
  NOTAPPLICABLE: "NOTAPPLICABLE",
};

export const VERIFICATION_MODE = {
  MANUAL: "manual",
  OAUTH_GOOGLE: "oauth-google",
};

export const RESOURCE_SIZE = {
  TWITTER: "?w=600&h=330&fit=center&preserve=true",
  PAGE: "?w=1440&h=300&fit=center",
};

export const RESOURCE_TYPE = {
  DATATABLE: "datatable",
  DOCUMENT: "document",
  OBSERVATION: "observation",
  SPECIES: "species",
  TAXONOMY: "taxonomy",
};

export const MENU_PORTAL_TARGET = isBrowser ? document.body : undefined;
