import FarmerEditPageComponent from "@components/pages/farmer-member/edit";
import { axGetFarmerById } from "@services/farmer.service";
import React from "react";

const FarmerEditPage = ({ farmer }) => <FarmerEditPageComponent edit={farmer} />;

FarmerEditPage.getInitialProps = async (ctx) => {
  const { data } = await axGetFarmerById(ctx.query.id, ctx);
  return { farmer: data };
};

export default FarmerEditPage;
