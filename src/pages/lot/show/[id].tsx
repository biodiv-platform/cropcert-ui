import LotShowPageComponent from "@components/pages/lot/show";
import { axGetLotById } from "@services/lot.service";
import React from "react";

const LotShowPage = ({ lot }) => <LotShowPageComponent show={lot} />;

LotShowPage.getInitialProps = async ctx => {
  const { data } = await axGetLotById(ctx.query.id, ctx);
  return { lot: data };
};

export default LotShowPage;
