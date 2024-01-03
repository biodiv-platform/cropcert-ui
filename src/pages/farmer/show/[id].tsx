import FarmerShowPageComponent from "@components/pages/farmer-member/show";
import { axGetFarmerByIdWithBatchAndFarmerProduce } from "@services/farmer.service";
import React from "react";

const FarmerShowPage = ({ farmer }) => <FarmerShowPageComponent show={farmer} />;

FarmerShowPage.getInitialProps = async (ctx) => {
  const { data } = await axGetFarmerByIdWithBatchAndFarmerProduce(ctx.query.id, ctx);
  return { farmer: data };
};

export default FarmerShowPage;
