import {
  Alert,
  AlertIcon,
  Badge,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { CheckBox, DateTime, Number, Submit, TextBox } from "@components/@core/formik";
import { CoreGrid } from "@components/@core/layout";
import { axCreateGreenReport } from "@services/report.service";
import { LOT_FLAGS } from "@static/constants";
import { MLOT } from "@static/messages";
import { isEverythingFilledExcept, local2utc, nonZeroFalsy } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import { Formik } from "formik";
import React from "react";
import SaveIcon from "src/icons/save";
import { FactoryReport, Lot, QualityReport } from "types/traceability";
import * as Yup from "yup";

import FormHeading from "../typography";
import GreenReportSummery from "./summery";

interface IGreenReportProps {
  ccNames: string[];
  cooperativeName: string;
  factoryReport: Required<FactoryReport>;
  canWrite: boolean;
  lot: Required<Lot>;
  onClose;
  report: QualityReport;
  update;
}

export default function GreenReportForm({
  ccNames,
  cooperativeName,
  factoryReport,
  canWrite,
  lot,
  onClose,
  report,
  update,
}: IGreenReportProps) {
  const outTurnPersentage = (
    (factoryReport.highGradeWeight * 100) /
    lot.weightLeavingFactory
  ).toFixed(2);

  const greenForm = {
    validationSchema: Yup.object().shape({
      lotName: Yup.string().required(),
      lotId: Yup.string().required(),
      date: Yup.number().required(),
      cfa: Yup.string().required(),
      ccName: Yup.string().required(),

      coffeeType: Yup.string().required(),
      overTurnPercentage: Yup.number().required(),
      mc: Yup.number().required(),
      grnNumber: Yup.string().required(),

      // Grades
      ...(lot.type === "WET"
        ? {
            gradeAA: Yup.number().required(),
            gradeA: Yup.number().required(),
            gradeB: Yup.number().required(),
            gradeAB: Yup.number().required(),
            gradeC: Yup.number().required(),
            gradePB: Yup.number().required(),
            gradeTriage: Yup.number().required(),
          }
        : {}),

      // Severe defects
      fullBlack: Yup.number().required(),
      fullSour: Yup.number().required(),
      pods: Yup.number().required(),
      fungasDamaged: Yup.number().required(),
      em: Yup.number().required(),
      severeInsect: Yup.number().required(),

      // Less Severe defects
      partialBlack: Yup.number().required(),
      partialSour: Yup.number().required(),
      patchment: Yup.number().required(),
      floatersChalky: Yup.number().required(),
      immature: Yup.number().required(),
      withered: Yup.number().required(),
      shells: Yup.number().required(),
      brokenChipped: Yup.number().required(),
      husks: Yup.number().required(),
      pinHole: Yup.number().required(),
      finalizeGreenStatus: Yup.boolean().required(),
    }),
    initialValues: {
      lotName: lot.lotName,
      lotId: lot.id,
      date: lot.grnTimestamp,
      timestamp: local2utc(),
      cfa: cooperativeName,
      ccName: ccNames.toString(),

      coffeeType: lot.type,
      overTurnPercentage: outTurnPersentage,
      mc: nonZeroFalsy(report.mc),
      grnNumber: lot.grnNumber || "",

      // Grades
      gradeAA: nonZeroFalsy(report.gradeAA),
      gradeA: nonZeroFalsy(report.gradeA),
      gradeB: nonZeroFalsy(report.gradeB),
      gradeAB: nonZeroFalsy(report.gradeAB),
      gradeC: nonZeroFalsy(report.gradeC),
      gradePB: nonZeroFalsy(report.gradePB),
      gradeTriage: nonZeroFalsy(report.gradeTriage),

      // Severe defects
      fullBlack: report.fullBlack || 0,
      fullSour: report.fullSour || 0,
      pods: report.pods || 0,
      fungasDamaged: report.fungasDamaged || 0,
      em: report.em || 0,
      severeInsect: report.severeInsect || 0,

      // Less Severe defects
      partialBlack: report.partialBlack || 0,
      partialSour: report.partialSour || 0,
      patchment: report.patchment || 0,
      floatersChalky: report.floatersChalky || 0,
      immature: report.immature || 0,
      withered: report.withered || 0,
      shells: report.shells || 0,
      brokenChipped: report.brokenChipped || 0,
      husks: report.husks || 0,
      pinHole: report.pinHole || 0,
      finalizeGreenStatus: lot.greenAnalysisStatus === LOT_FLAGS.DONE,
    },
  };

  const qualityGrading = (v) => {
    const t = v.gradeAA + v.gradeA + v.gradeB + v.gradeAB + v.gradeC + v.gradePB + v.gradeTriage;
    return v.coffeeType === "WET" ? (typeof t === "number" ? t : "0") : 100;
  };

  const severeDefectsTotal = (v) => {
    const t = v.fullBlack + v.fullSour + v.pods + v.fungasDamaged + v.em + v.severeInsect;
    return typeof t === "number" ? t : "0";
  };

  const lessSevereDefectsTotal = (v) => {
    const t =
      v.partialBlack +
      v.partialSour +
      v.patchment +
      v.floatersChalky +
      v.immature +
      v.withered +
      v.shells +
      v.brokenChipped +
      v.husks +
      v.pinHole;
    return typeof t === "number" ? t : "0";
  };

  const outTurnFAQ = (v) => {
    const iQualityGrading = qualityGrading(v);
    const iSevereDefectsTotal = severeDefectsTotal(v);
    const iLessSevereDefectsTotal = lessSevereDefectsTotal(v);
    if (
      typeof iQualityGrading === "number" &&
      typeof iSevereDefectsTotal === "number" &&
      typeof iLessSevereDefectsTotal === "number" &&
      iSevereDefectsTotal + iLessSevereDefectsTotal <= iQualityGrading
    ) {
      return (
        ((iQualityGrading - (iSevereDefectsTotal + iLessSevereDefectsTotal)) / iQualityGrading) *
        100
      ).toFixed(2);
    }
    return -1;
  };

  const defectsTotalError = (v) => {
    const iQualityGrading = qualityGrading(v);
    const iSevereDefectsTotal = severeDefectsTotal(v);
    const iLessSevereDefectsTotal = lessSevereDefectsTotal(v);
    if (
      typeof iQualityGrading === "number" &&
      typeof iSevereDefectsTotal === "number" &&
      typeof iLessSevereDefectsTotal === "number" &&
      iSevereDefectsTotal + iLessSevereDefectsTotal > iQualityGrading
    ) {
      return (
        <Alert mb={2} status="warning" borderRadius="md">
          <AlertIcon />
          Severe and Less Severe Defects should be less then {iQualityGrading}
        </Alert>
      );
    }
  };

  const handleGreenReportSubmit = async (values, actions) => {
    const { grnNumber, ...v } = values;
    const { success, data } = await axCreateGreenReport({
      ...v,
      id: report.id || -1,
      percentageOutTurn: outTurnFAQ(values),
    });
    if (success && data?.lot) {
      update(data.lot);
      notification(MLOT.GREEN_REPORT_CREATED, NotificationType.Success, data?.qualityReport);
      onClose();
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik {...greenForm} enableReinitialize={true} onSubmit={handleGreenReportSubmit}>
      {(props) => {
        const isFDisabled = !canWrite;
        const isFinalizeEnabled =
          canWrite && isEverythingFilledExcept("finalizeGreenStatus", props.values);
        return (
          <form onSubmit={props.handleSubmit}>
            <ModalContent>
              <ModalHeader>🧪 Quality/Green Lab Report</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CoreGrid>
                  <TextBox name="grnNumber" label="GRN Number" disabled={true} />
                  <TextBox label="Lot Name" name="lotName" disabled={true} />
                  <DateTime label="Lot Reception Date" name="date" disabled={true} />
                  <TextBox label="Cooperative Name" name="cfa" disabled={true} />
                </CoreGrid>
                <CoreGrid>
                  <TextBox label="Collection Center Name(s)" name="ccName" disabled={true} />
                  <TextBox label="Coffee Type" name="coffeeType" disabled={true} />
                  <TextBox label="Outturn Percentage" name="overTurnPercentage" disabled={true} />
                </CoreGrid>

                <FormHeading>Report</FormHeading>
                <CoreGrid>
                  <DateTime label="Report Time" name="timestamp" disabled={isFDisabled} />
                  <Number label="Moisture Content" name="mc" disabled={isFDisabled} />
                </CoreGrid>

                {lot.type === "WET" && (
                  <>
                    <FormHeading>Quality Grading - {qualityGrading(props.values)}g</FormHeading>
                    <CoreGrid>
                      <Number label="AA" name="gradeAA" disabled={isFDisabled} />
                      <Number label="A" name="gradeA" disabled={isFDisabled} />
                      <Number label="B" name="gradeB" disabled={isFDisabled} />
                      <Number label="AB" name="gradeAB" disabled={isFDisabled} />
                    </CoreGrid>
                    <CoreGrid>
                      <Number label="C" name="gradeC" disabled={isFDisabled} />
                      <Number label="PB" name="gradePB" disabled={isFDisabled} />
                      <Number label="Triage" name="gradeTriage" disabled={isFDisabled} />
                    </CoreGrid>

                    <FormHeading>Quality Grading Summary</FormHeading>
                    <GreenReportSummery values={props.values} />
                  </>
                )}

                <FormHeading>Severe Defects - {severeDefectsTotal(props.values)}</FormHeading>
                {defectsTotalError(props.values)}
                <CoreGrid rows={6}>
                  <Number label="Full Black" name="fullBlack" disabled={isFDisabled} />
                  <Number label="Full Sour" name="fullSour" disabled={isFDisabled} />
                  <Number label="Pods" name="pods" disabled={isFDisabled} />
                  <Number label="Fungas Damaged" name="fungasDamaged" disabled={isFDisabled} />
                  <Number label="E M" name="em" disabled={isFDisabled} />
                  <Number label="Severe Insect" name="severeInsect" disabled={isFDisabled} />
                </CoreGrid>

                <FormHeading>
                  Less Severe Defects - {lessSevereDefectsTotal(props.values)}
                </FormHeading>
                {defectsTotalError(props.values)}
                <CoreGrid rows={6}>
                  <Number label="Partial Black" name="partialBlack" disabled={isFDisabled} />
                  <Number label="Partial Sour" name="partialSour" disabled={isFDisabled} />
                  <Number label="Patchment" name="patchment" disabled={isFDisabled} />
                  <Number label="Floaters/Chalky" name="floatersChalky" disabled={isFDisabled} />
                  <Number label="Immature" name="immature" disabled={isFDisabled} />
                  <Number label="Withered" name="withered" disabled={isFDisabled} />
                </CoreGrid>
                <CoreGrid rows={6}>
                  <Number label="Shells" name="shells" disabled={isFDisabled} />
                  <Number label="Broken/Chipped" name="brokenChipped" disabled={isFDisabled} />
                  <Number label="Husks" name="husks" disabled={isFDisabled} />
                  <Number label="Pin Hole" name="pinHole" disabled={isFDisabled} />
                </CoreGrid>

                <Text>
                  {lot.type === "DRY" ? "Out turn FAQ " : "Out turn "} &rarr;
                  {outTurnFAQ(props.values)}%
                </Text>

                <CheckBox
                  name="finalizeGreenStatus"
                  label={
                    <span>
                      Dispatch to Milling <Badge colorScheme="red">irreversible</Badge>
                    </span>
                  }
                  isDisabled={isFinalizeEnabled}
                />
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Submit
                  leftIcon={<SaveIcon />}
                  isDisabled={outTurnFAQ(props.values) <= 0 || !canWrite}
                >
                  Save
                </Submit>
              </ModalFooter>
            </ModalContent>
          </form>
        );
      }}
    </Formik>
  );
}
