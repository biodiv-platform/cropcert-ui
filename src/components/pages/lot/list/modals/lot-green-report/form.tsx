import { Badge, Button, Text } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { FactoryReport, Lot, QualityReport } from "@interfaces/traceability";
import { axCreateGreenReport } from "@services/report.service";
import { LOT_FLAGS } from "@static/constants";
import { MLOT } from "@static/messages";
import { isEverythingFilledExcept, local2utc, nonZeroFalsy } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

import { Alert } from "@/components/ui/alert";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

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

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
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
      })
    ),
    defaultValues: {
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
  });

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

  const outTurnFAQ = (v: any): number => {
    const iQualityGrading = qualityGrading(v);
    const iSevereDefectsTotal = severeDefectsTotal(v);
    const iLessSevereDefectsTotal = lessSevereDefectsTotal(v);
    if (
      typeof iQualityGrading === "number" &&
      typeof iSevereDefectsTotal === "number" &&
      typeof iLessSevereDefectsTotal === "number" &&
      iSevereDefectsTotal + iLessSevereDefectsTotal <= iQualityGrading
    ) {
      const result =
        ((iQualityGrading - (iSevereDefectsTotal + iLessSevereDefectsTotal)) / iQualityGrading) *
        100;
      return parseFloat(result.toFixed(2)); // Ensure the return type is a number
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
          Severe and Less Severe Defects should be less then {iQualityGrading}
        </Alert>
      );
    }
  };

  const handleGreenReportSubmit = async (values) => {
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
  };

  const values = hForm.watch();

  const isFDisabled = !canWrite;
  const isFinalizeEnabled = canWrite && isEverythingFilledExcept("finalizeGreenStatus", values);

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleGreenReportSubmit)}>
        <DialogContent>
          <DialogHeader>🧪 Quality/Green Lab Report</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <CoreGrid>
              <TextBoxField name="grnNumber" label="GRN Number" disabled={true} />
              <TextBoxField label="Lot Name" name="lotName" disabled={true} />
              <DateTimeInputField label="Lot Reception Date" name="date" disabled={true} />
              <TextBoxField label="Cooperative Name" name="cfa" disabled={true} />
            </CoreGrid>
            <CoreGrid>
              <TextBoxField label="Collection Center Name(s)" name="ccName" disabled={true} />
              <TextBoxField label="Coffee Type" name="coffeeType" disabled={true} />
              <TextBoxField label="Outturn Percentage" name="overTurnPercentage" disabled={true} />
            </CoreGrid>

            <FormHeading>Report</FormHeading>
            <CoreGrid>
              <DateTimeInputField label="Report Time" name="timestamp" disabled={isFDisabled} />
              <NumberInputField label="Moisture Content" name="mc" disabled={isFDisabled} />
            </CoreGrid>

            {lot.type === "WET" && (
              <>
                <FormHeading>Quality Grading - {qualityGrading(values)}g</FormHeading>
                <CoreGrid>
                  <NumberInputField label="AA" name="gradeAA" disabled={isFDisabled} />
                  <NumberInputField label="A" name="gradeA" disabled={isFDisabled} />
                  <NumberInputField label="B" name="gradeB" disabled={isFDisabled} />
                  <NumberInputField label="AB" name="gradeAB" disabled={isFDisabled} />
                </CoreGrid>
                <CoreGrid>
                  <NumberInputField label="C" name="gradeC" disabled={isFDisabled} />
                  <NumberInputField label="PB" name="gradePB" disabled={isFDisabled} />
                  <NumberInputField label="Triage" name="gradeTriage" disabled={isFDisabled} />
                </CoreGrid>

                <FormHeading>Quality Grading Summary</FormHeading>
                <GreenReportSummery values={values} />
              </>
            )}

            <FormHeading>Severe Defects - {severeDefectsTotal(values)}</FormHeading>
            {defectsTotalError(values)}
            <CoreGrid rows={6}>
              <NumberInputField label="Full Black" name="fullBlack" disabled={isFDisabled} />
              <NumberInputField label="Full Sour" name="fullSour" disabled={isFDisabled} />
              <NumberInputField label="Pods" name="pods" disabled={isFDisabled} />
              <NumberInputField
                label="Fungas Damaged"
                name="fungasDamaged"
                disabled={isFDisabled}
              />
              <NumberInputField label="E M" name="em" disabled={isFDisabled} />
              <NumberInputField label="Severe Insect" name="severeInsect" disabled={isFDisabled} />
            </CoreGrid>

            <FormHeading>Less Severe Defects - {lessSevereDefectsTotal(values)}</FormHeading>
            {defectsTotalError(values)}
            <CoreGrid rows={6}>
              <NumberInputField label="Partial Black" name="partialBlack" disabled={isFDisabled} />
              <NumberInputField label="Partial Sour" name="partialSour" disabled={isFDisabled} />
              <NumberInputField label="Patchment" name="patchment" disabled={isFDisabled} />
              <NumberInputField
                label="Floaters/Chalky"
                name="floatersChalky"
                disabled={isFDisabled}
              />
              <NumberInputField label="Immature" name="immature" disabled={isFDisabled} />
              <NumberInputField label="Withered" name="withered" disabled={isFDisabled} />
            </CoreGrid>
            <CoreGrid rows={6}>
              <NumberInputField label="Shells" name="shells" disabled={isFDisabled} />
              <NumberInputField
                label="Broken/Chipped"
                name="brokenChipped"
                disabled={isFDisabled}
              />
              <NumberInputField label="Husks" name="husks" disabled={isFDisabled} />
              <NumberInputField label="Pin Hole" name="pinHole" disabled={isFDisabled} />
            </CoreGrid>

            <Text>
              {lot.type === "DRY" ? "Out turn FAQ " : "Out turn "} &rarr;
              {outTurnFAQ(values)}%
            </Text>

            <CheckBoxField
              name="finalizeGreenStatus"
              label={
                <span>
                  Dispatch to Milling <Badge colorPalette="red">irreversible</Badge>
                </span>
              }
              isDisabled={isFinalizeEnabled}
            />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose} variant={"subtle"}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={outTurnFAQ(values) <= 0 || !canWrite}>
              Save
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </form>
    </FormProvider>
  );
}
