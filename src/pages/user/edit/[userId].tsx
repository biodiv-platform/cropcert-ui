import UserEditPageComponent from "@components/pages/user/edit";
import { axGetUserById } from "@services/user.service";
import { ROLES } from "@static/constants";
import { adminOrAuthor, hasAccess } from "@utils/auth";
import React from "react";

const UserEditPage = ({ user, statusCode, isAdmin }) =>
  statusCode ? "ERR" : <UserEditPageComponent user={user} isAdmin={isAdmin} />;

UserEditPage.getInitialProps = async (ctx) => {
  const { success, data: user } = await axGetUserById(ctx.query.userId, ctx);
  const statusCode = success ? (adminOrAuthor(user?.id, ctx) ? null : 401) : 404;
  const isAdmin = hasAccess([ROLES.ADMIN], ctx);
  return { user, isAdmin, statusCode };
};

export default UserEditPage;
