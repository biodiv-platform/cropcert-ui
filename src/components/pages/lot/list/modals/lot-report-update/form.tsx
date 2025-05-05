import { Badge, Button } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axSplitLot, axUpdateLot } from "@services/lot.service";
import { MLOT } from "@static/messages";
import { isEverythingFilledExcept } from "@utils/basic";
import { yupSchemaMapping } from "@utils/form";
import notification, { NotificationType } from "@utils/notification";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { Alert } from "@/components/ui/alert";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export default function LotGRNForm({ onClose, lot, canWrite, errorMessage, isDone, update }) {
  const [submitAction, setSubmitAction] = useState<"save" | "split">("save");

  const fieldsObj = lot.modalFieldCombined.find((o) => o.modalFieldId === lot.showModalById);

  // Fields that should be summed and compared to input_FAQ_weight
  const faqSumFields = ["SC_18", "SC_15", "SC_12", "dust", "UG", "all_bhp", "defects_various"];
  const faqWeightField = "input_FAQ_weight";

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
                [currField.name]: yupSchemaMapping[currField.yupSchema](min, max).required(
                  `${currField.label} is required`
                ),
              };
            } else {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema](min, max),
              };
            }
          } else if (currField.name === faqWeightField) {
            yupSchema = {
              ...acc.yupSchema,
              [currField.name]: Yup.number()
                .min(0)
                .required(`${currField.label} is required`)
                .test(
                  "faq-weight-check",
                  "Sum of SC_18, SC_15, SC_12, dust, UG, all bhp, defects various must not exceed FAQ weight",
                  function (value) {
                    const total = faqSumFields.reduce((sum, field) => {
                      return sum + (Number(this.parent[field]) || 0);
                    }, 0);
                    return total <= value;
                  }
                ),
            };
          }
          // condition for remaining fields
          else {
            if (currField.required) {
              yupSchema = {
                ...acc.yupSchema,
                [currField.name]: yupSchemaMapping[currField.yupSchema]
                  .transform((value, originalValue) => (originalValue === "" ? undefined : value))
                  .required(`${currField.label} is required`),
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

      if (submitAction === "save") {
        const { success, data } = await axUpdateLot({ ...updatedPayload });
        if (success) {
          update(data);
          onClose();
          notification(MLOT.UPDATED, NotificationType.Success, data);
        }
      } else if (submitAction === "split") {
        const { success, data } = await axSplitLot({ ...updatedPayload });
        if (success) {
          update(data);
          onClose();
          notification(MLOT.SPLITTED, NotificationType.Success, data);
        }
      }
    } catch (e) {
      notification(e.message);
    }
  };

  const formula = {
    percent: (fieldName) => {
      try {
        const field = fieldsObj.fields.find((f) => f.name === fieldName);
        if (!field || !field.percentBaseField) return "";

        const baseValue = Number(values[field.percentBaseField]);
        const currentValue = Number(values[fieldName]);

        if (isNaN(baseValue) || isNaN(currentValue) || baseValue === 0) {
          return "";
        }

        const output = ((currentValue / baseValue) * 100).toFixed(2);
        return `(${output} %)`;
      } catch (error) {
        console.error("Percentage calculation error:", error);
        return "";
      }
    },
  };

  const isFormReadOnly = !canWrite || values.finalizeLotColumn;
  const isFinalizeEnabled =
    !isDone && canWrite && isEverythingFilledExcept("finalizeLotColumn", values);

  useEffect(
    () => {
      if (values[faqWeightField]) {
        hForm.trigger(faqWeightField);
      }
    },
    faqSumFields.map((field) => values[field])
  );

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
            {/* dynamic Fields */}
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
                          ? `${field.label}${field.required ? " *" : ""} ${formula.percent(
                              field.name
                            )}`
                          : `${field.label}${field.required ? " *" : ""}`
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
            {fieldsObj.fields.map((field, index) => {
              if (field.fieldType === "confirmCheckBoxField") {
                return (
                  <CheckBoxField
                    mt={2}
                    key={index}
                    name="finalizeLotColumn"
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

            <Button
              disabled={!canWrite}
              variant={"solid"}
              onClick={() => {
                setSubmitAction("save");
                hForm.handleSubmit(handleOnSubmit)();
              }}
            >
              Save
            </Button>

            <Button
              disabled={!canWrite}
              variant={"solid"}
              onClick={() => {
                setSubmitAction("split");
                hForm.handleSubmit(handleOnSubmit)();
              }}
            >
              Split & Save
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}
