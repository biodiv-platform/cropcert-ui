import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { SubmitButton } from "@components/form/submit-button";
import { SwitchField } from "@components/form/switch";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@icons/check";
import { axOdkSendMail } from "@services/activity.service";
import {
  axCreateOdkUser,
  axDeleteWebUser,
  axGetOdkProjectList,
  axGetOdkProjectListBysUserIdForAppUser,
} from "@services/odk.service";
import { axGetUserRoles, axUpdateUserPermissions } from "@services/user.service";
import { ROLES } from "@static/constants";
import notification, { NotificationType } from "@utils/notification";
import Router from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { UserEditPageComponentProps } from "..";
import AppUser from "./app-user";

export default function PermissionsTab({ user, isWebUser }: UserEditPageComponentProps) {
  const { t } = useTranslation();
  const [rolesList, setRolesList] = useState([]);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [userProjectList, setUserProjectList] = useState<any[]>();
  const [rolesOptionList, setRoleOptionList] = useState<any[]>([]);
  const [password, setPassword] = useState<string>();
  const [projectId, setProjectId] = useState<string>();

  let flag = true;

  useEffect(() => {
    axGetOdkProjectList().then(setProjectList);
    axGetUserRoles().then(setRolesList);
    axGetOdkProjectListBysUserIdForAppUser(user.id).then(setUserProjectList);
  }, []);

  useEffect(() => {
    setRoleOptionList(
      rolesList.map(({ authority, id }) => ({
        label: authority,
        value: id,
      }))
    );
  }, [rolesList]);

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        enabled: Yup.boolean().required(),
        accountExpired: Yup.boolean().required(),
        accountLocked: Yup.boolean().required(),
        passwordExpired: Yup.boolean().required(),
        odkWebUserEnabled: Yup.boolean().required(),
        roles: Yup.array().required(),
      })
    ),
    defaultValues: {
      enabled: user.enabled,
      accountExpired: user.accountExpired,
      accountLocked: user.accountLocked,
      passwordExpired: user.passwordExpired,
      odkWebUserEnabled: isWebUser,
      roles: user.roles?.map(({ id }) => id),
    },
  });

  const getRoleValueByLabel = (arr, label) => {
    for (const obj of arr) {
      if (obj.label === label) {
        return obj.value;
      }
    }
  };

  const handleOnUpdate = async ({ roles, odkWebUserEnabled, ...payload }) => {
    if (!isWebUser && password && !projectId) {
      const payload = {
        sUserId: user.id,
        email: user.email,
        username: user.userName,
        role: ROLES.ODK_WEB_USER,
        password: password,
      };
      await Promise.all([axCreateOdkUser(payload), axOdkSendMail(payload)]);
      roles.push(rolesOptionList.find((item) => item.label === ROLES.ODK_WEB_USER).value);
    }

    const odkWebUser = getRoleValueByLabel(rolesOptionList, ROLES.ODK_WEB_USER);
    const odkAppUser = getRoleValueByLabel(rolesOptionList, ROLES.ODK_APP_USER);

    if (isWebUser && !roles.includes(odkWebUser)) {
      await axDeleteWebUser({ userName: `${user.userName}-suser${user.id}`, sUserId: user.id });
    }

    if (userProjectList && projectId) {
      const payload = {
        sUserId: user.id,
        userId: user.id,
        email: user.email,
        username: user.userName,
        projectId: projectId,
        projectName: projectList
          .map((p) => (p.id === projectId ? p.name : null))
          .filter((p) => p !== null)[0],
        role: ROLES.ODK_APP_USER,
      };
      roles.push(rolesOptionList.find((item) => item.label === ROLES.ODK_APP_USER).value);
      await Promise.all([axCreateOdkUser(payload), axOdkSendMail(payload)]);
    } else if (userProjectList?.length && !roles.includes(odkAppUser)) {
      notification(t("user:app_user_update_error"));
      roles.push(rolesOptionList.find((item) => item.label === ROLES.ODK_APP_USER).value);
      flag = false;
    } else if (userProjectList?.length) {
      roles.push(rolesOptionList.find((item) => item.label === ROLES.ODK_APP_USER).value);
    } else {
      roles = roles.filter(
        (item) => item !== rolesOptionList.find((item) => item.label === ROLES.ODK_APP_USER).value
      );
    }
    const { success } = await axUpdateUserPermissions({
      id: user.id,
      roles: rolesList.filter(({ id }) => roles.includes(id)),
      ...payload,
    });
    if (flag) {
      if (success) {
        notification(t("user:updated"), NotificationType.Success);
      } else {
        notification(t("user:update_error"));
      }
    }
    Router.reload();
  };
  return userProjectList && rolesOptionList.length && projectList.length ? (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnUpdate)}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={4}>
          <div>
            <SwitchField name="enabled" label={t("user:enabled")} />
            <SwitchField name="accountExpired" label={t("user:expired")} />
            <SwitchField name="accountLocked" label={t("user:locked")} />
            <SwitchField name="passwordExpired" label={t("user:password_expired")} />
          </div>
        </SimpleGrid>
        <AppUser
          user={user}
          userProjectList={userProjectList}
          setUserProjectList={setUserProjectList}
          projectList={projectList}
          isWebUser={isWebUser}
          setPassword={setPassword}
          setProjectId={setProjectId}
        />
        <SelectMultipleInputField name="roles" label={t("user:roles")} options={rolesOptionList} />
        <SubmitButton leftIcon={<CheckIcon />}>{t("common:save")}</SubmitButton>
      </form>
    </FormProvider>
  ) : (
    <Spinner />
  );
}
