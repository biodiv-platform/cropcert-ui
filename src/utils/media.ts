import { ENDPOINT } from "@static/constants";

export const RESOURCE_CTX = {
  PAGES: "PAGES",
};

const RESOURCE_CTX_MAP = {
  PAGES: "pages",
};

export const getResourceThumbnail = (resourceType, resourceUrl, size) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/${RESOURCE_CTX_MAP[resourceType]}/${resourceUrl}${size}`
    : undefined;
};

export const getResourceRAW = (resourceType, resourceUrl) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/raw/${RESOURCE_CTX_MAP[resourceType]}/${resourceUrl}`
    : undefined;
};
