import { ENDPOINT, MESSAGE } from "@utils/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axListPages = async () => {
  try {
    const res = await http.get(`${ENDPOINT.PAGES}/page/all`, {
      headers: { unauthorized: true },
    });
    return res.data;
  } catch (e) {
    notification(e);
    return [];
  }
};

export const axGetPageByPageId = async id => {
  try {
    const res = await http.get(`${ENDPOINT.PAGES}/page/${id}`, {
      headers: { unauthorized: true },
    });
    return { success: true, data: res.data };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return { success: false, data: {} };
  }
};

export const axUpdatePage = async (body, mode) => {
  try {
    const pHttp = mode === "create" ? http.post : http.put;
    const res = await pHttp(`${ENDPOINT.PAGES}/page`, body);
    return { success: true, id: res.data.title };
  } catch (e) {
    notification(MESSAGE.ERROR);
    return [];
  }
};

export const axUpdateTree = async body => {
  try {
    await http.put(`${ENDPOINT.PAGES}/page/tree`, body);
    notification(MESSAGE.TREE_UPDATE_SUCCESS, "success");
  } catch (e) {
    notification(e);
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
    .then(r => {
      success(r.data.url);
    })
    .catch(e => {
      failure("Error");
    });
};
