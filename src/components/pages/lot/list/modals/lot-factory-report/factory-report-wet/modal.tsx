import {
  Badge,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { axCreateFactoryReport } from "@services/report.service";
import { LOT_FLAGS } from "@static/constants";
import { GENERIC, MLOT } from "@static/messages";
import { nonZeroFalsy } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

import DiffMessage from "../../diff-message";
import FormHeading from "../../typography";
import ReportPanel from "../panel";
import { calculateFormValues } from "./utils";

export default function FactoryReportWetModal({ report, lot, onClose, canWrite, update }) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        date: Yup.number().required(),

        mcIn: Yup.number().required().max(100),
        mcOut: Yup.number().required().max(100),

        inputWeight: Yup.number().required(),
        spillPrivBatch: Yup.number().required(),
        spillCF: Yup.number().required(),

        gradeAA: Yup.number().required(),
        gradeAB: Yup.number().required(),
        gradeCAndPB: Yup.number().required(),

        triage: Yup.number().required(),
        pods: Yup.number().required(),
        arabica1899: Yup.number().required(),
        sweeppingsOrSpillages: Yup.number().required(),

        blackBeansAA: Yup.number().required(),
        blackBeansAB: Yup.number().required(),
        blackBeansC: Yup.number().required(),

        stone: Yup.number().required(),
        preCleaner: Yup.number().required(),
        graderHusks: Yup.number().required(),

        handlingLoss: Yup.number().required(),
        dryingLoss: Yup.number().required(),
        finalizeFactoryStatus: Yup.boolean().required(),
      })
    ),
    defaultValues: {
      date: report.date,

      mcIn: nonZeroFalsy(report.mcIn),
      mcOut: nonZeroFalsy(report.mcOut),

      inputWeight: nonZeroFalsy(report.inputWeight),
      spillPrivBatch: nonZeroFalsy(report.spillPrivBatch),
      spillCF: nonZeroFalsy(report.spillCF),

      gradeAA: report.gradeAA || 0,
      gradeAB: report.gradeAB || 0,
      gradeCAndPB: report.gradeCAndPB || 0,

      triage: report.triage || 0,
      pods: report.pods || 0,
      arabica1899: report.arabica1899 || 0,
      sweeppingsOrSpillages: report.sweeppingsOrSpillages || 0,

      blackBeansAA: report.blackBeansAA || 0,
      blackBeansAB: report.blackBeansAB || 0,
      blackBeansC: report.blackBeansC || 0,

      stone: report.stone || 0,
      preCleaner: report.preCleaner || 0,
      graderHusks: report.graderHusks || 0,

      handlingLoss: report.handlingLoss || 0,
      dryingLoss: report.dryingLoss || 0,
      finalizeFactoryStatus: lot.factoryStatus === LOT_FLAGS.DONE,
    },
  });

  const handleFactoryReportSubmit = async (v) => {
    const { success, data } = await axCreateFactoryReport({
      ...v,
      id: report.id || -1,
      lotId: lot.id,
      ...calculateFormValues(v),
    });
    if (success && data?.lot) {
      update(data.lot);
      notification(MLOT.FACTORY_REPORT_CREATED, NotificationType.Success, data?.factoryReport);
      onClose();
    } else {
      notification(GENERIC.ERROR);
    }
  };

  const values = hForm.watch();

  const cv = calculateFormValues(values);

  const calcPersentage = (num) => `${((num * 100) / cv.netInputWeight).toFixed(2) || 0}%`;

  const totalDiff =
    cv.highGradeWeight +
    cv.lowGradeWeight +
    cv.totalBlackBeans +
    cv.wasteSubTotal +
    cv.otherLossSubTotal -
    cv.netInputWeight;

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleFactoryReportSubmit)}>
        <ModalContent>
          <ModalHeader>🏭 Factory Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CoreGrid>
              <DateTimeInputField name="date" label="Date" disabled={!canWrite} />
              <NumberInputField name="mcIn" label="MC In (%)" disabled={!canWrite} />
              <NumberInputField name="mcOut" label="MC Out (%)" disabled={!canWrite} />
            </CoreGrid>

            <FormHeading>Input</FormHeading>
            <CoreGrid>
              <NumberInputField name="inputWeight" label="+ Input Weight" disabled={!canWrite} />
              <NumberInputField
                name="spillPrivBatch"
                label="- Add Spill. Priv. Batch"
                disabled={!canWrite}
              />
              <NumberInputField name="spillCF" label="- Less Spill C/F" disabled={!canWrite} />
            </CoreGrid>
            <Text mb={4}>Net Input: {cv.netInputWeight} KG(s)</Text>

            <CoreGrid rows={5}>
              <ReportPanel heading="High Grades" footer={`Sub Total: ${cv.highGradeWeight} KG(s)`}>
                <NumberInputField
                  label="Grade AA"
                  name="gradeAA"
                  disabled={!canWrite}
                  hint={calcPersentage(values.gradeAA)}
                />
                <NumberInputField
                  label="Grade AB"
                  name="gradeAB"
                  disabled={!canWrite}
                  hint={calcPersentage(values.gradeAB)}
                />
                <NumberInputField
                  label="Grade C &amp; PB"
                  name="gradeCAndPB"
                  disabled={!canWrite}
                  hint={calcPersentage(values.gradeCAndPB)}
                />
              </ReportPanel>

              <ReportPanel heading="Low Grades" footer={`Sub Total: ${cv.lowGradeWeight} KG(s)`}>
                <NumberInputField
                  label="Triage"
                  name="triage"
                  disabled={!canWrite}
                  hint={calcPersentage(values.triage)}
                />
                <NumberInputField
                  label="Pods"
                  name="pods"
                  disabled={!canWrite}
                  hint={calcPersentage(values.pods)}
                />
                <NumberInputField
                  label="Arabica 1899"
                  name="arabica1899"
                  disabled={!canWrite}
                  hint={calcPersentage(values.arabica1899)}
                />
                <NumberInputField
                  label="Sweeppings/Spillages"
                  name="sweeppingsOrSpillages"
                  disabled={!canWrite}
                  hint={calcPersentage(values.sweeppingsOrSpillages)}
                />
              </ReportPanel>

              <ReportPanel
                heading="Colour Sorter Rejects"
                footer={`Sub Total: ${values.totalBlackBeans} KG(s)`}
              >
                <NumberInputField
                  label="Black Beans AA"
                  name="blackBeansAA"
                  disabled={!canWrite}
                  hint={calcPersentage(values.blackBeansAA)}
                />
                <NumberInputField
                  label="Black Beans AB"
                  name="blackBeansAB"
                  disabled={!canWrite}
                  hint={calcPersentage(values.blackBeansAB)}
                />
                <NumberInputField
                  label="Black Beans C"
                  name="blackBeansC"
                  disabled={!canWrite}
                  hint={calcPersentage(values.blackBeansC)}
                />
              </ReportPanel>

              <ReportPanel heading="Wastes" footer={`Sub Total: ${cv.wasteSubTotal} KG(s)`}>
                <NumberInputField
                  label="Stone"
                  name="stone"
                  disabled={!canWrite}
                  hint={calcPersentage(values.stone)}
                />
                <NumberInputField
                  label="Pre Cleaner"
                  name="preCleaner"
                  disabled={!canWrite}
                  hint={calcPersentage(values.preCleaner)}
                />
                <NumberInputField
                  label="Grader Husks"
                  name="graderHusks"
                  disabled={!canWrite}
                  hint={calcPersentage(values.graderHusks)}
                />
              </ReportPanel>

              <ReportPanel
                heading="Other Loses"
                footer={`Sub Total: ${cv.otherLossSubTotal} KG(s)`}
              >
                <NumberInputField
                  label="Handling Loss"
                  name="handlingLoss"
                  disabled={!canWrite}
                  hint={calcPersentage(values.handlingLoss)}
                />
                <NumberInputField
                  label="Drying Loss"
                  name="dryingLoss"
                  disabled={!canWrite}
                  hint={calcPersentage(values.dryingLoss)}
                />
              </ReportPanel>
            </CoreGrid>
            <DiffMessage diff={totalDiff} />
            <CheckBoxField
              name="finalizeFactoryStatus"
              mt={4}
              label={
                <span>
                  Finalize Factory Report <Badge colorScheme="red">irreversible</Badge>
                </span>
              }
              isDisabled={!canWrite}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={totalDiff !== 0}>
              Save
            </SubmitButton>
          </ModalFooter>
        </ModalContent>
      </form>
    </FormProvider>
  );
}
