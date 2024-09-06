import { RestrictedAccess } from "@components/@core/layout";
import FarmerMemberPageComponent from "@components/pages/farmer-member/list";
import { FarmerFilterProvider } from "@components/pages/farmer-member/list/use-farmer-filter";
import { DEFAULT_FARMER_MEMBER_FILTER } from "@static/constants";
import React from "react";

export default function FarmerMemberListPage() {
  return (
    <RestrictedAccess>
      <FarmerFilterProvider filter={DEFAULT_FARMER_MEMBER_FILTER}>
        <FarmerMemberPageComponent />
      </FarmerFilterProvider>
    </RestrictedAccess>
  );
}
