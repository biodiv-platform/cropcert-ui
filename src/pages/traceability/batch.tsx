import { RestrictedAccess } from "@components/@core/layout";
import BatchListPageComponent from "@components/pages/batch/list";
import { BatchFilterProvider } from "@components/pages/batch/list/use-batch-filter";
import { DEFAULT_BATCH_FILTER } from "@static/constants";
import React from "react";

function BatchListPage({ initialFilterParams }) {
  return (
    <RestrictedAccess>
      <BatchFilterProvider
        filter={initialFilterParams}
        farmerData={initialFilterParams.batchListData}
      >
        <BatchListPageComponent />
      </BatchFilterProvider>
    </RestrictedAccess>
  );
}

export const getServerSideProps = async (ctx) => {
  const CUSTOM_FILTER = { ...DEFAULT_BATCH_FILTER };

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

export default BatchListPage;
