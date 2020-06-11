import { DateTime } from "@components/@core/formik";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

import GridRow from "../../row";
import { GP_OPTIONS, MFN_OPTIONS } from "../options";

export default function GeneralInformation() {
  return (
    <LotShowPanel title="General Information" icon="☑" isOpen={true}>
      <GridRow label="Any application of chemicals on intercrop" previous="Yes">
        <RadioGroupInputField name="chemicalsOnIntercrop" />
      </GridRow>
      <GridRow label="Chemical usage on non-coffee field" previous="Yes" bgGray={true}>
        <RadioGroupInputField name="chemicalsOnNonCoffeeField" />
      </GridRow>
      <GridRow label="Date of last use of chemicals on coffee field" previous="01-01-2020">
        <DateTime name="lastUsedChemicals" format="dd-MM-yyyy" defaultBlank={true} />
      </GridRow>
      <GridRow
        label="Cultivation not conducted within 5m of water source"
        previous="Yes"
        bgGray={true}
      >
        <RadioGroupInputField name="cutivatationNotConductedWithin5mWaterSource" />
      </GridRow>
      <GridRow label="No application of manure 90 days or less before harvest" previous="Yes">
        <RadioGroupInputField name="manure90DaysOrLossBeforeHarvest" />
      </GridRow>
      <GridRow label="Farmers Understanding of Organic FT Standards" previous="Good" bgGray={true}>
        <RadioGroupInputField name="understandingOfOrganicFTStandards" options={GP_OPTIONS} />
      </GridRow>
      <GridRow label="Weed Control Adequate" previous="Yes">
        <RadioGroupInputField name="weedControlAdequate" />
      </GridRow>
      <GridRow label="Non-Coffee Trees Planted" previous="None" bgGray={true}>
        <RadioGroupInputField name="nonCoffeeTreesPlanted" options={MFN_OPTIONS} />
      </GridRow>
      <GridRow label="Signs of Erosion" previous="Yes">
        <RadioGroupInputField name="signsOfErosion" />
      </GridRow>
      <GridRow label="Erosion Control Adequate" previous="Yes" bgGray={true}>
        <RadioGroupInputField name="erosionControlAdequate" />
      </GridRow>
      <GridRow label="Burning of crop waste" previous="Yes">
        <RadioGroupInputField name="burningOfCropWaste" />
      </GridRow>

      <GridRow label="Does the farmer hire labour" previous="Yes" bgGray={true}>
        <RadioGroupInputField name="farmerHireLabour" />
      </GridRow>
      <GridRow label="Is Labour Fairly Treated" previous="Yes">
        <RadioGroupInputField name="isLabourFairlyTreated" />
      </GridRow>
      <GridRow label="Child Labour" previous="Yes" bgGray={true}>
        <RadioGroupInputField name="isChildLabourImployed" />
      </GridRow>
      <GridRow label="Plastics Disposal" previous="None">
        <RadioGroupInputField name="plasticDisposal" options={MFN_OPTIONS} />
      </GridRow>
      <GridRow label="Other waste disposal adequate" previous="Yes" bgGray={true}>
        <RadioGroupInputField name="isOtherWasteDisposalAdequate" />
      </GridRow>
      <GridRow label="HH-Making Joint decision" previous="Yes">
        <RadioGroupInputField name="isHHMakingJointDecision" />
      </GridRow>
      <GridRow label="HH-taking farming as a Family Business" previous="Yes" bgGray={true}>
        <RadioGroupInputField name="isHHTakingFarmingAsFamilyBusiness" />
      </GridRow>
      <GridRow label="General comments" previous="Yes" mb={0}>
        <TextInputField name="comments" fast={true} />
      </GridRow>
    </LotShowPanel>
  );
}
