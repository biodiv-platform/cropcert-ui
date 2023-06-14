import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
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

export default function BatchCreateForm({ update, onClose }) {
  const [cc, setCc] = useState({} as any);
  const [batchType, setBatchType] = useState<any[]>([]);

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        ccCode: Yup.string().required(),
        quantity: Yup.number().min(1).required(),
        date: Yup.number().required(),
        type: Yup.string().required(),
      })
    ),
    defaultValues: {
      ccCode: cc?.value || null,
      quantity: 0,
      date: local2utc().getTime(),
      note: "",
      type: null,
    },
  });

  useEffect(() => {
    setBatchType(cc ? typeList(cc?.type) : []);
    hForm.setValue(`ccCode`, cc?.value);
  }, [cc]);

  const handleSubmit = async (values) => {
    const formData = {
      ...values,
      createdOn: local2utc().getTime(),
      batchName: `${cc.label}_${values.type.charAt(0)}_batch_${dayjs(utc2local(values.date)).format(
        DATEFORMATS.DAYJS_DATE
      )}`,
    };
    const { success, data } = await axCreateBatch(formData);
    if (success) {
      const receivedData = data.batch;
      update(receivedData); //TODO: handle farmers data just like lot and batch data
      notification(BATCH.CREATED, NotificationType.Success, data.batch);
      onClose();
    }
  };

  return (
    <ModalContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleSubmit)}>
          <ModalHeader>✨ Create Batch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CoreGrid rows={3}>
              <Accesser toRole={ROLES.COLLECTION_CENTER} onChange={setCc} />
            </CoreGrid>
            <CoreGrid rows={3}>
              <SelectInputField name="type" label="Batch Type" options={batchType} />
              <DateTimeInputField name="date" label="Date" />
              <NumberInputField name="quantity" label="Quantity" />
            </CoreGrid>
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
