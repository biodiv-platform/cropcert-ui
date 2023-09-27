import { MyUpload } from "@interfaces/files";
import { ENDPOINT } from "@static/constants";
import { LOCAL_ASSET_PREFIX } from "@static/observation-create";
import { waitForAuth } from "@utils/auth";
import http, { formDataHeaders } from "@utils/http";
import { nanoid } from "nanoid";

export const axQueryMediaGalleryTagsByText = async (query) => {
  try {
    const { data } = await http.get(`${ENDPOINT.UTILITY}/v1/services/tags/autocomplete`, {
      params: { phrase: query },
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axUpdateMediaGalleryTags = async (payload) => {
  try {
    await waitForAuth();

    const updatedPayload = {
      tagsMapping: {
        ...payload,
      },
    };

    const { data } = await http.put(
      `${ENDPOINT.UTILITY}/v1/services/tags/resource`,
      updatedPayload
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axMediaGalleryTagsFilterSearch = async (query) => {
  try {
    const { data } = await http.get(`${ENDPOINT.UTILITY}/v1/services/tags/autocomplete`, {
      params: { phrase: query },
    });
    return data.map((u) => ({ label: u.name, value: u.id }));
  } catch (e) {
    return { success: false, data: [] };
  }
};

export const axUploadMediaGalleryResource = async (mediaGallery: File): Promise<MyUpload> => {
  const formData = new FormData();
  formData.append("hash", LOCAL_ASSET_PREFIX + nanoid());
  formData.append("module", "resource");
  formData.append("upload", mediaGallery, mediaGallery.name);

  const { data } = await http.post(`${ENDPOINT.FILES}/upload/my-uploads`, formData, {
    headers: formDataHeaders,
  });

  return data;
};

export const axMediaGalleryResourceCreate = async (payload) => {
  try {
    const { data } = await http.post(
      `${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/create`,
      payload
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axMediaGalleryResourceUpload = async (payload) => {
  try {
    const { data } = await http.post(
      `${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/upload`,
      payload
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axGetAllMediaGallery = async () => {
  try {
    const { data } = await http.get(`${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/all`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const axGetMediaGalleryById = async (mId) => {
  try {
    const { data } = await http.get(
      `${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/editPage/${mId}`
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axUpdateMediaGalleryById = async (mId, payload) => {
  try {
    const { data } = await http.put(
      `${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/update/${mId}`,
      payload
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axDeleteMediaGalleryById = async (mId) => {
  try {
    const { data } = await http.delete(
      `${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/delete/${mId}`,
      {}
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axGetResourceById = async (rId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.RESOURCES}/v1/resource/${rId}`);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axGetAllResources = async (params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.RESOURCES}/v1/resource/all`, { params });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axBulkResourceMapping = async (payload) => {
  try {
    const { data } = await http.put(
      `${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/bulkResourceMapping`,
      payload
    );
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axGetMediaGallery = async (params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/show`, {
      params,
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axGetMediaGalleryList = async (params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.RESOURCES}/v1/resource/mediaGallery/list`, {
      params: { ...params },
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axRateResource = async (resourceId, rating) => {
  try {
    await waitForAuth();
    await http.put(`${ENDPOINT.RESOURCES}/v1/resource/update/rating/resource/${resourceId}`, {
      resourceId,
      rating,
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axEditResource = async (payload) => {
  try {
    await waitForAuth();
    await http.put(`${ENDPOINT.RESOURCES}/v1/resource/update/`, payload);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axDeleteResource = async (resourceId) => {
  try {
    await waitForAuth();
    await http.delete(`${ENDPOINT.RESOURCES}/v1/resource/delete/${resourceId}`, {});
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
