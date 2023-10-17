import FarmerShowPageComponent from "@components/pages/lot/show";
import { axGetFarmerById } from "@services/farmer.service";
import React from "react";

const FarmerShowPage = ({ farmer }) => <FarmerShowPageComponent show={farmer} />;

FarmerShowPage.getInitialProps = async (ctx) => {
  const { data } = await axGetFarmerById(ctx.query.id, ctx);
  return { farmer: data };
};

export default FarmerShowPage;
