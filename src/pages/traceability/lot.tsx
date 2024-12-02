import { RestrictedAccess } from "@components/@core/layout";
import LotListPageComponent from "@components/pages/lot/list";
import { LotFilterProvider } from "@components/pages/lot/list/use-lot-filter";
import { DEFAULT_LOT_FILTER } from "@static/constants";
import React from "react";

function LotListPage({ initialFilterParams }) {
  return (
    <RestrictedAccess>
      <LotFilterProvider filter={initialFilterParams} farmerData={initialFilterParams.lotListData}>
        <LotListPageComponent />
      </LotFilterProvider>
    </RestrictedAccess>
  );
}

export const getServerSideProps = async (ctx) => {
  const CUSTOM_FILTER = { ...DEFAULT_LOT_FILTER };

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

export default LotListPage;
