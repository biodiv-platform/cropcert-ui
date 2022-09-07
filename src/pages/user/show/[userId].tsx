import UserShowPageComponent from "@components/pages/user/show";
import { axGetUserById } from "@services/user.service";
import { ROLES } from "@static/constants";
import { getParsedUser, hasAccess } from "@utils/auth";
import React from "react";

const UserShowPage = ({ user }) => <UserShowPageComponent user={user} />;

export const getServerSideProps = async (ctx) => {
  const { success, data: user } = await axGetUserById(ctx.query.userId, ctx);

  if (!success) return { notFound: true };

  return {
    props: {
      user: {
        ...user,
        isAdmin: hasAccess([ROLES.ADMIN], getParsedUser(ctx)),
      },
    },
  };
};

export default UserShowPage;
