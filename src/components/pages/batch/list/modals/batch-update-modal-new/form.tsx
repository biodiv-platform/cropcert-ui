import { Badge, Box, Button, Input, Text } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateBatch } from "@services/batch.service";
import { BATCH } from "@static/messages";
import { isEverythingFilledExcept } from "@utils/basic";
import { yupSchemaMapping } from "@utils/form";
import notification, { NotificationType } from "@utils/notification";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SaveIcon from "src/icons/save";
import * as Yup from "yup";

import { Alert } from "@/components/ui/alert";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";

export default function BatchUpdateForm({
  batch,
  update,
  onClose,
  canWrite,
  errorMessage,
  isDone,
}) {
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
                [currField.name]: yupSchemaMapping[currField.yupSchema](min, max),
              };
            }
          } else if (currField.yupSchema === "maxBatchQuantity") {
            if (currField.required) {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema](batch.quantity).required(),
              };
            } else {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema](batch.quantity),
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

  const values = hForm.watch();

  const formulas = {
    outTurn: (
      (values?.weight_leaving_factory * 100) / values?.weight_arriving_factory || 0
    ).toFixed(2),
  };

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

  const isFormReadOnly = !canWrite || values.finalizeBatch;
  const isFinalizeEnabled =
    !isDone && canWrite && isEverythingFilledExcept("finalizeBatch", values);

  return (
    <DialogContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          {fieldsObj &&
            fieldsObj.fields.map((field, index) => {
              if (field.fieldType === "Title") {
                return (
                  <DialogHeader key={index} px={5} fontWeight={"bold"} fontSize={"lg"}>
                    {field.value}
                    <br />
                    <Box>
                      <Text fontSize="md">Batch Name: {batch && batch.batchName}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm">Batch Quantity: {batch && batch.quantity}(Kgs)</Text>
                    </Box>
                  </DialogHeader>
                );
              } else if (field.fieldType === "SubTitle") {
                return (
                  <div className="flex gap-2 justify-center text-black" key={index}>
                    <h2 className="text-sm">{field.value}</h2>
                  </div>
                );
              }
            })}
          <DialogCloseTrigger />
          <DialogBody>
            {/* dynamic Fields */}
            <CoreGrid rows={2}>
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
                      disabled={isFormReadOnly}
                    />
                  );
                } else if (field.fieldType === "auto") {
                  return (
                    <Field mb={4}>
                      <Field>{field.label}</Field>
                      <Input
                        mb={0}
                        name={field.name}
                        id={field.name}
                        placeholder={"40%"}
                        type={field.type}
                        key={index}
                        value={`${formulas[field?.formula]} %`}
                        disabled={true}
                      />
                    </Field>
                  );
                }
              })}
            </CoreGrid>
            {fieldsObj.fields.map((field, index) => {
              if (field.fieldType === "confirmCheckBoxField") {
                return (
                  <CheckBoxField
                    mt={2}
                    key={index}
                    name="finalizeBatch"
                    label={
                      <span>
                        {field.label} <Badge colorPalette="red">irreversible</Badge>
                      </span>
                    }
                    isDisabled={!isFinalizeEnabled}
                  />
                );
              }
            })}
            {errorMessage && (
              <Alert status="error" borderRadius="md">
                {errorMessage}
              </Alert>
            )}
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose} variant={"subtle"}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={!canWrite}>
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}
