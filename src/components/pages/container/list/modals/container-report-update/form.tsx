import { Badge, Box, Button, Grid } from "@chakra-ui/react";
import { CheckBoxField } from "@components/form/checkbox";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateContainer } from "@services/container.service";
import { MCONTAINER } from "@static/messages";
import { isEverythingFilledExcept } from "@utils/basic";
import { yupSchemaMapping } from "@utils/form";
import notification, { NotificationType } from "@utils/notification";
import React, { useEffect } from "react";
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

  // Find the net weight field name
  const netWeightField = fieldsObj?.fields.find(
    (f) => f.name?.includes("net_weight") || f.name === "net_weight_kgs"
  );
  const netWeightFieldName = netWeightField?.name;

  // Find all total kgs fields from sections
  const totalKgsFields = fieldsObj?.fields.filter(
    (f) =>
      f.name?.includes("total_kgs") &&
      f.name !== "total_kgs" &&
      !f.name.startsWith("net_") &&
      !f.name.startsWith("gross_")
  );
  const totalKgsFieldNames = totalKgsFields?.map((f) => f.name) || [];

  // Create a custom validation function for net weight
  const validateNetWeight = (value, context) => {
    if (!netWeightFieldName || totalKgsFieldNames.length === 0) return true;

    const totalSectionKgs = totalKgsFieldNames.reduce((sum, fieldName) => {
      const fieldValue = context.parent[fieldName];
      return sum + (Number(fieldValue) || 0);
    }, 0);

    return Number(value) >= totalSectionKgs;
  };

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
          } else if (currField.name === netWeightFieldName) {
            // Custom validation for net weight field
            yupSchema = {
              ...acc.yupSchema,
              [currField.name]: Yup.number()
                .min(1, "Net weight must be at least 1")
                .test(
                  "greaterThanOrEqualTotalKgs",
                  "Net weight must be greater than or equal to the sum of all section total kgs",
                  validateNetWeight
                )
                .required("Net weight is required"),
            };
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
    mode: "all", // Changed from "onBlur" to "all" to validate on change as well
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

  // Add effect to trigger validation of net weight when any total kgs field changes
  useEffect(
    () => {
      if (netWeightFieldName && values[netWeightFieldName]) {
        hForm.trigger(netWeightFieldName);
      }
    },
    totalKgsFieldNames.map((fieldName) => values[fieldName])
  );

  const handleOnSubmit = async (payload) => {
    // Additional pre-submission validation
    if (netWeightFieldName && totalKgsFieldNames.length > 0) {
      const netWeightValue = Number(payload[netWeightFieldName]) || 0;
      const totalSectionKgs = totalKgsFieldNames.reduce((sum, fieldName) => {
        return sum + (Number(payload[fieldName]) || 0);
      }, 0);

      if (netWeightValue < totalSectionKgs) {
        notification(
          "Net weight must be greater than or equal to the sum of all section total kgs",
          NotificationType.Error
        );
        return;
      }
    }

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
            <Grid templateColumns="repeat(4, 1fr)" gapX={4} gapY={2}>
              {fieldsObj.fields.map((field, index) => {
                const sections = fieldsObj.fields.filter((f) => f.fieldType === "section");
                const isLastSection = sections[sections.length - 1]?.value === field.value;
                const isOddSections = sections.length % 2 !== 0;

                if (field.fieldType === "section") {
                  return (
                    <Box
                      key={index}
                      gridColumn={isLastSection && isOddSections ? "span 4" : "span 2"}
                      fontSize="md"
                      fontWeight="bold"
                      pb={1}
                      mt={2}
                    >
                      {field.value}
                    </Box>
                  );
                } else if (field.fieldType === "input") {
                  return (
                    <Box key={index}>
                      <TextBoxField
                        name={field.name}
                        id={field.name}
                        label={
                          field?.showPercent
                            ? `${field.label} ${formula.percent(field.name)}`
                            : field.label
                        }
                        placeholder={field.label}
                        type={field.type}
                        disabled={isFormReadOnly || field.disabled}
                      />
                    </Box>
                  );
                } else if (field.fieldType === "confirmCheckBoxField") {
                  return (
                    <Box key={index} gridColumn="span 4">
                      <CheckBoxField
                        name="finalizeContainerColumn"
                        label={
                          <span>
                            {field.label} <Badge colorScheme="red">irreversible</Badge>
                          </span>
                        }
                        isDisabled={!isFinalizeEnabled}
                      />
                    </Box>
                  );
                }
              })}
            </Grid>

            {errorMessage && (
              <Alert status="error" borderRadius="md" mt={4}>
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
