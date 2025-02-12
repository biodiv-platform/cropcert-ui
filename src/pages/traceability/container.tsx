import { RestrictedAccess } from "@components/@core/layout";
import ContainerListPageComponent from "@components/pages/container/list";
import { ContainerFilterProvider } from "@components/pages/container/list/use-container-filter";
import { DEFAULT_CONTAINER_FILTER } from "@static/constants";
import React from "react";

function ContainerListPage({ initialFilterParams }) {
  return (
    <RestrictedAccess>
      <ContainerFilterProvider
        filter={initialFilterParams}
        farmerData={initialFilterParams.lotListData}
      >
        <ContainerListPageComponent />
      </ContainerFilterProvider>
    </RestrictedAccess>
  );
}

ContainerListPage.config = {
  footer: false,
};

export const getServerSideProps = async (ctx) => {
  const CUSTOM_FILTER = { ...DEFAULT_CONTAINER_FILTER };

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

export default ContainerListPage;
