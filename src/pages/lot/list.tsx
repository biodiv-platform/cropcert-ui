import { RestrictedAccess } from "@components/@core/layout";
import LotListPageComponent from "@components/pages/lot/list";
import React from "react";

export default function LotListPage() {
  return (
    <RestrictedAccess>
      <LotListPageComponent />
    </RestrictedAccess>
  );
}
