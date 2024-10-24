import FarmerProduceShowPageComponent from "@components/pages/farmer-produce/show";
import { axGetFarmerProduceDetailsById } from "@services/farmer.service";
import React from "react";

const FarmerShowPage = ({ farmerProduce }) => (
  <FarmerProduceShowPageComponent show={farmerProduce} />
);

FarmerShowPage.getInitialProps = async (ctx) => {
  const { data } = await axGetFarmerProduceDetailsById(ctx.query.id, ctx);
  return { farmerProduce: data };
};

export default FarmerShowPage;
