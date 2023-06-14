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
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateBatch } from "@services/batch.service";
import { BATCH } from "@static/messages";
import { yupSchemaMapping } from "@utils/form";
import notification, { NotificationType } from "@utils/notification";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

export default function BatchUpdateForm({ batch, update, onClose }) {
  const fieldsObj = batch.modalFieldCombined.find((o) => o.modalFieldId === batch.showModalById);

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
        finalizeBatch: Yup.boolean(),
      })
    ),
    defaultValues: {
      ...formValues.defaultValues,
      finalizeBatch: batch.isReadyForLot || false,
    },
  });

  //const values = hForm.watch();

  const handleOnSubmit = async (payload) => {
    try {
      const updatedPayload = {
        fields: payload,
        columnName: fieldsObj.columnName,
        selectedModalFieldId: batch.showModalById,
      };
      const { success, data } = await axUpdateBatch({ ...updatedPayload, id: batch._id });
      if (success) {
        update(data);
        onClose();
        notification(BATCH.UPDATED, NotificationType.Success);
      }
    } catch (e) {
      notification(e.message);
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <ModalContent>
          <ModalHeader pb={0}>
            Update Batch
            <br />
            {batch && batch.batchName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* dynamic Fields */}
            {fieldsObj.fields.map((field, index) => {
              if (field.fieldType === "input") {
                return (
                  <TextBoxField
                    mb={0}
                    name={field.name}
                    id={field.name}
                    label={field.label}
                    placeholder={field.label}
                    type={field.type}
                    key={index}
                    disabled={batch.isReadyForLot}
                  />
                );
              } else if (field.fieldType === "Title") {
                return (
                  <div className="flex gap-2 justify-center text-black" key={index}>
                    <ModalHeader pb={0} px={0}>
                      {field.value}
                    </ModalHeader>
                  </div>
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
              name="finalizeBatch"
              label={
                <span>
                  Ready for Lot <Badge colorScheme="red">irreversible</Badge>
                </span>
              }
              isDisabled={batch.isReadyForLot || !hForm.formState.isValid}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={batch.isReadyForLot}>
              Save
            </SubmitButton>
          </ModalFooter>
        </ModalContent>
      </form>
    </FormProvider>
  );
}
