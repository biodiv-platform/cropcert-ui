import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/core";
import { DateTime, Submit } from "@components/@core/formik";
import Table from "@components/@core/table";
import { axCreateLot } from "@services/lot.service";
import { BATCH_TYPE } from "@static/constants";
import { LOT_CREATE } from "@static/events";
import { MLOT } from "@static/messages";
import { formattedDate } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import { Formik } from "formik";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { MdCheck } from "react-icons/md";
import { Batch } from "types/traceability";
import * as Yup from "yup";

import { lotCreateModalCols, lotCreateModalColsExtra } from "../data";

function LotCreateModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [batches, setBatches] = useState([] as Batch[]);
  const [lotConfig, setLotConfig] = useState({ name: "", type: "", coCode: -1, quantity: 0 });
  const [highestDate, setHighestDate] = useState(0);

  const batchUpdateForm = {
    validationSchema: Yup.object().shape({
      creationDate: Yup.number().nullable()
    }),
    initialValues: {
      creationDate: ""
    }
  };

  const handleOnSubmit = async (values, actions) => {
    try {
      const { success, data } = await axCreateLot({
        lotName: lotConfig.name + formattedDate(values.creationDate),
        type: lotConfig.type,
        coCode: lotConfig.coCode,
        quantity: lotConfig.quantity,
        createdOn: values.creationDate,
        batchIds: batches.map(b => b.id)
      });
      if (success) {
        data.batches.map(b => update(b));
        notification(MLOT.CREATED, NotificationType.Success, data.lot);
        onClose();
      }
    } catch (e) {
      notification(e.message);
    }
    actions.setSubmitting(false);
  };

  useListener(({ selected, ...props }) => {
    setBatches(selected);
    setHighestDate(selected.reduce((acc, cv) => (cv.date > acc ? cv.date : acc), 0));
    setLotConfig({ name, ...props });
    onOpen();
  }, LOT_CREATE);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="xl">
      <ModalOverlay />
      <Formik {...batchUpdateForm} enableReinitialize={true} onSubmit={handleOnSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <ModalContent>
              <ModalHeader>
                Finalize Lot: {lotConfig.name}
                {formattedDate(props.values.creationDate)}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DateTime
                  name="creationDate"
                  label="Creation Date"
                  format="dd-MM-yyyy"
                  min={highestDate}
                />
                <Table
                  data={batches}
                  columns={[
                    ...lotCreateModalCols,
                    ...(lotConfig.type === BATCH_TYPE.WET ? lotCreateModalColsExtra : [])
                  ]}
                />
                <Flex justifyContent="flex-end" mt={4}>
                  <Box>
                    <strong>Total</strong> {lotConfig.quantity} KG(s)
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Submit props={props} leftIcon={MdCheck} isDisabled={batches.length === 0}>
                  Create Lot
                </Submit>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
export default LotCreateModal;
