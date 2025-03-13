import { Badge, Button } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateContainer } from "@services/container.service";
import { MCONTAINER } from "@static/messages";
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

export default function ContainerGRNForm({
  onClose,
  container,
  canWrite,
  errorMessage,
  isDone,
  update,
}) {
  const fieldsObj = container.modalFieldCombined.find(
    (o) => o.modalFieldId === container.showModalById
  );

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
          } else {
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
        finalizeContainerColumn: Yup.boolean().nullable(),
      })
    ),
    defaultValues: {
      ...formValues.defaultValues,
      finalizeContainerColumn: isDone,
    },
  });

  const values = hForm.watch();

  const handleOnSubmit = async (payload) => {
    try {
      const updatedPayload = {
        fields: payload,
        columnName: fieldsObj.columnName,
        id: container._id,
        selectedModalFieldId: fieldsObj.modalFieldId,
      };
      const { success, data } = await axUpdateContainer({ ...updatedPayload });
      if (success) {
        update(data);
        onClose();
        notification(MCONTAINER.UPDATED, NotificationType.Success, data);
      }
    } catch (e) {
      notification(e.message);
    }
  };

  const formula = {
    percent: (fieldName) => {
      const field = fieldsObj.fields.find((f) => f.name === fieldName);

      if (
        !field ||
        !field.percentBaseField ||
        !values[field.percentBaseField] ||
        !values[fieldName]
      ) {
        return "";
      }

      const output = ((values[fieldName] / values[field.percentBaseField]) * 100).toFixed(2);
      return `(${output} %)`;
    },
  };

  const isFormReadOnly = !canWrite || values.finalizeContainerColumn;
  const isFinalizeEnabled =
    !isDone && canWrite && isEverythingFilledExcept("finalizeContainerColumn", values);

  return (
    <DialogContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          {fieldsObj.fields.map((field, index) => {
            if (field.fieldType === "Title") {
              return (
                <DialogHeader key={index} px={5} fontWeight={"bold"} fontSize={"lg"}>
                  {field.value}
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
            <CoreGrid rows={2}>
              {fieldsObj.fields.map((field, index) => {
                if (field.fieldType === "input") {
                  return (
                    <TextBoxField
                      mb={2}
                      name={field.name}
                      id={field.name}
                      label={
                        field?.showPercent
                          ? `${field.label} ${formula.percent(field.name)}`
                          : field.label
                      }
                      placeholder={field.label}
                      type={field.type}
                      key={index}
                      disabled={isFormReadOnly || field.disabled}
                    />
                  );
                }
              })}
            </CoreGrid>
            <CheckBoxField
              name="finalizeContainerColumn"
              label={
                <span>
                  Finalize GRN Number <Badge colorPalette="red">irreversible</Badge>
                </span>
              }
              isDisabled={!isFinalizeEnabled}
            />
            {fieldsObj.fields.map((field, index) => {
              if (field.fieldType === "confirmCheckBoxField") {
                return (
                  <CheckBoxField
                    mt={2}
                    key={index}
                    name="finalizeContainerColumn"
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
