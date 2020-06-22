import { PageHeading } from "@components/@core/layout";
import { DB_CONFIG } from "@static/inspection-report";
import React from "react";
import IndexedDBProvider from "use-indexeddb";

import InspectionFormWrapper from "./form-wrapper";

export default function CreateInspectionReportComponent() {
  return (
    <div>
      <PageHeading>📝 Create Inspection Report</PageHeading>
      <IndexedDBProvider config={DB_CONFIG}>
        <InspectionFormWrapper />
      </IndexedDBProvider>
    </div>
  );
}
