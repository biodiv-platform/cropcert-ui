import {
  Box,
  Button,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
} from "@chakra-ui/react";
// import Table from "@components/@core/table";
import { DateTimeInputField } from "@components/form/datepicker";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axCreateContainer } from "@services/container.service";
import { MCONTAINER } from "@static/messages";
import { formattedDate } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Check2Icon from "src/icons/check2";
import * as Yup from "yup";

// import { lotCreateModalCols } from "../../data";
// TODO: Do we need above line?

export function ContainerCreateForm({ update, lots, containerConfig, highestDate, onClose }) {
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

  const values = hForm.watch();

  const handleSubmit = async (payload) => {
    try {
      const { success, data } = await axCreateContainer({
        containerName: containerConfig.name + formattedDate(payload.creationDate),
        type: containerConfig.type,
        coCode: containerConfig.coCode,
        ccCode: containerConfig.ccCode,
        unionCode: containerConfig.unionCode,
        quantity: containerConfig.quantity,
        createdOn: payload.creationDate,
        lotIds: lots.map((b) => b._id),
        note: payload.note,
      });
      if (success) {
        data.batches.map((b) => update({ ...b, containerStatus: data.container.containerStatus }));
        notification(MCONTAINER.CREATED, NotificationType.Success, data.container);
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
          <DialogHeader fontWeight={"bold"} fontSize={"lg"}>
            Finalize container: {containerConfig.name}
            {formattedDate(values.creationDate)}
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <DateTimeInputField
              name="creationDate"
              label="Creation Date"
              format="dd-MM-yyyy"
              min={highestDate}
            />
            <Flex justifyContent="flex-end" mt={4}>
              <Box>
                <strong>Total</strong> {containerConfig.quantity} KG(s)
              </Box>
            </Flex>
            <TextBoxField name="note" label="Note" mb={0} />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose} variant={"subtle"}>
              Close
            </Button>
            <SubmitButton leftIcon={<Check2Icon />} isDisabled={lots.length === 0}>
              Create Lot
            </SubmitButton>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}
