import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { setupDB } from "@utils/db";
import React, { useEffect } from "react";

import InspectionFormWrapper from "./form-wrapper";

export default function CreateInspectionReportComponent() {
  useEffect(() => {
    setupDB();
  }, []);

  return (
    <Container>
      <PageHeading>📝 Create Inspection Report</PageHeading>
      <InspectionFormWrapper />
    </Container>
  );
}
