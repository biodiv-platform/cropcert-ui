import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axListPages = async () => {
  try {
    const res = await http.get(`${ENDPOINT.PAGES}/page/all`, {
      headers: { unauthorized: true },
    });
    return res.data.filter((p) => !p.isDeleted);
  } catch (e) {
    notification(e.message);
    return [];
  }
};

export const axDeletePageByPageId = async (id) => {
  try {
    const res = await http.delete(`${ENDPOINT.PAGES}/page/${id}`);
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetPageByPageId = async (id) => {
  try {
    const res = await http.get(`${ENDPOINT.PAGES}/page/${id}`, {
      headers: { unauthorized: true },
    });
    return { success: true, data: res.data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axUpdatePage = async (body, isEdit) => {
  try {
    const pHttp = isEdit ? http.put : http.post;
    const { data } = await pHttp(`${ENDPOINT.PAGES}/page`, body);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axUpdateTree = async (body) => {
  try {
    await http.put(`${ENDPOINT.PAGES}/page/tree`, body);
    return { success: true };
  } catch (e) {
    notification(e.message);
    return { success: false };
  }
};

export const axUploadHandler = (blobInfo, success, failure) => {
  const formData = new FormData();
  formData.append("upload", blobInfo.blob(), blobInfo.filename());

  http
    .post(`${ENDPOINT.PAGES}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((r) => {
      success(r.data.url);
    })
    .catch((e) => {
      failure("Error");
    });
};
