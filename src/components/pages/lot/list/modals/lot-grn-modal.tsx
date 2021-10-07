import {
  Alert,
  AlertIcon,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckBox, DateTime, Submit, TextBox } from "@components/@core/formik";
import { axUpdateGRN } from "@services/lot.service";
import { LOT_FLAGS } from "@static/constants";
import { LOT_GRN } from "@static/events";
import { isEverythingFilledExcept } from "@utils/basic.util";
import { Formik } from "formik";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import SaveIcon from "src/icons/save";
import { Lot } from "types/traceability";
import * as Yup from "yup";

export default function LotGRNModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [isDone, setIsDone] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useListener(
    ({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      setErrorMessage(undefined);
      setIsDone(lot.grnStatus === LOT_FLAGS.DONE);
    },
    [LOT_GRN]
  );

  const grnUpdateForm = {
    validationSchema: Yup.object().shape({
      grnNumber: Yup.string().nullable(),
      grnTimestamp: Yup.number().nullable(),
      finalizeGrnStatus: Yup.boolean().nullable(),
    }),
    initialValues: {
      grnNumber: lot.grnNumber,
      grnTimestamp: lot.grnTimestamp,
      finalizeGrnStatus: isDone,
    },
  };

  const handleOnSubmit = async (values, actions) => {
    const { success, data } = await axUpdateGRN({
      id: lot.id,
      ...values,
    });
    if (success) {
      update(data);
      onClose();
    } else {
      setErrorMessage(data);
    }
    actions.setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <Formik {...grnUpdateForm} enableReinitialize={true} onSubmit={handleOnSubmit}>
        {(props) => {
          const isFormReadOnly = !canWrite || props.values.finalizeGrnStatus;
          const isFinalizeEnabled =
            !isDone && canWrite && isEverythingFilledExcept("finalizeGrnStatus", props.values);
          return (
            <form onSubmit={props.handleSubmit}>
              <ModalContent>
                <ModalHeader>🔢 Add GRN Number</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <TextBox name="grnNumber" label="GRN Number" disabled={isFormReadOnly} />
                  <DateTime name="grnTimestamp" label="Date" disabled={isFormReadOnly} />
                  <CheckBox
                    name="finalizeGrnStatus"
                    label={
                      <span>
                        Finalize GRN Number <Badge colorScheme="red">irreversible</Badge>
                      </span>
                    }
                    isDisabled={!isFinalizeEnabled}
                  />
                  {errorMessage && (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon /> {errorMessage}
                    </Alert>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Submit leftIcon={<SaveIcon />} isDisabled={!canWrite}>
                    Save
                  </Submit>
                </ModalFooter>
              </ModalContent>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
