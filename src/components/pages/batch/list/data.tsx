import { Badge, Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { Batch } from "@interfaces/traceability";
import { BATCH_FLAGS, ROLES } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import { is } from "immer/dist/internal";
import React from "react";
import { emit } from "react-gbus";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs",
};

export const createBatchColumns = (columns) => {
  try {
    if (!columns) return [];

    // sort columns by order
    columns.sort((col1, col2) => col1.modalIndex - col2.modalIndex);

    // helper function to create a column for the batch table
    const createBatchColumn = (
      name: string,
      selector: (row: Batch) => any,
      maxWidth: string,
      cell?: (row: Batch) => JSX.Element
    ) => ({
      name,
      selector,
      center: true,
      maxWidth,
      cell,
    });

    const batchModalColumns = columns.reduce(
      (acc, curr) => {
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
          {
            name: curr.columnName,
            selector: (row) => row[curr.columnName],
            center: true,
            maxWidth: "280px",
            cell: ButtonComponent,
          },
        ];
      },

      []
    );

    return [
      createBatchColumn("#", (row) => `B-${row.batchId}`, "100px", undefined), // You can add cell rendering function if needed
      createBatchColumn("Name", (row) => row.batchName, "280px"),
      createBatchColumn("Type", (row) => row.type, "100px", undefined),
      createBatchColumn("Quantity", (row) => row.quantity, "100px", undefined),
      createBatchColumn(
        "Last Updated",
        (row) => row.lastUpdatedOn,
        "150px",
        (row) => timeCell(row.lastUpdatedOn)
      ),
      ...batchModalColumns,
      createBatchColumn(
        "Lot",
        (row) => row.lotId,
        "100px",
        (row) => <LotCell {...row} />
      ),
      createBatchColumn(
        "Lot Status",
        (row) => row?.lotStatus,
        "100px",
        (row) => <Badge>{row?.lotStatus}</Badge>
      ),
    ];
  } catch (e) {
    console.error("error", e);
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
