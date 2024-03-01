import SITE_CONFIG from "@configs/site-config";

export const isBrowser = typeof window !== `undefined`;

export const SITE_TITLE = SITE_CONFIG.SITE.TITLE_LOCAL;
export const PAGINATION_LIMIT = 20;
export const DEFAULT_PASSWORD_LENGTH = 10;

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
  CERTIFICATION: `${API_ENDPOINT}certification-api/api`,
  DOCUMENT: `${API_ENDPOINT}document-api/api`,
  ENTITIES: `${API_ENDPOINT}entities-api/api`,
  ESMODULE: `${API_ENDPOINT}esmodule-api/api`,
  FILES: `${API_ENDPOINT}files-api/api`,
  GEOENTITIES: `${API_ENDPOINT}geoentities-api/api`,
  GEOSERVER: `${API_ENDPOINT}geoserver`,
  INTEGRATOR: `${API_ENDPOINT}integrator-api/api`,
  LANDSCAPE: `${API_ENDPOINT}landscape-api/api`,
  NAKSHA: `${API_ENDPOINT}naksha-api/api`,
  ODK: `${API_ENDPOINT}odk-api/api/v1`,
  PAGES: `${API_ENDPOINT}pages-api/api`,
  RAW: `${API_ENDPOINT}biodiv`,
  RESOURCES: `${API_ENDPOINT}resources-api/api`,
  TRACEABILITY: `${API_ENDPOINT}traceability-node-api/api/v1`,
  ODK_IMAGES: `${API_ENDPOINT}odk-api/api/`,
  USER: `${API_ENDPOINT}user-api/api`,
  USERGROUP: `${API_ENDPOINT}userGroup-api/api`,
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
  ODK_APP_USER: "ODK_APP_USER",
  ODK_WEB_USER: "ODK_WEB_USER",
  PAGE_EDITOR: "ROLE_PAGE_EDITOR",
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
  FAQ: "FAQ",
};

export const TYPE_OPTIONS = {
  DRY: { label: "Dry", value: BATCH_TYPE.DRY },
  WET: { label: "Wet", value: BATCH_TYPE.WET },
  FAQ: { label: "FAQ", value: BATCH_TYPE.FAQ },
};

export const LOT_FLAGS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DONE: "DONE",
  NOTAPPLICABLE: "NOTAPPLICABLE",
};

export const BATCH_FLAGS = {
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
  TWITTER: "?w=640&h=320&crop=fit&preserve=true",
  PAGE: "?w=1440&h=300&fit=center",
  DEFAULT: "?h=300",
  RECENT_THUMBNAIL: "?h=230",
  SOCIAL_DEFAULT: "?w=1200&h=630&fit=center&preserve=true",
};

export const RESOURCE_TYPE = {
  DATATABLE: "datatable",
  DOCUMENT: "document",
  OBSERVATION: "observation",
  SPECIES: "species",
  TAXONOMY: "taxonomy",
  PAGE: "page",
  RESOURCE: "resource",
};

export const MENU_PORTAL_TARGET = isBrowser ? document.body : undefined;

export const LICENSES = [
  "UNSPECIFIED",
  "CC-BY",
  "CC-BY-SA",
  "CC-BY-NC",
  "CC-BY-NC-SA",
  "CC-BY-NC-ND",
  "CC-BY-ND",
  "CC-PUBLIC-DOMAIN",
];

export const CC_COLOR_MAPPING = {
  Magogo: {
    insideColor: "#BF4A6D",
  },
  Bupadhengo: {
    insideColor: "#F6AD55",
  },
  Kiyunga: {
    insideColor: "#ECC94B",
  },
  Buteme: {
    insideColor: "#4FD1C5",
  },
  Kakira: {
    insideColor: "#2F825D",
  },
  Kakunyhu: {
    insideColor: "#6FC3A7",
  },
  Namaganda: {
    insideColor: "#805AD5",
  },
  Nankandulo: {
    insideColor: "#FA9EBE",
  },
  Nawantumbi: {
    insideColor: "#6082E6",
  },
  Kisozi: {
    insideColor: "#fb923c",
  },
  Nawanyago: {
    insideColor: "#38A169",
  },
  Lwanyama: {
    insideColor: "#E53E3E",
  },
  Others: {
    insideColor: "#262626",
  },
};

export const genderList = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "NON_BINARY" },
];

export const levelOfEducationList = [
  { label: "Primary School", value: "primary" },
  { label: "Secondary School", value: "secondary" },
  { label: "University and vocational training education", value: "tertiary" },
];

export const agroforestryList = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const otherFarmEnterprisesList = [
  { label: "cereals", value: "cereals" },
  { label: "legumes", value: "legumes" },
  { label: "trees", value: "trees" },
  { label: "poultry", value: "poultry" },
  { label: "livestock", value: "livestock" },
];

export const mapLayers = {
  OSM: "Open Street Map",
  GMAP: "Google Map",
  GMAP_SAT: "Google Map Satellite",
  GMAP_TERRAIN: "Google Map Terrain",
};

export const locationType = {
  POINT: "Point",
  MULTI_POINT: "MultiPoint",
};
