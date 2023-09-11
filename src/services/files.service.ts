import { MyUpload } from "@interfaces/files";
import { ResourceMediaGallery } from "@interfaces/media";
import { ENDPOINT, RESOURCE_TYPE } from "@static/constants";
import { LOCAL_ASSET_PREFIX } from "@static/observation-create";
import http, { formDataHeaders } from "@utils/http";
import { nanoid } from "nanoid";

export const axListMyUploads = async (module = RESOURCE_TYPE.OBSERVATION) => {
  try {
    const { data } = await http.get(`${ENDPOINT.FILES}/upload/my-uploads`, { params: { module } });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axRemoveMyUploads = async ({ path }) => {
  try {
    await http.post(`${ENDPOINT.FILES}/upload/remove-file`, {
      path,
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axUploadDocumentResource = async (document: File): Promise<MyUpload> => {
  const formData = new FormData();
  formData.append("hash", LOCAL_ASSET_PREFIX + nanoid());
  formData.append("module", "document");
  formData.append("upload", document, document.name);

  const { data } = await http.post(`${ENDPOINT.FILES}/upload/my-uploads`, formData, {
    headers: formDataHeaders,
  });

  return data;
};

export const axUploadMediaGalleryResource = async (
  resource: ResourceMediaGallery,
  module = "resource"
) => {
  try {
    const formData = new FormData();
    formData.append("hash", resource.hashKey);
    formData.append("module", module);
    formData.append("upload", resource.blob, resource.fileName);

    const { data } = await http.post(`${ENDPOINT.FILES}/upload/my-uploads`, formData, {
      headers: formDataHeaders,
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

/**
 * Used for uploading `userGrpoup` logo
 *
 * @param {IDBObservationAsset} resource
 * @returns
 */
export const axUploadResource = async (resource: File, directory, nestedPath?: string) => {
  try {
    const formData = new FormData();
    formData.append("hash", nanoid());
    formData.append("upload", resource, resource.name);
    formData.append("directory", directory);
    formData.append("resource", "true");
    nestedPath && formData.append("nestedFolder", nestedPath);

    const { data } = await http.post(`${ENDPOINT.FILES}/upload/resource-upload`, formData, {
      headers: formDataHeaders,
    });

    return { success: true, data: data.uri };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
