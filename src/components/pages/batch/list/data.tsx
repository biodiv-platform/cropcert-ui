import { Badge, Button } from "@chakra-ui/react";

import { BATCH_UPDATE } from "@static/events";
import { Batch } from "@interfaces/traceability";
import LotCell from "@components/@core/table/lot-cell";
import React from "react";
import { axGetColumns } from "@services/traceability.service";
import { emit } from "react-gbus";
import { is } from "immer/dist/internal";
import timeCell from "@components/@core/table/time-cell";

const VARIANT_MAPPING = {
  ADD: "blue",
  EDIT: "orange",
  DONE: "green",
  NOT_APPLICABLE: "gray",
};

export const createBatchColumns = (columns) => {
  try {
    if (!columns) return [];

    // sort columns by order
    columns.sort((col1, col2) => col1.modalIndex - col2.modalIndex);

    let isBtnActive = true;

    const printCurrRow = (row) => {
      return row;
    };

    const checkModalFieldExistForColumnName = (modalFieldCombined, currModalFieldId) => {
      isBtnActive = false;
      modalFieldCombined?.forEach((modalField) => {
        if (modalField.modalFieldId === currModalFieldId) {
          isBtnActive = true;
        }
      });

      return isBtnActive;
    };

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
        return [
          ...acc,
          {
            name: curr.columnName,
            selector: (row) => row[curr.columnName],
            center: true,
            maxWidth: "280px",
            cell: (row: Batch) => (
              <Button
                colorScheme={
                  checkModalFieldExistForColumnName(row.modalFieldCombined, curr.modalFieldId)
                    ? VARIANT_MAPPING[row.batchStatus as any]
                    : VARIANT_MAPPING["NOT_APPLICABLE"]
                }
                variant="outline"
                minWidth="50px"
                isDisabled={
                  !checkModalFieldExistForColumnName(row.modalFieldCombined, curr.modalFieldId)
                } //TODO: use this for button based on batch type implementation
                size="xs"
                onClick={
                  () =>
                    emit(BATCH_UPDATE, printCurrRow({ ...row, showModalById: curr.modalFieldId }))
                  /* TODO: update below
                    Explanation:
                    In this code snippet, we are emitting a BATCH_UPDATE event and passing a modified row as a parameter to the printCurrRow function. The modification involves adding a new property called showModalById, which is assigned the value of curr.modalFieldId. It should be noted that curr.modalFieldId represents the identifier of the modal field in the first row of the batch table in the user interface. Based on this assumption, we assume that all rows in the batch table with the same ccCode will have the same modalFieldId. However, it's important for future developers to review this assumption and ensure its validity.
                    */
                }
              >
                {isBtnActive ? row.batchStatus : "NA"}
              </Button>
            ),
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
        (row) => <LotCell {...row} type="b" />
      ),
      createBatchColumn(
        "Lot Status",
        (row) => row?.lotStatus,
        "100px",
        (row) => <Badge>{row?.lotStatus}</Badge>
      ),
    ];
  } catch (e) {
    console.log("error", e);
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
