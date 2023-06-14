import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Box,
  Flex,
} from "@chakra-ui/react";
import Table from "@components/@core/table";

import Accesser from "@components/@core/accesser";
import { CoreGrid } from "@components/@core/layout";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SelectInputField } from "@components/form/select";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axCreateBatch } from "@services/batch.service";
import { DATEFORMATS, ROLES } from "@static/constants";
import { BATCH } from "@static/messages";
import { local2utc, typeList, utc2local } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Check2Icon from "src/icons/check2";
import * as Yup from "yup";
import { formattedDate } from "@utils/basic";

import { lotCreateModalCols, lotCreateModalColsExtra } from "../../data";

export default function BatchCreateForm({
  update,
  onClose,
  farmerProduceArr,
  batchConfig,
  highestDate,
}) {
  console.log("farmerProduceArr", farmerProduceArr);
  console.log("batchConfig", batchConfig);
  console.log("highestDate", highestDate);
  const [cc, setCc] = useState({} as any);
  const [batchType, setBatchType] = useState<any[]>([]);

  // const hForm = useForm<any>({
  //   mode: "onBlur",
  //   resolver: yupResolver(
  //     Yup.object().shape({
  //       ccCode: Yup.string().required(),
  //       quantity: Yup.number().min(1).required(),
  //       date: Yup.number().required(),
  //       type: Yup.string().required(),
  //     })
  //   ),
  //   defaultValues: {
  //     ccCode: cc?.value || null,
  //     quantity: 0,
  //     date: local2utc().getTime(),
  //     note: "",
  //     type: null,
  //   },
  // });

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        creationDate: Yup.number().nullable(),
        type: Yup.string().required(),
      })
    ),
    defaultValues: {
      creationDate: "",
      note: "",
      type: null,
    },
  });

  const values = hForm.watch();

  const handleSubmit = async (payload) => {
    try {
      console.log("payload from batch create", payload);
      const updatedPayload = {
        batchName:
          "Busalya_" +
          payload.type.charAt(0).toUpperCase() +
          "_" +
          formattedDate(payload.creationDate),
        type: payload.type,
        ccCode: 71, //TODO: add dynamically
        quantity: batchConfig.quantity,
        createdOn: values.creationDate,
        farmerProduceIds: farmerProduceArr.map((b) => b._id),
        note: payload.note,
      };

      console.log("updatedPayload from batch create", updatedPayload);
      const { success, data } = await axCreateBatch({ ...updatedPayload });
      if (success) {
        data.farmerProduceIds.map((b) => update({ ...b }));
        console.log("data after batch update", data);
        notification(BATCH.CREATED, NotificationType.Success, data.batch);
        onClose();
      }
    } catch (e) {
      notification(e.message);
    }
  };

  useEffect(() => {
    setBatchType(cc ? typeList(cc?.type) : []);
    hForm.setValue(`ccCode`, cc?.value);
  }, [cc]);

  // const handleSubmit = async (values) => {
  //   const formData = {
  //     ...values,
  //     createdOn: local2utc().getTime(),
  //     batchName: `${cc.label}_${values.type.charAt(0)}_batch_${dayjs(utc2local(values.date)).format(
  //       DATEFORMATS.DAYJS_DATE
  //     )}`,
  //   };
  //   const { success, data } = await axCreateBatch(formData);
  //   if (success) {
  //     const receivedData = data.batch;
  //     update(receivedData); //TODO: handle farmers data just like lot and batch data
  //     onClose();
  //     notification(BATCH.CREATED, NotificationType.Success, data);
  //   }
  // };

  return (
    <ModalContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleSubmit)}>
          <ModalHeader>✨ Create Batch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CoreGrid rows={1}>
              <SelectInputField name="type" label="Batch Type" options={batchType} />
            </CoreGrid>
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

        {/* <form onSubmit={hForm.handleSubmit(handleSubmit)}>
          <ModalContent>
            <ModalHeader>
              Finalize Lot: {lotConfig.name}
              {formattedDate(values.creationDate)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <SubmitButton leftIcon={<Check2Icon />} isDisabled={batches.length === 0}>
                Create Lot
              </SubmitButton>
            </ModalFooter>
          </ModalContent>
        </form> */}
      </FormProvider>
    </ModalContent>
  );
}
