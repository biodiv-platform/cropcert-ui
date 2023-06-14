import {
  Alert,
  AlertIcon,
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
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEverythingFilledExcept } from "@utils/basic";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";
import { yupSchemaMapping } from "@utils/form";
import { MLOT } from "@static/messages";
import notification, { NotificationType } from "@utils/notification";
import { axUpdateLot } from "@services/lot.service";

export default function LotGRNForm({ onClose, lot, canWrite, errorMessage, isDone, update }) {
  const fieldsObj = lot.modalFieldCombined.find((o) => o.modalFieldId === lot.showModalById);

  // reducer to generate defaultValues and yupSchema dynamically
  const formValues =
    fieldsObj &&
    fieldsObj.fields.reduce(
      (acc, currField) => {
        if (currField.fieldType === "input") {
          const defaultValues = {
            ...acc.defaultValues,
            [currField.name]: currField.value,
          };

          let yupSchema = {};

          // condition for number field with min and max
          if (currField.yupSchema === "numberFunc") {
            const [min, max] = currField.yupSchemaArgs;

            if (currField.required) {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema](min, max).required(),
              };
            } else {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema](min, max).required(),
              };
            }
          }
          // condition for remaining fields
          else {
            if (currField.required) {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema].required(),
              };
            } else {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema],
              };
            }
          }

          return {
            defaultValues,
            yupSchema,
          };
        }

        return acc;
      },
      {
        defaultValues: {},
        yupSchema: {},
      }
    );

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        ...formValues.yupSchema,
        finalizeLotColumn: Yup.boolean().nullable(),
      })
    ),
    defaultValues: {
      ...formValues.defaultValues,
      finalizeLotColumn: isDone,
    },
  });

  const values = hForm.watch();

  const handleOnSubmit = async (payload) => {
    try {
      const updatedPayload = {
        fields: payload,
        columnName: fieldsObj.columnName,
        id: lot._id,
        selectedModalFieldId: fieldsObj.modalFieldId,
      };
      const { success, data } = await axUpdateLot({ ...updatedPayload });
      if (success) {
        update(data);
        onClose();
        notification(MLOT.UPDATED, NotificationType.Success, data);
      }
    } catch (e) {
      notification(e.message);
    }
  };

  const isFormReadOnly = !canWrite || values.finalizeLotColumn;
  const isFinalizeEnabled =
    !isDone && canWrite && isEverythingFilledExcept("finalizeLotColumn", values);

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {/* dynamic Fields */}
            {fieldsObj.fields.map((field, index) => {
              if (field.fieldType === "input") {
                return (
                  <TextBoxField
                    mb={2}
                    name={field.name}
                    id={field.name}
                    label={field.label}
                    placeholder={field.label}
                    type={field.type}
                    key={index}
                    disabled={isFormReadOnly}
                  />
                );
              } else if (field.fieldType === "Title") {
                return (
                  <ModalHeader key={index} px={0}>
                    {field.value}
                  </ModalHeader>
                );
              } else if (field.fieldType === "SubTitle") {
                return (
                  <div className="flex gap-2 justify-center text-black" key={index}>
                    <h2 className="text-sm">{field.value}</h2>
                  </div>
                );
              }
            })}
            <CheckBoxField
              name="finalizeLotColumn"
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
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={!canWrite}>
              Save
            </SubmitButton>
          </ModalFooter>
        </ModalContent>
      </form>
    </FormProvider>
  );
}
