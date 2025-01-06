import {
  Badge,
  Box,
  Button,
} from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { Cupping, Lot } from "@interfaces/traceability";
import { axCreateCuppingReport } from "@services/report.service";
import { LOT_FLAGS } from "@static/constants";
import { MREPORT } from "@static/messages";
import { flatten, isEverythingFilledExcept, local2utc, nonZeroFalsy } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import { CoffeeFlavors } from "coffee-flavor-wheel";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import FormHeading from "../typography";

interface IGreenReportProps {
  ccNames: string[];
  cooperativeName: string;
  cupper: string;
  canWrite: boolean;
  lot: Lot;
  onClose;
  report: Cupping;
  update;
}

export default function CuppingReportForm({
  ccNames,
  cooperativeName,
  cupper,
  canWrite,
  lot,
  onClose,
  report,
  update,
}: IGreenReportProps) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
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

        notes: Yup.array().min(1).required(),
        finalizeCuppingStatus: Yup.boolean().required(),
      })
    ),
    defaultValues: {
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

      notes: report.notes?.split(",") || [],
      finalizeCuppingStatus: report.status === LOT_FLAGS.DONE,
    },
  });

  const handleSubmit = async (values) => {
    const { grnNumber, notes, ...v } = values;
    const response = await axCreateCuppingReport({
      ...v,
      notes: notes.toString(),
      id: report.id || -1,
    });
    if (response.success) {
      update(response.data.lot);
      notification(MREPORT.CUPPING_REPORT_CREATED, NotificationType.Success);
      onClose();
    }
  };

  const values = hForm.watch();

  const isFinalizeEnabled = canWrite && isEverythingFilledExcept("finalizeCuppingStatus", values);

  const [qualitiesTotal, problemsTotal] = useMemo(() => {
    return [
      values.fragranceAroma +
        values.flavour +
        values.acidity +
        values.body +
        values.afterTaste +
        values.balance +
        values.sweetness +
        values.uniformity +
        values.cleanCup +
        values.overAll,

      values.taint + values.fault,
    ];
  }, [values]);

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleSubmit)}>
        <DialogContent>
          <DialogHeader>☕ Cupping Lab Report</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <CoreGrid>
              <TextBoxField label="GRN Number" name="grnNumber" disabled={true} />
              <TextBoxField label="Lot Name" name="lotName" disabled={true} />
              <DateTimeInputField label="Lot Reception Date" name="date" disabled={true} />
              <TextBoxField label="Cooperative Name" name="cfa" disabled={true} />
            </CoreGrid>
            <CoreGrid>
              <TextBoxField label="Collection Center Name(s)" name="ccName" disabled={true} />
              <TextBoxField label="Sample Type" name="sampleType" disabled={true} />
            </CoreGrid>

            <FormHeading>Report</FormHeading>
            <CoreGrid>
              <DateTimeInputField label="Report Time" name="timestamp" disabled={!canWrite} />
            </CoreGrid>

            <FormHeading>Qualities ({qualitiesTotal || 0})</FormHeading>
            <CoreGrid rows={5}>
              <NumberInputField
                label="Fragrance Aroma"
                name="fragranceAroma"
                disabled={!canWrite}
              />
              <NumberInputField label="Flavour" name="flavour" disabled={!canWrite} />
              <NumberInputField label="Acidity" name="acidity" disabled={!canWrite} />
              <NumberInputField label="Body" name="body" disabled={!canWrite} />
              <NumberInputField label="After Taste" name="afterTaste" disabled={!canWrite} />
            </CoreGrid>
            <CoreGrid rows={5}>
              <NumberInputField label="Balance" name="balance" disabled={!canWrite} />
              <NumberInputField label="Sweetness" name="sweetness" disabled={!canWrite} />
              <NumberInputField label="Uniformity" name="uniformity" disabled={!canWrite} />
              <NumberInputField label="Clean Cup" name="cleanCup" disabled={!canWrite} />
              <NumberInputField label="Overall" name="overAll" disabled={!canWrite} />
            </CoreGrid>

            <CoreGrid rows={2}>
              <Box>
                <FormHeading>Problems ({problemsTotal || 0})</FormHeading>
                <CoreGrid rows={2}>
                  <NumberInputField label="Taint" name="taint" disabled={!canWrite} />
                  <NumberInputField label="Fault" name="fault" disabled={!canWrite} />
                </CoreGrid>
              </Box>
              <Box>
                <FormHeading>Additional Information</FormHeading>
                <SelectMultipleInputField
                  label="Notes"
                  name="notes"
                  options={flatten(CoffeeFlavors)}
                  disabled={!canWrite}
                />
              </Box>
            </CoreGrid>

            <Box fontWeight="bold" fontSize="xl">
              Quality Score &rarr; {qualitiesTotal - problemsTotal}
            </Box>
            <CheckBoxField
              name="finalizeCuppingStatus"
              mt={4}
              label={
                <span>
                  Finalize Cupping Report <Badge colorPalette="red">irreversible</Badge>
                </span>
              }
              isDisabled={!canWrite || !isFinalizeEnabled}
            />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />}>Save</SubmitButton>
          </DialogFooter>
        </DialogContent>
      </form>
    </FormProvider>
  );
}
