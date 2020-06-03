import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import Accesser from "@components/@core/accesser";
import { DateTime, Number, Select, Submit, TextBox } from "@components/@core/formik";
import { CoreGrid } from "@components/@core/layout";
import { axCreateBatch } from "@services/batch.service";
import { DATEFORMATS, ROLES } from "@static/constants";
import { BATCH_CREATE } from "@static/events";
import { BATCH } from "@static/messages";
import { local2utc, typeList, utc2local } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import dayjs from "dayjs";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useListener } from "react-gbus";
import * as Yup from "yup";

export default function BatchCreateModal({ update }) {
  const [cc, setCc] = useState({} as any);
  const [batchType, setBatchType] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setBatchType(cc ? typeList(cc.type) : []);
  }, [cc]);

  const validationSchema = Yup.object().shape({
    ccCode: Yup.string().required(),
    quantity: Yup.number().min(1).required(),
    date: Yup.number().required(),
    type: Yup.string().required(),
  });

  const initialValues = {
    ccCode: cc ? cc.value : null,
    quantity: 0,
    date: local2utc().getTime(),
    note: "",
    type: null,
  };

  const handleSubmit = async (values, actions) => {
    const formData = {
      ...values,
      createdOn: local2utc().getTime(),
      batchName: `${cc.label}_${values.type.charAt(0)}_batch_${dayjs(utc2local(values.date)).format(
        DATEFORMATS.DAYJS_DATE
      )}`,
    };
    const { success, data } = await axCreateBatch(formData);
    if (success) {
      update(data);
      onClose();
      notification(BATCH.CREATED, NotificationType.Success, data);
    }
  };

  useListener(onOpen, [BATCH_CREATE]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="2xl">
      <ModalOverlay />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <ModalContent>
              <ModalHeader>✨ Create Batch</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CoreGrid rows={3}>
                  <Accesser toRole={ROLES.COLLECTION_CENTER} onChange={setCc} />
                </CoreGrid>
                <CoreGrid rows={3}>
                  <Select name="type" label="Batch Type" options={batchType} />
                  <DateTime name="date" label="Date" />
                  <Number name="quantity" label="Quantity" />
                </CoreGrid>
                <TextBox name="note" label="Note" mb={0} />
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Submit props={props} leftIcon="check2">
                  Create Batch
                </Submit>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
