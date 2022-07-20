import { DateTimeInputField } from "@components/form/datepicker";
import { RadioInputField } from "@components/form/radio";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

import GridRow from "../../../row";

export default function Recommendation() {
  return (
    <LotShowPanel title="Recommendation" icon="🎖️" isOpen={true}>
      <GridRow
        label="If Farmer has made serious Violation, date when Violation report was sent to project Supervisor"
        field={DateTimeInputField}
        name="violationDate"
        format="dd-MM-yyyy"
        defaultBlank={true}
      />

      <GridRow
        label="Recommended Organic certification"
        mb={0}
        field={RadioInputField}
        name="isRecommendedOrganicCertificatation"
      />
    </LotShowPanel>
  );
}
