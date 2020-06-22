import { DateTime } from "@components/@core/formik";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import { formattedDate } from "@utils/basic.util";
import React from "react";

import GridRow from "../../../row";
import { GP_OPTIONS, MFN_OPTIONS } from "../options";

function GeneralInformation({ i }) {
  return (
    <LotShowPanel title="General Information" icon="☑" isOpen={true}>
      <GridRow
        label="Any application of chemicals on intercrop"
        previous={i?.chemicalsOnIntercrop}
        field={RadioGroupInputField}
        name="chemicalsOnIntercrop"
      />

      <GridRow
        label="Chemical usage on non-coffee field"
        previous={i?.chemicalsOnNonCoffeeField}
        bgGray={true}
        field={RadioGroupInputField}
        name="chemicalsOnNonCoffeeField"
      />

      <GridRow
        label="Date of last use of chemicals on coffee field"
        previous={formattedDate(i?.lastUsedChemicals, true)}
        field={DateTime}
        name="lastUsedChemicals"
        format="dd-MM-yyyy"
        defaultBlank={true}
      />

      <GridRow
        label="Cultivation not conducted within 5m of water source"
        previous={i?.cutivatationNotConductedWithin5mWaterSource}
        bgGray={true}
        field={RadioGroupInputField}
        name="cutivatationNotConductedWithin5mWaterSource"
      />

      <GridRow
        label="No application of manure 90 days or less before harvest"
        previous={i?.manure90DaysOrLossBeforeHarvest}
        field={RadioGroupInputField}
        name="manure90DaysOrLossBeforeHarvest"
      />

      <GridRow
        label="Farmers Understanding of Organic FT Standards"
        previous={i?.understandingOfOrganicFTStandards}
        bgGray={true}
        field={RadioGroupInputField}
        name="understandingOfOrganicFTStandards"
        options={GP_OPTIONS}
      />

      <GridRow
        label="Weed Control Adequate"
        previous={i?.weedControlAdequate}
        field={RadioGroupInputField}
        name="weedControlAdequate"
      />

      <GridRow
        label="Non-Coffee Trees Planted"
        previous={i?.nonCoffeeTreesPlanted}
        bgGray={true}
        field={RadioGroupInputField}
        name="nonCoffeeTreesPlanted"
        options={MFN_OPTIONS}
      />

      <GridRow
        label="Signs of Erosion"
        previous={i?.signsOfErosion}
        field={RadioGroupInputField}
        name="signsOfErosion"
      />

      <GridRow
        label="Erosion Control Adequate"
        previous={i?.erosionControlAdequate}
        bgGray={true}
        field={RadioGroupInputField}
        name="erosionControlAdequate"
      />

      <GridRow
        label="Burning of crop waste"
        previous={i?.burningOfCropWaste}
        field={RadioGroupInputField}
        name="burningOfCropWaste"
      />

      <GridRow
        label="Does the farmer hire labour"
        previous={i?.farmerHireLabour}
        bgGray={true}
        field={RadioGroupInputField}
        name="farmerHireLabour"
      />

      <GridRow
        label="Is Labour Fairly Treated"
        previous={i?.isLabourFairlyTreated}
        field={RadioGroupInputField}
        name="isLabourFairlyTreated"
      />

      <GridRow
        label="Child Labour"
        previous={i?.isChildLabourImployed}
        bgGray={true}
        field={RadioGroupInputField}
        name="isChildLabourImployed"
      />

      <GridRow
        label="Plastics Disposal"
        previous={i?.plasticDisposal}
        field={RadioGroupInputField}
        name="plasticDisposal"
        options={MFN_OPTIONS}
      />

      <GridRow
        label="Other waste disposal adequate"
        previous={i?.isOtherWasteDisposalAdequate}
        bgGray={true}
        field={RadioGroupInputField}
        name="isOtherWasteDisposalAdequate"
      />

      <GridRow
        label="HH-Making Joint decision"
        previous={i?.isHHMakingJointDecision}
        field={RadioGroupInputField}
        name="isHHMakingJointDecision"
      />

      <GridRow
        label="HH-taking farming as a Family Business"
        previous={i?.isHHTakingFarmingAsFamilyBusiness}
        bgGray={true}
        field={RadioGroupInputField}
        name="isHHTakingFarmingAsFamilyBusiness"
      />

      <GridRow
        label="General comments"
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
