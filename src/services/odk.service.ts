import { ENDPOINT } from "@static/constants";
import http from "@utils/http";

export const axGetOdkProjectList = async () => {
  try {
    const { data } = await http.get(`${ENDPOINT.ODK}/all/projects`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const axGetOdkProjectListBysUserIdForAppUser = async (sUserId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.ODK}/app-user/projects/${sUserId}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const axGetOdkUser = async () => {
  try {
    const { data } = await http.get(`${ENDPOINT.ODK}/user/all`);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axIsOdkWebUser = async (suSerId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.ODK}/is-web-user/${suSerId}`);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axCreateOdkUser = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.ODK}/create/user`, payload);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const axDeleteWebUser = async ({ sUserId, userName }) => {
  try {
    const { status } = await http.delete(`${ENDPOINT.ODK}/remove/web-user/${sUserId}/${userName}`);
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axDeleteAppUser = async ({ userName, projectId }) => {
  try {
    const { status } = await http.delete(`${ENDPOINT.ODK}/remove/app-user/${userName}/${projectId}`);
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
