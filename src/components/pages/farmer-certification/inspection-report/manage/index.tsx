import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import React from "react";

import InspectionReportApprovalForm from "./form";
import InspectionReportPreview from "./report";

export default function ManageInspectionReport({
  currentReport,
  previousReport,
  showCurrent,
  version,
  subVersion,
}) {
  return (
    <Container>
      <PageHeading>📄 Inspection Report #{currentReport.id}</PageHeading>
      <InspectionReportPreview
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
      {showCurrent && (
        <InspectionReportApprovalForm
          report={currentReport}
          version={version}
          subVersion={subVersion}
        />
      )}
    </Container>
  );
}
