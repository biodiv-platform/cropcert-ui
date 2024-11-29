import { RestrictedAccess } from "@components/@core/layout";
import FarmerProducePageComponent from "@components/pages/farmer-produce/list";
import { FarmerProduceFilterProvider } from "@components/pages/farmer-produce/list/use-farmer-produce-filter";
import { DEFAULT_FARMER_PRODUCE_FILTER } from "@static/constants";
import React from "react";

function FarmerProduceListPage({ initialFilterParams }) {
  return (
    <RestrictedAccess>
      <FarmerProduceFilterProvider
        filter={initialFilterParams}
        farmerData={initialFilterParams.farmerProduceListData}
      >
        <FarmerProducePageComponent />
      </FarmerProduceFilterProvider>
    </RestrictedAccess>
  );
}

export const getServerSideProps = async (ctx) => {
  const CUSTOM_FILTER = { ...DEFAULT_FARMER_PRODUCE_FILTER };

  const initialFilterParams = {
    ...CUSTOM_FILTER,
    ...ctx.query,
  };
  return {
    props: {
      initialFilterParams,
    },
  };
};

export default FarmerProduceListPage;
