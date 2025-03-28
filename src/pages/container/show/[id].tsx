import { axGetContainerById } from "@services/container.service";
import React from "react";

import ContainerShowPageComponent from "@/components/pages/container/show";

const ContainerShowPage = ({ lot }) => <ContainerShowPageComponent show={lot} />;

ContainerShowPage.getInitialProps = async (ctx) => {
  const { data } = await axGetContainerById(ctx.query.id, ctx);
  return { lot: data };
};

export default ContainerShowPage;
