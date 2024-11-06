import { RestrictedAccess } from "@components/@core/layout";
import FarmerMemberPageComponent from "@components/pages/farmer-member/list";
import { FarmerFilterProvider } from "@components/pages/farmer-member/list/use-farmer-filter";
import { DEFAULT_FARMER_MEMBER_FILTER } from "@static/constants";
import React from "react";

function FarmerMemberListPage({ initialFilterParams }) {
  return (
    <RestrictedAccess>
      <FarmerFilterProvider
        filter={initialFilterParams}
        farmerData={initialFilterParams.farmerListData}
      >
        <FarmerMemberPageComponent />
      </FarmerFilterProvider>
    </RestrictedAccess>
  );
}

export const getServerSideProps = async (ctx) => {
  const CUSTOM_FILTER = { ...DEFAULT_FARMER_MEMBER_FILTER };

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

export default FarmerMemberListPage;
