import { PageHeading } from "@components/@core/layout";
import React from "react";

import InspectionForm from "./form";

export default function CreateInspectionReportComponent() {
  return (
    <div>
      <PageHeading>📝 Create Inspection Report</PageHeading>
      <InspectionForm />
    </div>
  );
}
