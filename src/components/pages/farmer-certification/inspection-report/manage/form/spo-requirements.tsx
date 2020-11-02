import RadioGroupInputField from "@components/@core/formik/radio-group";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

import GridRow from "../../../row";

export default function SPORequirements() {
  return (
    <LotShowPanel title="SPO Requrements" icon="🔶" isOpen={true}>
      <GridRow
        label="Board and AGM Minutes kept"
        field={RadioGroupInputField}
        name="boardAGMMinutesKept"
      />

      <GridRow
        label="Membership lists and Shares (updated)"
        field={RadioGroupInputField}
        name="membershipListsAndSharesUpdated"
      />

      <GridRow
        label="Annual Budget and Audited Accounts"
        field={RadioGroupInputField}
        name="isAnnualBudgetAndAuditedAccounts"
      />

      <GridRow
        label="Fairtrade Premium Budget and Workplan"
        field={RadioGroupInputField}
        name="isFairTradePremiumBudgetAndWorkplan"
      />

      <GridRow
        label="Environment Committee and its workplan"
        field={RadioGroupInputField}
        name="isEnvirnmentCommitteAndItsWorkplan"
      />

      <GridRow
        label="FT Contact Person appointed"
        mb={0}
        field={RadioGroupInputField}
        name="isFTContractPersonAppointed"
      />
    </LotShowPanel>
  );
}
