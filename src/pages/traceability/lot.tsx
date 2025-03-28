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

LotListPage.config = {
  footer: false,
};

export const getServerSideProps = async (ctx) => {
  const CUSTOM_FILTER = { ...DEFAULT_LOT_FILTER, lotStatus: "ready_for_container,pending" };

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
