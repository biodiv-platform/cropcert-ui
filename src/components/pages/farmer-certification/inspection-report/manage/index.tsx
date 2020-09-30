import { PageHeading } from "@components/@core/layout";
import React from "react";
import InspectionReportApprovalForm from "./form";

import InspectionReportPreview from "./report";

export default function ManageInspectionReport({ report }) {
  return (
    <div>
      <PageHeading>📄 Inspection Report #{report.id}</PageHeading>
      <InspectionReportPreview report={report} />
      <InspectionReportApprovalForm report={report} />
    </div>
  );
}
