import BatchShowPageComponent from "@components/pages/batch/show";
import { axGetBatchById } from "@services/batch.service";
import React from "react";

const BatchShowPage = ({ batch }) => <BatchShowPageComponent show={batch} />;

BatchShowPage.getInitialProps = async (ctx) => {
  const { data } = await axGetBatchById(ctx.query.id, ctx);
  return { batch: data };
};

export default BatchShowPage;
