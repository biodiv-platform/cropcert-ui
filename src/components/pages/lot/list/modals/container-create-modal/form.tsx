import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { DateTimeInputField } from "@components/form/datepicker";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axCreateContainer } from "@services/container.service";
import { MCONTAINER } from "@static/messages";
import { formattedDate } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Check2Icon from "src/icons/check2";
import * as Yup from "yup";

import WeightInputStepper from "@/components/@core/table/container-weight-reduce-cell";
import { Alert } from "@/components/ui/alert";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { containerCreateModalCols } from "../../data";

export function ContainerCreateForm({ update, lots, containerConfig, latestDate, onClose }) {
  const [restructureConfirmed, setRestructureConfirmed] = useState(false);
  const [weightsModified, setWeightsModified] = useState(false);
  const [originalLotWeights, setOriginalLotWeights] = useState({});
  const { t } = useTranslation();

  const hForm = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        creationDate: Yup.number().nullable().required(),
        maxWeight: Yup.number()
          .typeError("Max Weight must be a number")
          .positive("Max Weight must be positive")
          .required("Max Weight is required"),
      })
    ),
    defaultValues: {
      creationDate: "",
      note: "",
      maxWeight: "",
      updatedWeights: {},
    },
  });

  const values = hForm.watch();

  // Store original lot weights when component loads
  useEffect(() => {
    const weights = {};
    lots.forEach((lot) => {
      weights[lot._id] = lot.quantity || 0;
    });
    setOriginalLotWeights(weights);

    // Initialize updatedWeights with original weights
    const initialWeights = {};
    lots.forEach((lot) => {
      initialWeights[lot._id] = lot.quantity || 0;
    });
    hForm.setValue("updatedWeights", initialWeights);
  }, [lots, hForm]);

  // Helper: determine if splitting is needed
  const isSplitting =
    Number(values.maxWeight) > 0 && Number(values.maxWeight) < containerConfig.quantity;

  // Prepare updated weights state for lots
  const updatedWeights = hForm.watch("updatedWeights") || {};

  // Calculate total of updated weights
  const updatedTotal = lots.reduce((sum, lot) => sum + (Number(updatedWeights?.[lot._id]) || 0), 0);

  // Helper: determine if restructuring is still needed after changes
  // const restructuringNeeded =
  //   isSplitting && !restructureConfirmed && updatedTotal > Number(values.maxWeight);

  // Calculate remaining weights for split lots
  const remainingLots = React.useMemo(() => {
    if (!restructureConfirmed) return [];

    return lots
      .map((lot) => {
        const originalWeight = originalLotWeights[lot._id] || 0;
        const updatedWeight = Number(updatedWeights?.[lot._id]) || 0;
        const remainingWeight = originalWeight - updatedWeight;

        // Only include lots that have been reduced
        if (remainingWeight > 0) {
          return {
            ...lot,
            weight: remainingWeight,
            originalWeight,
            updatedWeight,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove null entries
  }, [lots, updatedWeights, restructureConfirmed, originalLotWeights]);

  // Columns for the main table when restructuring is confirmed
  const confirmedColumns = React.useMemo(() => {
    return [
      ...containerCreateModalCols,
      {
        name: "Selected Weight (KG)",
        selector: (row) => Number(updatedWeights?.[row._id]) || 0,
        width: "120px",
        right: true,
      },
    ];
  }, [containerCreateModalCols, updatedWeights]);

  // Columns for remaining weights table
  const remainingColumns = React.useMemo(() => {
    return [
      ...containerCreateModalCols,
      {
        name: "Remaining Weight (KG)",
        selector: (row) => row.weight,
        width: "120px",
        right: true,
      },
      {
        name: "Used Weight (KG)",
        selector: (row) => row.updatedWeight,
        width: "120px",
        right: true,
      },
    ];
  }, [containerCreateModalCols]);

  // Columns for the main table with weight editing
  const editingColumns = React.useMemo(() => {
    return [
      ...containerCreateModalCols,
      {
        name: "Updated Weight (KG)",
        selector: (row) => row._id,
        cell: (row) => {
          const fieldName = `updatedWeights.${row._id}`;
          // @ts-ignore
          const currentValue = useWatch({ name: fieldName, control: hForm.control }) || 0;
          const originalWeight = originalLotWeights[row._id] || 0;

          const updateValue = (v: number) => {
            // @ts-ignore
            hForm.setValue(fieldName, v);
            setWeightsModified(true);
          };

          return (
            <WeightInputStepper
              value={Number(currentValue) || 0}
              onChange={updateValue}
              min={0}
              max={originalWeight}
              step={1}
            />
          );
        },
        ignoreRowClick: true,
        allowOverflow: true,
        width: "250px",
      },
    ];
  }, [containerCreateModalCols, originalLotWeights, hForm]);

  const getColumns = () => {
    if (restructureConfirmed) {
      return confirmedColumns;
    } else {
      return editingColumns;
    }
  };

  const handleConfirmRestructuring = () => {
    // Validate if updatedTotal is less than or equal to maxWeight
    if (isSplitting && updatedTotal > Number(values.maxWeight)) {
      notification("Total weight still exceeds container capacity.", NotificationType.Error);
      return;
    }

    setRestructureConfirmed(true);
  };

  const handleSubmit = async (payload) => {
    try {
      const useSplitting =
        Number(payload.maxWeight) > 0 && Number(payload.maxWeight) < containerConfig.quantity;

      if (useSplitting && !restructureConfirmed && weightsModified) {
        notification(
          "Please confirm restructuring before creating container.",
          NotificationType.Warning
        );
        return;
      }

      const updatedWeightsObj = payload.updatedWeights || {};

      // Prepare lots to include in the container (used lots)
      const usedLots = lots
        .map((lot) => {
          const updatedWeight = Number(updatedWeightsObj[lot._id]) || 0;
          if (updatedWeight > 0) {
            return {
              ...lot,
              quantity: updatedWeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const remainingLotsToSend = remainingLots.map((lot) => {
        const { originalWeight, updatedWeight, weight, ...rest } = lot;
        return {
          ...rest,
          quantity: weight,
        };
      });

      const scrapLotIdAndQuantity = (lotArr) => {
        if (!lotArr) return [];
        return lotArr.map((lot) => ({
          _id: lot._id,
          quantity: lot.quantity,
        }));
      };

      const { success, data } = await axCreateContainer({
        containerData: {
          containerName: containerConfig.name + formattedDate(payload.creationDate),
          type: containerConfig.type,
          coCode: containerConfig.coCode,
          ccCode: containerConfig.ccCode,
          unionCode: containerConfig.unionCode,
          quantity: weightsModified ? updatedTotal : containerConfig.quantity,
          createdOn: payload.creationDate,
          maxWeight: payload.maxWeight,
          note: payload.note,
        },
        usedLots: weightsModified ? scrapLotIdAndQuantity(usedLots) : scrapLotIdAndQuantity(lots),
        remainingLots: weightsModified ? scrapLotIdAndQuantity(remainingLotsToSend) : [],
      });

      if (success) {
        data.lots.map((l) => update({ ...l, containerStatus: data.container.containerStatus }));
        notification(MCONTAINER.CREATED, NotificationType.Success, data.container);
        onClose();
      }
    } catch (e) {
      notification(e.message);
    }
  };

  return (
    <DialogContent>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleSubmit)}>
          <DialogHeader fontWeight={"bold"} fontSize={"lg"}>
            Finalize Container: {containerConfig.name}
            {formattedDate(values.creationDate)}
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
              <TextBoxField
                name="maxWeight"
                label="Max Weight of Container (KG)"
                type="number"
                mb={4}
              />
              <DateTimeInputField
                name="creationDate"
                label="Creation Date"
                format="dd-MM-yyyy"
                min={latestDate}
              />
            </Flex>

            {isSplitting && !restructureConfirmed && (
              <Box mb={4}>
                <Alert
                  status="error"
                  borderRadius="md"
                  size={"sm"}
                  borderStartWidth="3px"
                  borderStartColor="colorPalette.solid"
                  alignItems="center"
                >
                  {t("traceability:lot.container_create.creation_size_error")}
                </Alert>
              </Box>
            )}

            {restructureConfirmed && (
              <Box mb={4}>
                <Alert
                  status="success"
                  borderRadius="md"
                  size={"sm"}
                  borderStartWidth="3px"
                  borderStartColor="colorPalette.solid"
                  alignItems="center"
                >
                  {t("traceability:lot.container_create.restructuring_confirm_message")}{" "}
                  {updatedTotal} KG(s)
                </Alert>
              </Box>
            )}

            <Box mb={4}>
              <Text fontWeight="bold" fontSize="md" mb={2}>
                Current Container Lots
              </Text>
              <Table data={lots} columns={getColumns()} />
            </Box>

            {restructureConfirmed && remainingLots.length > 0 && (
              <Box mb={4} mt={4} pt={2} borderTop="1px solid" borderColor="gray.200">
                <Text fontWeight="bold" fontSize="md" mb={2}>
                  Remaining Weights (For Future Containers)
                </Text>
                <Table data={remainingLots} columns={remainingColumns} />

                <Box
                  mt={2}
                  p={2}
                  bg="blue.50"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="blue.200"
                >
                  <Text fontSize="sm">
                    {t("traceability:lot.container_create.remaining_quantity_warning")}
                  </Text>
                </Box>
              </Box>
            )}

            {weightsModified && !restructureConfirmed && (
              <Flex justifyContent="flex-end" mt={4} gap={2}>
                <Button
                  variant={"surface"}
                  colorPalette={"blue"}
                  size="sm"
                  onClick={handleConfirmRestructuring}
                  disabled={isSplitting && updatedTotal > Number(values.maxWeight)}
                >
                  Confirm Restructuring
                </Button>
              </Flex>
            )}

            <Flex justifyContent="flex-end" mt={4}>
              <Box>
                <Text fontWeight="bold">Total Weight:</Text>{" "}
                {weightsModified ? updatedTotal : containerConfig.quantity} KG(s)
                {weightsModified && !restructureConfirmed && isSplitting && (
                  <Text color={updatedTotal > Number(values.maxWeight) ? "red.500" : "green.500"}>
                    {updatedTotal > Number(values.maxWeight)
                      ? `(Exceeds max weight by ${updatedTotal - Number(values.maxWeight)} KG)`
                      : `(Within max capacity)`}
                  </Text>
                )}
              </Box>
            </Flex>

            <TextBoxField name="note" label="Note" mb={0} />
          </DialogBody>
          <DialogFooter>
            <Button mr={3} onClick={onClose} variant={"subtle"}>
              Close
            </Button>
            <SubmitButton
              leftIcon={<Check2Icon />}
              isDisabled={
                lots.length === 0 || !values.maxWeight || (isSplitting && !restructureConfirmed)
              }
            >
              Create Container
            </SubmitButton>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}
