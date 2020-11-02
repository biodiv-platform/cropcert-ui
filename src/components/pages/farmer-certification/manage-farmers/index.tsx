import { PageHeading } from "@components/@core/layout";
import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { DB_CONFIG } from "@static/inspection-report";
import React from "react";
import IndexedDBProvider from "use-indexeddb";

import DownloadTable from "./download-table";

export default function ManageFarmersComponent() {
  return (
    <div>
      <PageHeading>🚚 Select Collection Center</PageHeading>
      <IndexedDBProvider config={DB_CONFIG}>
        <InspectionReportProvider>
          <DownloadTable />
        </InspectionReportProvider>
      </IndexedDBProvider>
    </div>
  );
}
