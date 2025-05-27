import { Badge, Text } from "@chakra-ui/react";
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
import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export default function LotGRNForm({
  onClose,
  lot,
  canWrite,
  errorMessage,
  isDone,
  update,
  canSplit,
}) {
  const [submitAction, setSubmitAction] = useState<"save" | "split">("save");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
                .test({
                  name: "faq-weight-check",
                  message: "FAQ weight validation failed",
                  test: function (value) {
                    // Get form values safely
                    const formValues = this.parent || {};

                    const total = faqSumFields.reduce((sum, field) => {
                      return sum + (Number(formValues[field]) || 0);
                    }, 0);

                    const isValid = value !== undefined && total <= value;

                    if (!isValid) {
                      return this.createError({
                        message: `Sum of SC_18, SC_15, SC_12, dust, UG, all bhp, defects various i.e. ${total} must not exceed Input FAQ weight i.e. ${
                          value || 0
                        }`,
                      });
                    }

                    return true;
                  },
                }),
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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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

  useEffect(() => {
    const input = Number(values[faqWeightField]);
    const denom =
      Number(values.SC_18) +
      Number(values.SC_15) +
      Number(values.SC_12) +
      Number(values.all_bhp) +
      Number(values.dust);

    if (input && denom) {
      const result = ((denom / input) * 100).toFixed(2);
      hForm.setValue("outturn", parseFloat(result));
    } else {
      hForm.setValue("outturn", null);
    }
  }, [
    values[faqWeightField],
    values.SC_18,
    values.SC_15,
    values.SC_12,
    values.all_bhp,
    values.dust,
  ]);

  const isSubLot = lot.lotId.includes("SL");

  return (
    <DialogContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          {fieldsObj.fields.map((field, index) => {
            if (field.fieldType === "Title") {
              return (
                <DialogHeader key={index} px={5} fontWeight={"bold"} fontSize={"lg"}>
                  {field.value} for {isSubLot ? "Sub Lot: " : "Lot: "}
                  {lot.lotId}
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
                        field?.showPercent ? (
                          <>
                            {field.label}
                            {field.required && (
                              <Text as="span" color="red.500">
                                {" "}
                                *
                              </Text>
                            )}
                            {" " + formula.percent(field.name)}
                          </>
                        ) : (
                          <>
                            {field.label}
                            {field.required && (
                              <Text as="span" color="red.500">
                                {" "}
                                *
                              </Text>
                            )}
                          </>
                        )
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
            <Button mr={3} onClick={onClose} variant={"subtle"} colorPalette={"gray"}>
              Close
            </Button>

            <Button
              loading={isSubmitting && submitAction === "save"}
              loadingText="Saving..."
              disabled={!isFinalizeEnabled || isSubmitting}
              variant={"subtle"}
              colorPalette={"blue"}
              type="submit"
              onClick={() => {
                setSubmitAction("save");
              }}
            >
              Save
            </Button>

            <Button
              loading={isSubmitting && submitAction === "split"}
              loadingText="Splitting..."
              disabled={!canSplit || isSubmitting || !values.finalizeLotColumn}
              variant={"surface"}
              colorPalette={"blue"}
              type="submit"
              onClick={() => {
                setSubmitAction("split");
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
