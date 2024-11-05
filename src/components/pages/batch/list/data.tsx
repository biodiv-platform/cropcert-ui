import { Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import BatchCell from "@components/@core/table/batch-cell";
import FarmerCell from "@components/@core/table/farmer-cell";
import FarmerProduceCell from "@components/@core/table/farmer-produce-cell";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { Batch } from "@interfaces/traceability";
import { BATCH_FLAGS, ROLES } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import React from "react";
import { emit } from "react-gbus";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs",
};

// Helper function to create a column for the batch table
const createBatchColumn = (
  name: string,
  selector: (row: Batch) => any,
  maxWidth: string,
  cell?: (row: Batch) => JSX.Element,
  sortable = true
) => ({
  name,
  selector,
  center: true,
  maxWidth,
  cell,
  sortable,
});

const defaultBatchModalColumns = [
  createBatchColumn("#", (row) => <BatchCell {...row} />, "100px"), // You can add cell rendering function if needed
  createBatchColumn("Name", (row) => row.batchName, "280px"),
  createBatchColumn("Type", (row) => row.type?.toUpperCase(), "100px"),
  createBatchColumn("Quantity", (row) => row.quantity, "100px"),
  createBatchColumn(
    "Last Updated",
    (row) => row.lastUpdatedAt,
    "150px",
    (row) => timeCell(row.lastUpdatedAt)
  ),
];

const batchModalColumnsWithLotInfo = [
  createBatchColumn(
    "Lot ID",
    (row) => row.lotId,
    "100px",
    (row) => <LotCell {...row} />
  ),
];

export const createBatchColumns = (columns) => {
  try {
    if (!columns) return [];

    // Sort columns by order
    columns.sort((col1, col2) => col1.modalIndex - col2.modalIndex);

    const batchModalColumns = columns.reduce((acc, curr) => {
      const batchUpdateWrapper = (batch, canWrite) => {
        return { batch, canWrite };
      };

      const ButtonComponent = (row) => {
        const data = row.modalFieldCombined.find((o) => o.modalFieldId == curr.modalFieldId);

        const { canWrite, colorScheme, show } = useActionProps(data?.columnStatus, ROLES.UNION);
        const isDone = data?.columnStatus === BATCH_FLAGS.DONE;
        const isOptional = data?.isOptional;

        const updatedBatch = {
          ...row,
          currentColumnStatus: data?.columnStatus,
          showModalById: data?.modalFieldId,
        };

        const renderButton = show && (canWrite || isDone);

        return (isOptional && renderButton) || renderButton ? (
          <Button
            {...buttonProps}
            colorScheme={colorScheme}
            onClick={() => emit(BATCH_UPDATE, batchUpdateWrapper(updatedBatch, canWrite))}
          >
            {data?.columnStatus}
          </Button>
        ) : (
          <NotApplicable />
        );
      };

      return [
        ...acc,
        createBatchColumn(curr.columnName, (row) => row[curr.columnName], "180px", ButtonComponent),
      ];
    }, []);

    return [...defaultBatchModalColumns, ...batchModalColumns, ...batchModalColumnsWithLotInfo];
  } catch (e) {
    console.error("error", e);

    // returning default value
    return [defaultBatchModalColumns, batchModalColumnsWithLotInfo];
  }
};

export const lotCreateModalCols = [
  {
    name: "Name",
    selector: (row) => row["batchName"],
    width: "280px",
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    sortable: true,
    right: true,
  },
];

export const lotCreateModalColsExtra = [
  {
    name: "Perchment Quantity",
    selector: (row) => row["perchmentQuantity"],
    sortable: true,
    right: true,
  },
];
