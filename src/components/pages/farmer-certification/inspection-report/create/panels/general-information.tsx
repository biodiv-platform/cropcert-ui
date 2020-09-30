import { DateTime } from "@components/@core/formik";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import { formattedDate } from "@utils/basic.util";
import React from "react";

import GridRow from "../../../row";
import { GP_OPTIONS, MFN_OPTIONS } from "../options";
import { GI_PANEL } from "./data";

function GeneralInformation({ i }) {
  return (
    <LotShowPanel title={GI_PANEL.title} icon={GI_PANEL.icon} isOpen={true}>
      <GridRow
        label={GI_PANEL.keys.chemicalsOnIntercrop}
        previous={i?.chemicalsOnIntercrop}
        field={RadioGroupInputField}
        name="chemicalsOnIntercrop"
      />

      <GridRow
        label={GI_PANEL.keys.chemicalsOnNonCoffeeField}
        previous={i?.chemicalsOnNonCoffeeField}
        bgGray={true}
        field={RadioGroupInputField}
        name="chemicalsOnNonCoffeeField"
      />

      <GridRow
        label={GI_PANEL.keys.lastUsedChemicals}
        previous={formattedDate(i?.lastUsedChemicals, true)}
        field={DateTime}
        name="lastUsedChemicals"
        format="dd-MM-yyyy"
        defaultBlank={true}
      />

      <GridRow
        label={GI_PANEL.keys.cutivatationNotConductedWithin5mWaterSource}
        previous={i?.cutivatationNotConductedWithin5mWaterSource}
        bgGray={true}
        field={RadioGroupInputField}
        name="cutivatationNotConductedWithin5mWaterSource"
      />

      <GridRow
        label={GI_PANEL.keys.manure90DaysOrLossBeforeHarvest}
        previous={i?.manure90DaysOrLossBeforeHarvest}
        field={RadioGroupInputField}
        name="manure90DaysOrLossBeforeHarvest"
      />

      <GridRow
        label={GI_PANEL.keys.understandingOfOrganicFTStandards}
        previous={i?.understandingOfOrganicFTStandards}
        bgGray={true}
        field={RadioGroupInputField}
        name="understandingOfOrganicFTStandards"
        options={GP_OPTIONS}
      />

      <GridRow
        label={GI_PANEL.keys.weedControlAdequate}
        previous={i?.weedControlAdequate}
        field={RadioGroupInputField}
        name="weedControlAdequate"
      />

      <GridRow
        label={GI_PANEL.keys.nonCoffeeTreesPlanted}
        previous={i?.nonCoffeeTreesPlanted}
        bgGray={true}
        field={RadioGroupInputField}
        name="nonCoffeeTreesPlanted"
        options={MFN_OPTIONS}
      />

      <GridRow
        label={GI_PANEL.keys.signsOfErosion}
        previous={i?.signsOfErosion}
        field={RadioGroupInputField}
        name="signsOfErosion"
      />

      <GridRow
        label={GI_PANEL.keys.erosionControlAdequate}
        previous={i?.erosionControlAdequate}
        bgGray={true}
        field={RadioGroupInputField}
        name="erosionControlAdequate"
      />

      <GridRow
        label={GI_PANEL.keys.burningOfCropWaste}
        previous={i?.burningOfCropWaste}
        field={RadioGroupInputField}
        name="burningOfCropWaste"
      />

      <GridRow
        label={GI_PANEL.keys.farmerHireLabour}
        previous={i?.farmerHireLabour}
        bgGray={true}
        field={RadioGroupInputField}
        name="farmerHireLabour"
      />

      <GridRow
        label={GI_PANEL.keys.isLabourFairlyTreated}
        previous={i?.isLabourFairlyTreated}
        field={RadioGroupInputField}
        name="isLabourFairlyTreated"
      />

      <GridRow
        label={GI_PANEL.keys.isChildLabourImployed}
        previous={i?.isChildLabourImployed}
        bgGray={true}
        field={RadioGroupInputField}
        name="isChildLabourImployed"
      />

      <GridRow
        label={GI_PANEL.keys.plasticDisposal}
        previous={i?.plasticDisposal}
        field={RadioGroupInputField}
        name="plasticDisposal"
        options={MFN_OPTIONS}
      />

      <GridRow
        label={GI_PANEL.keys.isOtherWasteDisposalAdequate}
        previous={i?.isOtherWasteDisposalAdequate}
        bgGray={true}
        field={RadioGroupInputField}
        name="isOtherWasteDisposalAdequate"
      />

      <GridRow
        label={GI_PANEL.keys.isHHMakingJointDecision}
        previous={i?.isHHMakingJointDecision}
        field={RadioGroupInputField}
        name="isHHMakingJointDecision"
      />

      <GridRow
        label={GI_PANEL.keys.isHHTakingFarmingAsFamilyBusiness}
        previous={i?.isHHTakingFarmingAsFamilyBusiness}
        bgGray={true}
        field={RadioGroupInputField}
        name="isHHTakingFarmingAsFamilyBusiness"
      />

      <GridRow
        label={GI_PANEL.keys.comments}
        previous={i?.comments}
        mb={0}
        field={TextInputField}
        name="comments"
        fast={true}
      />
    </LotShowPanel>
  );
}

export default GeneralInformation;
