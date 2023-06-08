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
  console.log("batch inside createBatchColumns --------------------", batch);
  if (batch) {
    const batchExtraColumns = batch.modalFieldCombined.reduce((acc, curr) => {
      const printCurrRow = (row) => {
        console.log("row inside printCurrRow: ", row);
        return row;
      };
      return [
        ...acc,
        {
          name: curr.columnName,
          selector: (row) => row[curr.columnName],
          center: true,
          maxWidth: "100px",
          cell: (row: Batch) =>
            row.type === BATCH_TYPE.WET ? (
              <Button
                colorScheme={VARIANT_MAPPING[row.batchStatus as any]}
                variant="outline"
                minWidth="50px"
                isDisabled={row.type === BATCH_TYPE.DRY}
                size="xs"
                onClick={() =>
                  emit(BATCH_UPDATE, printCurrRow({ ...row, showModalById: curr.modalFieldId }))
                }
              >
                {row.batchStatus}
                {/* //TODO: change it too milling status */}
              </Button>
            ) : (
              <NotApplicable />
            ),
        },
      ];
    }, []);

    console.log("batchExtraColumns: ", batchExtraColumns);

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
