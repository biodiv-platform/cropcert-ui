import { authorizedPageSSP } from "@components/auth/auth-redirect";
import PageEditPageComponent from "@components/pages/page/edit";
import { axGetPageByID } from "@services/pages.service";
import { ROLES } from "@static/constants";
import React from "react";

export default function PageEditPage({ data }) {
  return <PageEditPageComponent page={data} />;
}

export const getServerSideProps = async (ctx) => {
  const redirect = authorizedPageSSP([ROLES.AUTHORIZED], ctx);
  if (redirect) return redirect;

  const props = await axGetPageByID(ctx.query.pageId, "full");

  if (!props.success) return { notFound: true };

  return { props };
};
