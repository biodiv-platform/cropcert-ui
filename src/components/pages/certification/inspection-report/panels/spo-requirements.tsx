import RadioGroupInputField from "@components/@core/formik/radio-group";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

export default function SPORequirements() {
  return (
    <LotShowPanel title="SPO Requrements" icon="🔶" isOpen={true}>
      <CoreGrid rows={3}>
        <RadioGroupInputField name="boardAGMMinutesKept" label="Board and AGM Minutes kept" />
        <RadioGroupInputField
          name="membershipListsAndSharesUpdated"
          label="Membership lists and Shares (updated)"
        />
        <RadioGroupInputField
          name="isAnnualBudgetAndAuditedAccounts"
          label="Annual Budget and Audited Accounts"
        />
        <RadioGroupInputField
          name="isFairTradePremiumBudgetAndWorkplan"
          label="Fairtrade Premium Budget and Workplan"
        />
        <RadioGroupInputField
          name="isEnvirnmentCommitteAndItsWorkplan"
          label="Environment Committee and its workplan"
        />
        <RadioGroupInputField
          name="isFTContractPersonAppointed"
          label="FT Contact Person appointed"
        />
      </CoreGrid>
    </LotShowPanel>
  );
}
