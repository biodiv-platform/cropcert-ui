import { RestrictedAccess } from "@components/@core/layout";
import BatchListPageComponent from "@components/pages/batch/list";
import React from "react";

export default function BatchListPage() {
  return (
    <RestrictedAccess>
      <BatchListPageComponent />
    </RestrictedAccess>
  );
}
