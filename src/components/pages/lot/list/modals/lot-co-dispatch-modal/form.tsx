import {
  Badge,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { NumberInputField } from "@components/form/number";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth";
import { isEverythingFilledExcept } from "@utils/basic";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

export default function LotCoDispatchForm({ onSubmit, onClose, isDone, lot }) {
  const { user } = useGlobalState();
  const canEdit = hasAccess(hierarchicalRoles(ROLES.COOPERATIVE), user);

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        weightLeavingCooperative: Yup.number().min(1).nullable(),
        mcLeavingCooperative: Yup.number().nullable(),
        timeToFactory: Yup.number().nullable(),
        finalizeCoopStatus: Yup.boolean().nullable(),
      })
    ),
    defaultValues: {
      weightLeavingCooperative: lot.weightLeavingCooperative,
      mcLeavingCooperative: lot.mcLeavingCooperative,
      timeToFactory: lot.timeToFactory,
      finalizeCoopStatus: isDone,
    },
  });

  const values = hForm.watch();

  const [isFormReadOnly, isFinalizeEnabled] = useMemo(
    () => [
      isDone || !canEdit || values.finalizeCoopStatus,
      !isDone && canEdit && isEverythingFilledExcept("finalizeCoopStatus", values),
    ],
    [values]
  );

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>🚚 Dispatch Lot to Milling</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInputField
              name="weightLeavingCooperative"
              label="Weight Leaving Cooperative"
              disabled={isFormReadOnly}
            />
            <NumberInputField
              name="mcLeavingCooperative"
              label="Moisture Content Leaving Cooperative (%)"
              disabled={isFormReadOnly}
            />
            <DateTimeInputField
              name="timeToFactory"
              label="Time To Milling"
              defaultBlank={true}
              isNow={true}
              disabled={isFormReadOnly}
            />
            <CheckBoxField
              name="finalizeCoopStatus"
              label={
                <span>
                  Dispatch to Milling <Badge colorScheme="red">irreversible</Badge>
                </span>
              }
              isDisabled={!isFinalizeEnabled}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={isDone || !canEdit}>
              Save
            </SubmitButton>
          </ModalFooter>
        </ModalContent>
      </form>
    </FormProvider>
  );
}
