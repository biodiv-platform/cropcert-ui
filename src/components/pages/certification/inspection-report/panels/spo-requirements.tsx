import RadioGroupInputField from "@components/@core/formik/radio-group";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

import GridRow from "../../row";

export default function SPORequirements() {
  return (
    <LotShowPanel title="SPO Requrements" icon="🔶" isOpen={true}>
      <GridRow label="Board and AGM Minutes kept">
        <RadioGroupInputField name="boardAGMMinutesKept" />
      </GridRow>
      <GridRow label="Membership lists and Shares (updated)">
        <RadioGroupInputField name="membershipListsAndSharesUpdated" />
      </GridRow>
      <GridRow label="Annual Budget and Audited Accounts">
        <RadioGroupInputField name="isAnnualBudgetAndAuditedAccounts" />
      </GridRow>
      <GridRow label="Fairtrade Premium Budget and Workplan">
        <RadioGroupInputField name="isFairTradePremiumBudgetAndWorkplan" />
      </GridRow>
      <GridRow label="Environment Committee and its workplan">
        <RadioGroupInputField name="isEnvirnmentCommitteAndItsWorkplan" />
      </GridRow>
      <GridRow label="FT Contact Person appointed" mb={0}>
        <RadioGroupInputField name="isFTContractPersonAppointed" />
      </GridRow>
    </LotShowPanel>
  );
}
