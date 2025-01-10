import { Badge, Button } from "@chakra-ui/react";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateBatch } from "@services/batch.service";
import { BATCH } from "@static/messages";
import notification, { NotificationType } from "@utils/notification";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

import { DialogBody, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";

export default function BatchUpdateForm({ batch, update, onClose }) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        startTime: Yup.number().nullable(),
        fermentationEndTime: Yup.number().nullable(),
        dryingEndTime: Yup.number().nullable(),
        perchmentQuantity: Yup.number().min(1).max(batch.quantity).nullable(),
        finalizeBatch: Yup.boolean(),
      })
    ),
    defaultValues: {
      startTime: batch.startTime,
      fermentationEndTime: batch.fermentationEndTime,
      dryingEndTime: batch.dryingEndTime,
      perchmentQuantity: batch.perchmentQuantity || null,
      finalizeBatch: batch.isReadyForLot || false,
    },
  });

  const values = hForm.watch();

  const handleOnSubmit = async (payload) => {
    try {
      const updatedPayload = {
        ...payload,
        columnName: "Batch Status",
      };
      const { success, data } = await axUpdateBatch({ ...updatedPayload, id: batch.id });
      if (success) {
        update(data);
        onClose();
        notification(BATCH.UPDATED, NotificationType.Success);
      }
    } catch (e) {
      notification(e.message);
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <DialogContent>
          <DialogHeader pb={0}>
            Update Batch
            <br />
            {batch && batch.batchName}
          </DialogHeader>
          <DialogBody>
            <DateTimeInputField
              name="startTime"
              label="Start Time"
              defaultBlank={true}
              isNow={true}
              disabled={values.finalizeBatch}
              max={values.fermentationEndTime}
            />
            <DateTimeInputField
              name="fermentationEndTime"
              label="Fermentation Ended on"
              defaultBlank={true}
              isNow={true}
              disabled={values.finalizeBatch}
              min={values.startTime}
              max={values.dryingEndTime}
            />
            <DateTimeInputField
              name="dryingEndTime"
              label="Drying Ended on"
              defaultBlank={true}
              isNow={true}
              disabled={values.finalizeBatch}
              min={values.fermentationEndTime}
            />
            <NumberInputField
              name="perchmentQuantity"
              label="Perchment Quantity"
              isRequired={true}
              max={batch.quantity}
              disabled={values.finalizeBatch}
            />
            <CheckBoxField
              name="finalizeBatch"
              label={
                <span>
                  Ready for Lot <Badge colorPalette="red">irreversible</Badge>
                </span>
              }
              isDisabled={batch.isReadyForLot || !values.perchmentQuantity}
            />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose} variant={"subtle"}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={batch.isReadyForLot}>
              Save
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </form>
    </FormProvider>
  );
}
