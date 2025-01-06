import { Badge, Button } from "@chakra-ui/react";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEverythingFilledExcept } from "@utils/basic";
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

export default function LotGRNForm({ onClose, onSubmit, lot, canWrite, errorMessage, isDone }) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        grnNumber: Yup.string().nullable(),
        grnTimestamp: Yup.number().nullable(),
        mcAtGrn: Yup.number().nullable(),
        weightAtGrn: Yup.number().nullable(),
        finalizeGrnStatus: Yup.boolean().nullable(),
      })
    ),
    defaultValues: {
      grnNumber: lot.grnNumber,
      grnTimestamp: lot.grnTimestamp,
      mcAtGrn: lot.mcAtGrn,
      weightAtGrn: lot.weightAtGrn,
      finalizeGrnStatus: isDone,
    },
  });

  const values = hForm.watch();

  const isFormReadOnly = !canWrite || values.finalizeGrnStatus;
  const isFinalizeEnabled =
    !isDone && canWrite && isEverythingFilledExcept("finalizeGrnStatus", values);

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogHeader>🔢 Add GRN Number</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <TextBoxField name="grnNumber" label="GRN Number" disabled={isFormReadOnly} />
            <DateTimeInputField name="grnTimestamp" label="Date" disabled={isFormReadOnly} />
            <NumberInputField label="Weight" name="weightAtGrn" disabled={isFormReadOnly} />
            <NumberInputField label="Moisture Content" name="mcAtGrn" disabled={isFormReadOnly} />
            <CheckBoxField
              name="finalizeGrnStatus"
              label={
                <span>
                  Finalize GRN Number <Badge colorPalette="red">irreversible</Badge>
                </span>
              }
              isDisabled={!isFinalizeEnabled}
            />
            {errorMessage && (
              <Alert status="error" borderRadius="md">
                {errorMessage}
              </Alert>
            )}
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={!canWrite}>
              Save
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </form>
    </FormProvider>
  );
}
