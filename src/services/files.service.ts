import { ENDPOINT } from "@static/constants";
import http, { formDataHeaders } from "@utils/http";
import { nanoid } from "nanoid";

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
