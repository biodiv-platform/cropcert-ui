import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Box
} from "@chakra-ui/core";
import { DateTime, MultiSelect, Number, Submit, TextBox } from "@components/@core/formik";
import { CoreGrid } from "@components/@core/layout";
import { axCreateCuppingReport } from "@services/report.service";
import { flatten, local2utc, nonZeroFalsy } from "@utils/basic.util";
import { CoffeeFlavors } from "coffee-flavor-wheel";
import { Formik } from "formik";
import React from "react";
import { MdSave } from "react-icons/md";
import { Cupping, Lot } from "types/traceability";
import * as Yup from "yup";

import FormHeading from "../typography";

interface IGreenReportProps {
  ccNames: string[];
  cooperativeName: string;
  cupper: string;
  isDispatched: boolean;
  isReadOnly: boolean;
  lot: Lot;
  onClose;
  report: Cupping;
  update;
}

export default function CuppingReportForm({
  ccNames,
  cooperativeName,
  cupper,
  isDispatched,
  isReadOnly,
  lot,
  onClose,
  report,
  update
}: IGreenReportProps) {
  const cuppingReportForm = {
    validationSchema: Yup.object().shape({
      lotName: Yup.string().required(),
      lotId: Yup.string().required(),
      date: Yup.number().required(),
      cfa: Yup.string().required(),
      ccName: Yup.string().required(),

      cupper: Yup.string().required(),
      sampleType: Yup.string().required(),
      grnNumber: Yup.string().required(),

      // Params
      fragranceAroma: Yup.number().required(),
      flavour: Yup.number().required(),
      acidity: Yup.number().required(),
      body: Yup.number().required(),
      afterTaste: Yup.number().required(),
      balance: Yup.number().required(),
      sweetness: Yup.number().required(),
      uniformity: Yup.number().required(),
      cleanCup: Yup.number().required(),
      overAll: Yup.number().required(),

      // Problems
      taint: Yup.number().required(),
      fault: Yup.number().required(),

      notes: Yup.array().required()
    }),
    initialValues: {
      lotName: lot.lotName,
      lotId: lot.id,
      date: lot.grnTimestamp,
      timestamp: local2utc(),
      cfa: cooperativeName,
      ccName: ccNames.toString(),

      cupper: cupper,
      sampleType: lot.type,
      grnNumber: lot.grnNumber,

      // Params
      fragranceAroma: nonZeroFalsy(report.fragranceAroma),
      flavour: nonZeroFalsy(report.flavour),
      acidity: nonZeroFalsy(report.acidity),
      body: nonZeroFalsy(report.body),
      afterTaste: nonZeroFalsy(report.afterTaste),
      balance: nonZeroFalsy(report.balance),
      sweetness: nonZeroFalsy(report.sweetness),
      uniformity: nonZeroFalsy(report.uniformity),
      cleanCup: nonZeroFalsy(report.cleanCup),
      overAll: nonZeroFalsy(report.overAll),

      // Problems
      taint: nonZeroFalsy(report.taint),
      fault: nonZeroFalsy(report.fault),

      notes: (report.notes || "").split(",")
    }
  };

  const gradeTotal = v => {
    const t =
      v.fragranceAroma +
      v.flavour +
      v.acidity +
      v.body +
      v.afterTaste +
      v.balance +
      v.sweetness +
      v.uniformity +
      v.cleanCup +
      v.overAll -
      (v.taint + v.fault);
    return typeof t === "number" ? t.toFixed(2) : "0";
  };

  const handleSubmit = async (values, actions) => {
    const { grnNumber, notes, ...v } = values;
    actions.setSubmitting(false);
    const { success, data } = await axCreateCuppingReport({
      ...v,
      notes: notes.toString(),
      id: this.props.report.id || -1
    });
    if (success) {
      // TODO: trigger lot object update with success message
    }
  };

  return (
    <Formik {...cuppingReportForm} enableReinitialize={true} onSubmit={handleSubmit}>
      {props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <ModalContent>
              <ModalHeader>☕ Cupping Lab Report</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CoreGrid>
                  <TextBox label="GRN Number" name="grnNumber" disabled={true} />
                  <TextBox label="Lot Name" name="lotName" disabled={true} />
                  <DateTime label="Lot Reception Date" name="date" disabled={true} />
                  <TextBox label="Cooperative Name" name="cfa" disabled={true} />
                </CoreGrid>
                <CoreGrid>
                  <TextBox label="Collection Center Name(s)" name="ccName" disabled={true} />
                  <TextBox label="Sample Type" name="sampleType" disabled={true} />
                </CoreGrid>

                <FormHeading>Report</FormHeading>
                <CoreGrid>
                  <DateTime label="Report Time" name="timestamp" />
                </CoreGrid>

                <FormHeading>Qualities</FormHeading>
                <CoreGrid rows={5}>
                  <Number label="Fragrance Aroma" name="fragranceAroma" />
                  <Number label="Flavour" name="flavour" />
                  <Number label="Acidity" name="acidity" />
                  <Number label="Body" name="body" />
                  <Number label="After Taste" name="afterTaste" />
                </CoreGrid>
                <CoreGrid rows={5}>
                  <Number label="Balance" name="balance" />
                  <Number label="Sweetness" name="sweetness" />
                  <Number label="Uniformity" name="uniformity" />
                  <Number label="Clean Cup" name="cleanCup" />
                  <Number label="Overall" name="overAll" />
                </CoreGrid>

                <CoreGrid rows={2}>
                  <Box>
                    <FormHeading>Problems</FormHeading>
                    <CoreGrid rows={2}>
                      <Number label="Taint" name="taint" />
                      <Number label="Fault" name="fault" />
                    </CoreGrid>
                  </Box>
                  <Box>
                    <FormHeading>Additional Information</FormHeading>
                    <MultiSelect label="Notes" name="notes" options={flatten(CoffeeFlavors)} />
                  </Box>
                </CoreGrid>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Submit props={props} leftIcon={MdSave}>
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
