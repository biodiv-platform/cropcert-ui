import { ENDPOINT } from "@static/constants";

export const RESOURCE_CTX = {
  MY_UPLOADS: "MY_UPLOADS",
  PAGES: "PAGES",
  DOCUMENT_SOCIAL_PREVIEW: "DOCUMENT_SOCIAL_PREVIEW",
};

const RESOURCE_CTX_MAP = {
  MY_UPLOADS: "myUploads",
  PAGES: "pages",
  RESOURCE: "resources",
  DOCUMENT_SOCIAL_PREVIEW: "documentSocialPreview",
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

export const getNextResourceThumbnail = (resourceId, size) => {
  return resourceId ? `${ENDPOINT.RESOURCES}/v1/resource/image/${resourceId}${size}` : undefined;
};

export const getNextResourceRAW = (resourceId) => {
  return resourceId ? `${ENDPOINT.RESOURCES}/v1/resource/image/${resourceId}` : undefined;
};

export const getCropThumbnail = (resourceType, resourceUrl, size) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/${RESOURCE_CTX_MAP[resourceType]}/${resourceUrl}${size}`
    : undefined;
};

export const getUserImage = (resourceUrl, name, w = 50) => {
  return resourceUrl
    ? resourceUrl.startsWith("http")
      ? resourceUrl
      : `${ENDPOINT.FILES}/get/crop/users${resourceUrl}?w=${w}`
    : `/api/avatar?t=${name}&s=${w}`;
};

export const getLocalIcon = (icon, type = "species") =>
  `/next-assets/${type}/${icon || "Unknown"}.svg`;

export const getTraitIcon = (resourceUrl, w = 40) => {
  return resourceUrl.startsWith("/next-assets/")
    ? resourceUrl
    : `${ENDPOINT.FILES}/get/crop/traits${resourceUrl}?w=${w}`;
};

/**
 * Uses Google Docs viewer to avoid CORS issue
 *
 * @param {string} resourceUrl
 * @return {*}  {string}
 */
export const getDocumentPath = (resourceUrl: string): string => {
  return `/pdf-viewer/?file=${getDocumentFilePath(resourceUrl)}`;
};

export const getDocumentFilePath = (resourceUrl: string): string => {
  return resourceUrl.startsWith("http")
    ? resourceUrl
    : `${ENDPOINT.RAW}/content/documents${resourceUrl}`;
};

/**
 * Parses YouTube video id from given Url
 * @param url
 * @returns YouTube video Id or blank
 */
export const getYouTubeId = (url) => {
  let ID = "";
  try {
    url = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      return;
    }
  } catch (e) {
    console.error(e);
  }
  return ID;
};

export const getYoutubeImage = (resourceUrl: string, size = "hqdefault") => {
  const ytid = getYouTubeId(resourceUrl);
  return ytid ? `https://i.ytimg.com/vi/${ytid}/${size}.jpg` : undefined;
};
