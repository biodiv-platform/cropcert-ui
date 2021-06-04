import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckBox, DateTime, Number, Submit } from "@components/@core/formik";
import SelectInputField from "@components/@core/formik/select";
import { CoreGrid } from "@components/@core/layout";
import { axDispatchLotFactory } from "@services/lot.service";
import { LOT_FLAGS } from "@static/constants";
import { LOT_FACTORY_PROCESS } from "@static/events";
import notification from "@utils/notification.util";
import { Formik } from "formik";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import SaveIcon from "src/icons/save";
import { Lot } from "types/traceability";
import * as Yup from "yup";

export default function LotFactoryDispatchModal({ update, unions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [canWrite, setCanWrite] = useState(false);

  useListener(
    ({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
    },
    [LOT_FACTORY_PROCESS]
  );

  const batchUpdateForm = {
    validationSchema: Yup.object().shape({
      weightArrivingFactory: Yup.number().min(1).nullable(),
      mcArrivingFactory: Yup.number().nullable(),

      weightLeavingFactory: Yup.number().min(1).nullable(),
      mcLeavingFactory: Yup.number().nullable(),

      millingTime: Yup.number().nullable(),
      finalizeMillingStatus: Yup.boolean(),
      unionCode: Yup.number().nullable(),
    }),
    initialValues: {
      weightArrivingFactory: lot.weightArrivingFactory,
      mcArrivingFactory: lot.mcArrivingFactory,

      weightLeavingFactory: lot.weightLeavingFactory,
      mcLeavingFactory: lot.mcLeavingFactory,

      millingTime: lot.millingTime,
      finalizeMillingStatus: lot.millingStatus === LOT_FLAGS.DONE,
      unionCode: lot.unionCode,
    },
  };

  const handleOnSubmit = async (values, actions) => {
    if (values.finalizeMillingStatus && !values.unionCode) {
      notification("Union Code is Required");
      return;
    }
    const { success, data } = await axDispatchLotFactory({
      id: lot.id,
      ...values,
    });
    if (success) {
      update(data);
      onClose();
    }
    actions.setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="3xl">
      <ModalOverlay />
      <Formik {...batchUpdateForm} enableReinitialize={true} onSubmit={handleOnSubmit}>
        {(props) => {
          const outTurn = (
            (props.values.weightLeavingFactory * 100) / props.values.weightArrivingFactory || 0
          ).toFixed(2);
          const isFDisabled = !canWrite || props.values.finalizeMillingStatus;
          const isFCheckbox =
            !canWrite ||
            !(
              props.values.weightArrivingFactory &&
              props.values.mcArrivingFactory &&
              props.values.weightLeavingFactory &&
              props.values.mcLeavingFactory &&
              props.values.millingTime
            );

          return (
            <form onSubmit={props.handleSubmit}>
              <ModalContent>
                <ModalHeader>🏭 Update milling details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CoreGrid rows={2}>
                    <Number
                      name="weightArrivingFactory"
                      label="Weight Arriving Factory"
                      disabled={isFDisabled}
                    />
                    <Number
                      name="mcArrivingFactory"
                      label="Moisture Content Arriving Factory"
                      disabled={isFDisabled}
                    />
                  </CoreGrid>

                  <CoreGrid rows={2}>
                    <Number
                      name="weightLeavingFactory"
                      label="Weight Leaving Factory"
                      disabled={isFDisabled}
                    />
                    <Number
                      name="mcLeavingFactory"
                      label="Moisture Content Leaving Factory"
                      disabled={isFDisabled}
                    />
                  </CoreGrid>

                  <CoreGrid rows={2}>
                    <DateTime
                      name="millingTime"
                      label="Milling Time"
                      defaultBlank={true}
                      isNow={true}
                      disabled={isFDisabled}
                      min={lot.timeToFactory}
                    />
                    <FormControl mb={4}>
                      <FormLabel>Out Turn</FormLabel>
                      <Input value={`${outTurn} %`} isDisabled={true} />
                    </FormControl>
                  </CoreGrid>

                  <CoreGrid rows={2}>
                    <SelectInputField
                      name="unionCode"
                      label="Union"
                      options={unions}
                      isDisabled={isFDisabled}
                    />
                  </CoreGrid>

                  <CheckBox
                    name="finalizeMillingStatus"
                    label={
                      <span>
                        Dispatch to Union <Badge colorScheme="red">irreversible</Badge>
                      </span>
                    }
                    isDisabled={isFCheckbox}
                  />
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
