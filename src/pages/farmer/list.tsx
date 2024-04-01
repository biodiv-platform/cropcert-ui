import { RestrictedAccess } from "@components/@core/layout";
import { FarmerMemberFilterProvider } from "@components/pages/farmer-member/common/use-farmer-member-filter";
import FarmerMemberPageComponent from "@components/pages/farmer-member/list";
import { axListFarmerMember } from "@services/farmer.service";
import { DEFAULT_FILTER, LIST_PAGINATION_LIMIT } from "@static/traceability";
import React from "react";

export default function FarmerMemberListPage({
  farmerMemberData,
  initialFilterParams,
  nextOffset,
}) {
  return (
    <RestrictedAccess>
      <FarmerMemberFilterProvider filter={initialFilterParams} farmerMemberData={farmerMemberData}>
        <FarmerMemberPageComponent />
      </FarmerMemberFilterProvider>
    </RestrictedAccess>
  );
}

FarmerMemberListPage.config = {
  footer: false,
};

FarmerMemberListPage.getInitialProps = async (ctx) => {
  const nextOffset = (Number(ctx.query.offset) || LIST_PAGINATION_LIMIT) + LIST_PAGINATION_LIMIT;

  const initialFilterParams = { ...DEFAULT_FILTER, ...ctx.query };

  // const { data } = await axGetListData(initialFilterParams);
  const { data } = await axListFarmerMember(initialFilterParams); //TODO: get ccCodes from user

  return {
    farmerMemberData: {
      l: data.data,
      n: data.totalCount,
      ag: data.aggregation,
      mvp: {},
      hasMore: true,
    },
    nextOffset,
    initialFilterParams,
  };
};
