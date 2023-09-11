import UserEditPageComponent from "@components/pages/user/edit";
import { axIsOdkWebUser } from "@services/odk.service";
import { axGetUserById } from "@services/user.service";
import { ROLES } from "@static/constants";
import { adminOrAuthor, getParsedUser, hasAccess } from "@utils/auth";
import React from "react";

const UserEditPage = ({ user, statusCode, isAdmin, isOdkWebUser }) =>
  statusCode ? (
    "ERR"
  ) : (
    <UserEditPageComponent user={user} isOdkWebUser={isOdkWebUser} isAdmin={isAdmin} />
  );

UserEditPage.getInitialProps = async (ctx) => {
  const { success, data: user } = await axGetUserById(ctx.query.userId, ctx);
  const { data: isOdkWebUser } = await axIsOdkWebUser(ctx.query.userId);
  const statusCode = success ? (adminOrAuthor(user?.id, ctx) ? null : 401) : 404;
  const isAdmin = hasAccess([ROLES.ADMIN], getParsedUser(ctx));
  return { user, isAdmin, statusCode, isOdkWebUser };
};

export default UserEditPage;
