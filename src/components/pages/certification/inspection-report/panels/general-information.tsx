import { Accordion } from "@chakra-ui/core";
import { DateTime } from "@components/@core/formik";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

export default function GeneralInformation() {
  return (
    <LotShowPanel title="General Information" icon="☑" isOpen={true}>
      <CoreGrid rows={3}>
        <DateTime
          name="lastUsedChemicals"
          format="dd-MM-yyyy"
          label="Date of last use of chemicals on coffee field"
          defaultBlank={true}
        />
        <RadioGroupInputField
          name="chemicalsOnIntercrop"
          label="Any application of chemicals on intercrop"
        />
        <RadioGroupInputField
          name="chemicalsOnNonCoffeeField"
          label="Chemical usage on non-coffee field"
        />
        <RadioGroupInputField
          name="manure90DaysOrLossBeforeHarvest"
          label="No application of manure 90 days or less before harvest"
        />
        <RadioGroupInputField
          name="understandingOfOrganicFTStandards"
          label="Farmers Understanding of Organic FT Standards"
        />
        <RadioGroupInputField name="weedControlAdequate" label="Weed Control Adequate" />

        <RadioGroupInputField name="nonCoffeeTreesPlanted" label="Non-Coffee Trees Planted" />
        <RadioGroupInputField name="signsOfErosion" label="Signs of Erosion" />
        <RadioGroupInputField name="erosionControlAdequate" label="Erosion Control Adequate" />

        <RadioGroupInputField name="burningOfCropWaste" label="Burning of crop waste" />
        <RadioGroupInputField name="farmerHireLabour" label="Does the farmer hire labour" />
        <RadioGroupInputField name="isLabourFairlyTreated" label="Is Labour Fairly Treated" />

        <RadioGroupInputField name="isChildLabourImployed" label="Child Labour" />
        <RadioGroupInputField name="plasticDisposal" label="Plastics Disposal" />
        <RadioGroupInputField
          name="isOtherWasteDisposalAdequate"
          label="Other waste disposal adequate"
        />

        <RadioGroupInputField name="isHHMakingJointDecision" label="HH-Making Joint decision" />
        <RadioGroupInputField
          name="isHHTakingFarmingAsFamilyBusiness"
          label="HH-taking farming as a Family Business"
        />
        <TextInputField name="comments" label="General comments" fast={true} />
      </CoreGrid>
    </LotShowPanel>
  );
}
