import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/core";
import { CheckBox, DateTime, Number, Submit } from "@components/@core/formik";
import { axDispatchLotCoOperative } from "@services/lot.service";
import { ROLES, LOT_FLAGS } from "@static/constants";
import { LOT_DISPATCH_FACTORY } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import { isEverythingFilledExcept } from "@utils/basic.util";
import { useStoreState } from "easy-peasy";
import { Formik } from "formik";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { MdSave } from "react-icons/md";
import { Lot } from "types/traceability";
import * as Yup from "yup";

export default function LotCoDispatchModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [isDone, setIsDone] = useState(false);

  const user = useStoreState(state => state.user);
  const canEdit = hasAccess(hierarchicalRoles(ROLES.UNION), user);

  useListener((lot: Lot) => {
    onOpen();
    setLot(lot);
    setIsDone(lot.coopStatus === LOT_FLAGS.DONE);
  }, LOT_DISPATCH_FACTORY);

  const batchUpdateForm = {
    validationSchema: Yup.object().shape({
      weightLeavingCooperative: Yup.number()
        .min(1)
        .nullable(),
      mcLeavingCooperative: Yup.number().nullable(),
      timeToFactory: Yup.number().nullable(),
      finalizeCoopStatus: Yup.boolean().nullable()
    }),
    initialValues: {
      weightLeavingCooperative: lot.weightLeavingCooperative,
      mcLeavingCooperative: lot.mcLeavingCooperative,
      timeToFactory: lot.timeToFactory,
      finalizeCoopStatus: isDone
    }
  };

  const handleOnSubmit = async (values, actions) => {
    const { success, data } = await axDispatchLotCoOperative({
      id: lot.id,
      ...values
    });
    if (success) {
      update(data);
      onClose();
    }
    actions.setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <Formik {...batchUpdateForm} enableReinitialize={true} onSubmit={handleOnSubmit}>
        {props => {
          const isFormReadOnly = isDone || !canEdit || props.values.finalizeCoopStatus;
          const isFinalizeEnabled =
            !isDone && canEdit && isEverythingFilledExcept("finalizeCoopStatus", props.values);

          return (
            <form onSubmit={props.handleSubmit}>
              <ModalContent>
                <ModalHeader>🚚 Dispatch Lot to Factory</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Number
                    name="weightLeavingCooperative"
                    label="Weight Leaving Cooperative"
                    disabled={isFormReadOnly}
                  />
                  <Number
                    name="mcLeavingCooperative"
                    label="Moisture Content Leaving Cooperative"
                    disabled={isFormReadOnly}
                  />
                  <DateTime
                    name="timeToFactory"
                    label="Time To Factory"
                    defaultBlank={true}
                    isNow={true}
                    disabled={isFormReadOnly}
                  />
                  <CheckBox
                    name="finalizeCoopStatus"
                    label={
                      <span>
                        Dispatch to Factory <Badge variantColor="red">irreversible</Badge>
                      </span>
                    }
                    isDisabled={!isFinalizeEnabled}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Submit props={props} leftIcon={MdSave} isDisabled={isDone || !canEdit}>
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
