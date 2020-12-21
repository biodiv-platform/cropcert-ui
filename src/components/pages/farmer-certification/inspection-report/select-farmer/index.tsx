import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { DB_CONFIG } from "@static/inspection-report";
import React from "react";
import IndexedDBProvider from "use-indexeddb";

import FarmerList from "./farmer-list";

export default function SelectFarmerComponent() {
  return (
    <div>
      <IndexedDBProvider config={DB_CONFIG}>
        <InspectionReportProvider>
          <FarmerList />
        </InspectionReportProvider>
      </IndexedDBProvider>
    </div>
  );
}
