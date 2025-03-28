import { ContainerRestrictedAccess } from "@components/@core/layout";
import ContainerListPageComponent from "@components/pages/container/list";
import { ContainerFilterProvider } from "@components/pages/container/list/use-container-filter";
import { DEFAULT_CONTAINER_FILTER } from "@static/constants";
import React from "react";

function ContainerListPage({ initialFilterParams }) {
  return (
    <ContainerRestrictedAccess>
      <ContainerFilterProvider
        filter={initialFilterParams}
        farmerData={initialFilterParams.lotListData}
      >
        <ContainerListPageComponent />
      </ContainerFilterProvider>
    </ContainerRestrictedAccess>
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
