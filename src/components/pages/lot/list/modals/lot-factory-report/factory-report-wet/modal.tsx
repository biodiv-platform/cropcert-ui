import {
  Badge,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/core";
import { CheckBox, DateTime, Number, Submit } from "@components/@core/formik";
import { CoreGrid } from "@components/@core/layout";
import { axCreateFactoryReport } from "@services/report.service";
import { LOT_FLAGS } from "@static/constants";
import { GENERIC, MLOT } from "@static/messages";
import { nonZeroFalsy } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import DiffMessage from "../../diff-message";
import FormHeading from "../../typography";
import ReportPanel from "../panel";
import { calculateFormValues } from "./utils";

export default function FactoryReportWetModal({ report, lot, onClose, canWrite, update }) {
  const factoryReportForm = {
    validationSchema: Yup.object().shape({
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
    }),
    initialValues: {
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
  };

  const handleFactoryReportSubmit = async (v, actions) => {
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
    actions.setSubmitting(false);
  };

  return (
    <Formik {...factoryReportForm} enableReinitialize={true} onSubmit={handleFactoryReportSubmit}>
      {(props) => {
        const cv = calculateFormValues(props.values);

        const calcPersentage = (num) => `${((num * 100) / cv.netInputWeight).toFixed(2) || 0}%`;

        const totalDiff =
          cv.highGradeWeight +
          cv.lowGradeWeight +
          cv.totalBlackBeans +
          cv.wasteSubTotal +
          cv.otherLossSubTotal -
          cv.netInputWeight;

        return (
          <form onSubmit={props.handleSubmit}>
            <ModalContent>
              <ModalHeader>🏭 Factory Report</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CoreGrid>
                  <DateTime name="date" label="Date" disabled={!canWrite} />
                  <Number name="mcIn" label="MC In (%)" disabled={!canWrite} />
                  <Number name="mcOut" label="MC Out (%)" disabled={!canWrite} />
                </CoreGrid>

                <FormHeading>Input</FormHeading>
                <CoreGrid>
                  <Number name="inputWeight" label="+ Input Weight" disabled={!canWrite} />
                  <Number
                    name="spillPrivBatch"
                    label="- Add Spill. Priv. Batch"
                    disabled={!canWrite}
                  />
                  <Number name="spillCF" label="- Less Spill C/F" disabled={!canWrite} />
                </CoreGrid>
                <Text mb={4}>Net Input: {cv.netInputWeight} KG(s)</Text>

                <CoreGrid rows={5}>
                  <ReportPanel
                    heading="High Grades"
                    footer={`Sub Total: ${cv.highGradeWeight} KG(s)`}
                  >
                    <Number
                      label="Grade AA"
                      name="gradeAA"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.gradeAA)}
                    />
                    <Number
                      label="Grade AB"
                      name="gradeAB"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.gradeAB)}
                    />
                    <Number
                      label="Grade C &amp; PB"
                      name="gradeCAndPB"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.gradeCAndPB)}
                    />
                  </ReportPanel>

                  <ReportPanel
                    heading="Low Grades"
                    footer={`Sub Total: ${cv.lowGradeWeight} KG(s)`}
                  >
                    <Number
                      label="Triage"
                      name="triage"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.triage)}
                    />
                    <Number
                      label="Pods"
                      name="pods"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.pods)}
                    />
                    <Number
                      label="Arabica 1899"
                      name="arabica1899"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.arabica1899)}
                    />
                    <Number
                      label="Sweeppings/Spillages"
                      name="sweeppingsOrSpillages"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.sweeppingsOrSpillages)}
                    />
                  </ReportPanel>

                  <ReportPanel
                    heading="Colour Sorter Rejects"
                    footer={`Sub Total: ${props.values.totalBlackBeans} KG(s)`}
                  >
                    <Number
                      label="Black Beans AA"
                      name="blackBeansAA"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.blackBeansAA)}
                    />
                    <Number
                      label="Black Beans AB"
                      name="blackBeansAB"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.blackBeansAB)}
                    />
                    <Number
                      label="Black Beans C"
                      name="blackBeansC"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.blackBeansC)}
                    />
                  </ReportPanel>

                  <ReportPanel heading="Wastes" footer={`Sub Total: ${cv.wasteSubTotal} KG(s)`}>
                    <Number
                      label="Stone"
                      name="stone"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.stone)}
                    />
                    <Number
                      label="Pre Cleaner"
                      name="preCleaner"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.preCleaner)}
                    />
                    <Number
                      label="Grader Husks"
                      name="graderHusks"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.graderHusks)}
                    />
                  </ReportPanel>

                  <ReportPanel
                    heading="Other Loses"
                    footer={`Sub Total: ${cv.otherLossSubTotal} KG(s)`}
                  >
                    <Number
                      label="Handling Loss"
                      name="handlingLoss"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.handlingLoss)}
                    />
                    <Number
                      label="Drying Loss"
                      name="dryingLoss"
                      hint={true}
                      disabled={!canWrite}
                      hintText={calcPersentage(props.values.dryingLoss)}
                    />
                  </ReportPanel>
                </CoreGrid>
                <DiffMessage diff={totalDiff} />
                <CheckBox
                  name="finalizeFactoryStatus"
                  mt={4}
                  label={
                    <span>
                      Finalize Factory Report <Badge variantColor="red">irreversible</Badge>
                    </span>
                  }
                  isDisabled={!canWrite}
                />
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Submit leftIcon="save" isDisabled={!(props.isValid && totalDiff === 0)}>
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
