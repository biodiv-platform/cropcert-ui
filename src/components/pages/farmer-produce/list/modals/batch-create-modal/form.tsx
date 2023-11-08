import {
  Box,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import Table from "@components/@core/table";
import { DateTimeInputField } from "@components/form/datepicker";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axCreateBatch } from "@services/batch.service";
import { BATCH } from "@static/messages";
import { formattedDate } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Check2Icon from "src/icons/check2";
import * as Yup from "yup";

import { lotCreateModalCols } from "../../data";

export default function BatchCreateForm({
  update,
  onClose,
  farmerProduceArr,
  batchConfig,
  highestDate,
}) {
  const [cc] = useState({} as any);

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        creationDate: Yup.number().nullable(),
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
      const uniqueCCs = [...new Set(farmerProduceArr.map((b) => b.ccCode))]; // getting array of all unique ccCodes from selected farmerProduce records
      const updatedPayload = {
        batchName:
          "Buzaaya_" + // FIXME: get this name from odk api
          batchConfig.type.charAt(0).toUpperCase() +
          "_" +
          formattedDate(payload.creationDate),
        type: batchConfig.type,
        ccCode: uniqueCCs,
        quantity: batchConfig.quantity,
        createdOn: values.creationDate,
        farmerProduceIds: farmerProduceArr.map((b) => b._id),
        note: payload.note,
      };

      const { success, data } = await axCreateBatch({ ...updatedPayload });
      if (success) {
        data.farmerProduceIds.map((b) => update({ ...b }));
        notification(BATCH.CREATED, NotificationType.Success, data.batch);
        onClose();
      }
    } catch (e) {
      notification(e.message);
    }
  };

  useEffect(() => {
    hForm.setValue(`ccCode`, cc?.value);
  }, [cc]);

  return (
    <ModalContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleSubmit)}>
          <ModalHeader>✨ Create Batch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DateTimeInputField
              name="creationDate"
              label="Creation Date"
              format="dd-MM-yyyy"
              min={highestDate}
            />
            <Table data={farmerProduceArr} columns={[...lotCreateModalCols]} />
            <Flex justifyContent="flex-end" mt={4}>
              <Box>
                <strong>Total</strong> {batchConfig.quantity} KG(s)
              </Box>
            </Flex>
            <TextBoxField name="note" label="Note" mb={0} />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<Check2Icon />}>Create Batch</SubmitButton>
          </ModalFooter>
        </form>
      </FormProvider>
    </ModalContent>
  );
}
