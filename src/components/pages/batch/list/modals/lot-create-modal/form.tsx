import { Box, Button, Flex } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { DateTimeInputField } from "@components/form/datepicker";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axCreateLot } from "@services/lot.service";
import { MLOT } from "@static/messages";
import notification, { NotificationType } from "@utils/notification";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Check2Icon from "src/icons/check2";
import * as Yup from "yup";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { lotCreateModalCols } from "../../data";

export function LotCreateForm({ update, batches, lotConfig, highestDate, onClose }) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        creationDate: Yup.number().nullable().required(),
      })
    ),
    defaultValues: {
      creationDate: "",
      note: "",
    },
  });

  const handleSubmit = async (payload) => {
    try {
      const { success, data } = await axCreateLot({
        lotName: lotConfig.name,
        type: lotConfig.type,
        coCode: lotConfig.coCode,
        ccCode: lotConfig.ccCode,
        unionCode: lotConfig.unionCode,
        quantity: lotConfig.quantity,
        createdOn: payload.creationDate,
        batchIds: batches.map((b) => b._id),
        note: payload.note,
      });
      if (success) {
        data.batches.map((b) => update({ ...b, lotStatus: data.lot.lotStatus }));
        notification(MLOT.CREATED, NotificationType.Success, data.lot);
        onClose();
      }
    } catch (e) {
      notification(e.message);
    }
  };

  return (
    <DialogContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleSubmit)}>
          <DialogHeader fontWeight={"bold"} fontSize={"4xl"}>
            ✨ Create Lot
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <DateTimeInputField
              name="creationDate"
              label="Creation Date"
              format="dd-MM-yyyy"
              min={highestDate}
            />
            <Table data={batches} columns={[...lotCreateModalCols]} />
            <Flex justifyContent="flex-end" mt={4}>
              <Box>
                <strong>Total</strong> {lotConfig.quantity} KG(s)
              </Box>
            </Flex>
            <TextBoxField name="note" label="Note" mb={0} />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose} variant={"subtle"}>
              Close
            </Button>
            <SubmitButton leftIcon={<Check2Icon />} isDisabled={batches.length === 0}>
              Create Lot
            </SubmitButton>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}
