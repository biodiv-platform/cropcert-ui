import UserShowPageComponent from "@components/pages/user/show";
import { axGetUserById } from "@services/user.service";
import React from "react";

const UserShowPage = ({ user }) => <UserShowPageComponent user={user} />;

export const getServerSideProps = async (ctx) => {
  const { success, data: user } = await axGetUserById(ctx.query.userId, ctx);

  if (!success) return { notFound: true };

  return { props: { user } };
};

export default UserShowPage;
