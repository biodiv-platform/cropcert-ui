import { Accordion } from "@chakra-ui/core";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

import Animals from "./panels/animals";
import CertificationStatus from "./panels/certification-status";
import Farm from "./panels/farm";
import GeneralInformation from "./panels/general-information";
import FarmerInformation from "./panels/information";
import Recommendation from "./panels/recommandation";
import SPORequirements from "./panels/spo-requirements";
import Summery from "./panels/summery";
import Signature from "./panels/signature";
import { Submit } from "@components/@core/formik";

export default function InspectionForm() {
  const inspectionForm = {
    validationSchema: yup.object().shape({
      lastUsedChemicals: yup.string().nullable(),
      chemicalsOnIntercrop: yup.boolean().required(),
      chemicalsOnNonCoffeeField: yup.boolean().required(),
      manure90DaysOrLossBeforeHarvest: yup.boolean().required(),
      understandingOfOrganicFTStandards: yup.boolean().required(),
      weedControlAdequate: yup.boolean().required(),
      nonCoffeeTreesPlanted: yup.string().required(),
      signsOfErosion: yup.boolean().required(),
      erosionControlAdequate: yup.boolean().required(),
      burningOfCropWaste: yup.boolean().required(),
      farmerHireLabour: yup.boolean().required(),
      isLabourFairlyTreated: yup.boolean().required(),
      isChildLabourImployed: yup.boolean().required(),
      plasticDisposal: yup.string().required(),
      isOtherWasteDisposalAdequate: yup.boolean().required(),
      isHHMakingJointDecision: yup.boolean().required(),
      isHHTakingFarmingAsFamilyBusiness: yup.boolean().required(),
      comments: yup.string().required(),

      // Farms
      farms: yup.array().of(
        yup.object().shape({
          id: yup.number(),
          fieldName: yup.string().required(),
          acres: yup.number().required(),
          mainCrop: yup.string().required(),
          intercrops: yup.string().required(),
          numberOfCoffeTrees: yup.number().required(),
          yeildEstimate: yup.number().required(),
          areaUnderCoffee: yup.number().required(),
          isCoffeeTreeWellMaintained: yup.boolean().required(),
          pruining: yup.string().required(),
          numberOfPruinedCoffeeTrees: yup.number().required(),
          stumping: yup.string().required(),
          numberOfStumpedTree: yup.number().required(),
          plantingNewCoffeeSeedings: yup.boolean().required(),
          lastUseOfNonAllowedChemicals: yup.string(),
          interPlotBufferZones: yup.boolean().required(),
          fieldSeparation: yup.string().required(),
          multipleOwnerWithOrganic: yup.boolean().required(),
        })
      ),

      // Summary
      numberOfCoffeeFields: yup.number().required(),
      areaUnderCoffee: yup.number().required(),
      productiveTrees: yup.number().required(),
      totalAreaOfFarm: yup.number().required(),

      knownToHarvestRipeCherries: yup.boolean().required(),
      practicesPostHarvestHandlling: yup.boolean().required(),

      // Animals
      hasLiveStock: yup.boolean().required(),
      chemicalTreatmentOnLivestock: yup.boolean().required(),
      livestockTreatmentConducted5mFromCoffee: yup.boolean().required(),
      animals: yup.array().of(
        yup.object().shape({
          type: yup.string().required(),
          number: yup.number().required(),
          husbandryType: yup.string().required(),
          medication: yup.boolean().required(),
        })
      ),

      // Recommandation
      hasFarmerImplementedPreviousAdvice: yup.string().required(),
      advices: yup.array().of(
        yup.object().shape({
          advice: yup.string().required(),
          time: yup.string().required(),
        })
      ),

      violationDate: yup.string().nullable(),

      isRecommendedOrganicCertificatation: yup.boolean().required(),

      // SPO Requirements
      boardAGMMinutesKept: yup.boolean().required(),
      membershipListsAndSharesUpdated: yup.boolean().required(),
      isAnnualBudgetAndAuditedAccounts: yup.boolean().required(),
      isFairTradePremiumBudgetAndWorkplan: yup.boolean().required(),
      isEnvirnmentCommitteAndItsWorkplan: yup.boolean().required(),
      isFTContractPersonAppointed: yup.boolean().required(),
    }),
    initialValues: {
      farms: [],
    },
  };

  const handleOnInspectionFormSubmit = async (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      {...inspectionForm}
      onSubmit={handleOnInspectionFormSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Accordion allowMultiple>
            <FarmerInformation />
            <CertificationStatus />
            <GeneralInformation />
            <Farm values={props.values} />
            <Summery />
            <Animals values={props.values} />
            <Recommendation values={props.values} />
            <Signature />
            <SPORequirements />
          </Accordion>
          <Submit props={props}>Save</Submit>
        </form>
      )}
    </Formik>
  );
}
