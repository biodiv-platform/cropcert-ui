import { Badge, Button } from "@chakra-ui/react";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { Batch } from "@interfaces/traceability";
import { Data } from "@react-google-maps/api";
import { BATCH_TYPE } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import React from "react";
import { emit } from "react-gbus";

const VARIANT_MAPPING = {
  ADD: "blue",
  EDIT: "orange",
  DONE: "green",
};

export const createBatchColumns = (batch: Batch) => {
  if (batch) {
    const batchExtraColumns = batch.modalFieldCombined.reduce((acc, curr) => {
      const printCurrRow = (row) => {
        return row;
      };
      return [
        ...acc,
        {
          name: curr.columnName,
          selector: (row) => row[curr.columnName],
          center: true,
          maxWidth: "100px",
          cell: (row: Batch) => (
            <Button
              colorScheme={VARIANT_MAPPING[row.batchStatus as any]}
              variant="outline"
              minWidth="50px"
              // isDisabled={row.type === BATCH_TYPE.DRY} //TODO: use this for button based on batch type implementation
              size="xs"
              onClick={
                () => emit(BATCH_UPDATE, printCurrRow({ ...row, showModalById: curr.modalFieldId }))
                /*
                Explanation:
                In this code snippet, we are emitting a BATCH_UPDATE event and passing a modified row as a parameter to the printCurrRow function. The modification involves adding a new property called showModalById, which is assigned the value of curr.modalFieldId. It should be noted that curr.modalFieldId represents the identifier of the modal field in the first row of the batch table in the user interface. Based on this assumption, we assume that all rows in the batch table with the same ccCode will have the same modalFieldId. However, it's important for future developers to review this assumption and ensure its validity.
                */
              }
            >
              {row.batchStatus}
              {/* //TODO: change it too milling status */}
            </Button>
          ),
        },
      ];
    }, []);

    const batchColumns = [
      {
        name: "#",
        selector: (row) => row["_id"],
        maxWidth: "100px",
        sortable: true,
        cell: (row) => `B-${row._id.slice(-3)}`,
      },
      {
        name: "Name",
        selector: (row) => row["batchName"],
        width: "280px",
      },
      {
        //TODO: do we need this?
        name: "Type",
        selector: (row) => row["type"],
        maxWidth: "100px",
        sortable: true,
      },
      {
        name: "Quantity",
        selector: (row) => row["quantity"],
        maxWidth: "100px",
        sortable: true,
      },
      {
        name: "Last Updated",
        selector: (row) => row["lastUpdatedOn"],
        maxWidth: "150px",
        minWidth: "115px",
        cell: (row) => timeCell(row.lastUpdatedOn),
        sortable: true,
      },
      ...batchExtraColumns,
      {
        name: "Lot",
        selector: (row) => row["lotId"],
        maxWidth: "100px",
        cell: (row) => <LotCell {...row} type="b" />,
      },
      {
        name: "Lot Status",
        selector: (row) => row["lotStatus"],
        cell: (row) => <Badge>{row.lotStatus}</Badge>,
      },
    ];

    return batchColumns;
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
