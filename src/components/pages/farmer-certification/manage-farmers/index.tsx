import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { setupDB } from "@utils/db";
import React, { useEffect } from "react";

import DownloadTable from "./download-table";

export default function ManageFarmersComponent() {
  useEffect(() => {
    setupDB();
  }, []);

  return (
    <Container>
      <PageHeading>🚚 Select Collection Center</PageHeading>
      <InspectionReportProvider>
        <DownloadTable />
      </InspectionReportProvider>
    </Container>
  );
}
