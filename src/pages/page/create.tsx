import { authorizedPageSSP } from "@components/auth/auth-redirect";
import PageCreatePageComponent from "@components/pages/page/create";
import { ROLES } from "@static/constants";
import React from "react";

export default function PageCreatePage() {
  return <PageCreatePageComponent />;
}

export const getServerSideProps = async (ctx) => {
  const redirect = authorizedPageSSP([ROLES.AUTHORIZED], ctx);
  return redirect || { props: {} };
};
