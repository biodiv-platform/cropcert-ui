import { Badge, Button, Input } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SelectInputField } from "@components/form/select";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOT_FLAGS } from "@static/constants";
import React from "react";
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
import { Field } from "@/components/ui/field";

export default function LotFactoryDispatchForm({ onSubmit, onClose, unions, lot, canWrite }) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        weightArrivingFactory: Yup.number().min(1).nullable(),
        mcArrivingFactory: Yup.number().nullable(),

        weightLeavingFactory: Yup.number().min(1).nullable(),
        mcLeavingFactory: Yup.number().nullable(),

        millingTime: Yup.number().nullable(),
        finalizeMillingStatus: Yup.boolean(),
        unionCode: Yup.number().nullable(),
      })
    ),
    defaultValues: {
      weightArrivingFactory: lot.weightArrivingFactory,
      mcArrivingFactory: lot.mcArrivingFactory,

      weightLeavingFactory: lot.weightLeavingFactory,
      mcLeavingFactory: lot.mcLeavingFactory,

      millingTime: lot.millingTime,
      finalizeMillingStatus: lot.millingStatus === LOT_FLAGS.DONE,
      unionCode: lot.unionCode,
    },
  });

  const values = hForm.watch();

  const outTurn = ((values.weightLeavingFactory * 100) / values.weightArrivingFactory || 0).toFixed(
    2
  );
  const isFDisabled = !canWrite || values.finalizeMillingStatus;
  const isFCheckbox =
    !canWrite ||
    !(
      values.weightArrivingFactory &&
      values.mcArrivingFactory &&
      values.weightLeavingFactory &&
      values.mcLeavingFactory &&
      values.millingTime
    );

  return (
    <DialogContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(onSubmit)}>
          <DialogHeader>🏭 Update milling details</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <CoreGrid rows={2}>
              <NumberInputField
                name="weightArrivingFactory"
                label="Weight Arriving Factory"
                disabled={isFDisabled}
              />
              <NumberInputField
                name="mcArrivingFactory"
                label="Moisture Content Arriving Factory"
                disabled={isFDisabled}
              />
            </CoreGrid>

            <CoreGrid rows={2}>
              <NumberInputField
                name="weightLeavingFactory"
                label="Weight Leaving Factory"
                disabled={isFDisabled}
              />
              <NumberInputField
                name="mcLeavingFactory"
                label="Moisture Content Leaving Factory"
                disabled={isFDisabled}
              />
            </CoreGrid>

            <CoreGrid rows={2}>
              <DateTimeInputField
                name="millingTime"
                label="Milling Time"
                defaultBlank={true}
                isNow={true}
                disabled={isFDisabled}
                min={lot.timeToFactory}
              />
              <Field mb={4} label="Out Turn">
                <Input value={`${outTurn} %`} disabled={true} />
              </Field>
            </CoreGrid>

            <CoreGrid rows={2}>
              <SelectInputField
                name="unionCode"
                label="Select union"
                options={unions}
                disabled={isFDisabled}
              />
            </CoreGrid>

            <CheckBoxField
              name="finalizeMillingStatus"
              label={
                <span>
                  Dispatch to Union <Badge colorScheme="red">irreversible</Badge>
                </span>
              }
              isDisabled={isFCheckbox}
            />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={!canWrite}>
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}
