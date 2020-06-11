import { DateTime } from "@components/@core/formik";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

import GridRow from "../../row";

export default function Recommendation() {
  return (
    <LotShowPanel title="Recommandation" icon="🎖️" isOpen={true}>
      <GridRow label="If Farmer has made serious Violation, date when Violation report was sent to project Supervisor">
        <DateTime name="violationDate" format="dd-MM-yyyy" defaultBlank={true} />
      </GridRow>
      <GridRow label="Recommended Organic certification" mb={0}>
        <RadioGroupInputField name="isRecommendedOrganicCertificatation" />
      </GridRow>
    </LotShowPanel>
  );
}
