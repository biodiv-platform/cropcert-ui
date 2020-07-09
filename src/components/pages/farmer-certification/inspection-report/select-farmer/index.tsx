import { PageHeading } from "@components/@core/layout";
import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { DB_CONFIG } from "@static/inspection-report";
import React from "react";
import IndexedDBProvider from "use-indexeddb";

import FarmerList from "./farmer-list";

export default function SelectFarmerComponent() {
  return (
    <div>
      <PageHeading>👨‍🌾 Farmers List</PageHeading>

      <IndexedDBProvider config={DB_CONFIG}>
        <InspectionReportProvider>
          <FarmerList />
        </InspectionReportProvider>
      </IndexedDBProvider>
    </div>
  );
}
