import { Accordion, Button } from "@chakra-ui/core";
import ErrorSummery from "@components/@core/formik/error-summery";
import { STORE } from "@static/inspection-report";
import { local2utc } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import { useStoreState } from "easy-peasy";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useIndexedDBStore } from "use-indexeddb";
import * as yup from "yup";

import Advices from "./panels/advices";
import Animals from "./panels/animals";
import CertificationStatus from "./panels/certification-status";
import Farm from "./panels/farm";
import GeneralInformation from "./panels/general-information";
import FarmerInformation from "./panels/information";
import Recommendation from "./panels/recommandation";
import Signature from "./panels/signature";

export default function InspectionForm({ farmer }) {
  const { add } = useIndexedDBStore(STORE.PENDING_INSPECTION_REPORT);
  const inspectorId = useStoreState((state) => state.user.id);
  const router = useRouter();

  const farms = useMemo(() => {
    const farms = farmer?.inspection?.farms || new Array(farmer.numCoffeePlots).fill({});
    return farms.map(
      ({
        isCoffeeTreeWellMaintained,
        pruining,
        numberOfPruinedCoffeeTrees,
        stumping,
        numberOfStumpedTree,
        plantingNewCoffeeSeedings,
        lastUseOfNonAllowedChemicals,
        interPlotBufferZones,
        ...farm
      }) => farm
    );
  }, []);

  const inspectionForm = {
    validationSchema: yup.object().shape({
      lastUsedChemicals: yup.string().nullable(),
      cutivatationNotConductedWithin5mWaterSource: yup.boolean().required(),
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
      comments: yup.string(),

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
          lastUseOfNonAllowedChemicals: yup.string().nullable(),
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
      livestockTreatmentConducted5mFromCoffee: yup.boolean().when("chemicalTreatmentOnLivestock", {
        is: true,
        then: yup.boolean().required(),
        otherwise: yup.boolean().nullable(),
      }),
      animals: yup
        .array()
        .of(
          yup.object().shape({
            type: yup.string().required(),
            number: yup.number().required(),
            husbandryType: yup.string().required(),
            medication: yup.boolean().required(),
          })
        )
        .when("hasLiveStock", {
          is: true,
          then: yup.array().min(1).required(),
          otherwise: yup.array().nullable(),
        }),

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

      // Signatures
      farmer: yup.object().shape({ path: yup.string().required() }),
      fieldCoordinator: yup.object().shape({ path: yup.string().required() }),
    }),
    initialValues: {
      farms,
      farmer: {},
      fieldCoordinator: {},
    },
  };

  const handleOnInspectionFormSubmit = async (values, actions) => {
    const farmerId = farmer.id;
    add({
      data: { ...values, farmerId, inspectorId, date: local2utc().getTime() },
      version: farmer?.version || null,
      subversion: farmer?.subversion || null,
      farmerId,
      ccCode: farmer.ccCode,
    });
    notification("Inspection Report Saved Locally", NotificationType.Success);
    router.push(`/farmer-certification/inspection-report/select-farmer?feCCCode=${farmer.ccCode}`);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      {...inspectionForm}
      onSubmit={handleOnInspectionFormSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      <Form>
        <Accordion allowMultiple>
          <FarmerInformation farmer={farmer} />
          <CertificationStatus farmer={farmer} />
          <GeneralInformation i={farmer?.inspection} />
          <Farm />
          <Animals />
          <Advices previousAdvices={farmer?.advices} />
          <Recommendation />
          <Signature />
        </Accordion>
        <ErrorSummery />
        <Button leftIcon={"check2" as any} variantColor="blue" type="submit">
          Save
        </Button>
      </Form>
    </Formik>
  );
}
