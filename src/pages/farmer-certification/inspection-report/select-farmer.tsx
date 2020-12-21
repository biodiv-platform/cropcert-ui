import SelectFarmerComponent from "@components/pages/farmer-certification/inspection-report/select-farmer";
import React from "react";

export default function SelectFarmerPage({ feCCCode }) {
  return <SelectFarmerComponent feCCCode={feCCCode} />;
}

export function getServerSideProps(ctx) {
  return {
    props: {
      feCCCode: Number(ctx.query.feCCCode) || -1,
    },
  };
}
