import { Badge, Button } from "@chakra-ui/react";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { BATCH_TYPE } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import React from "react";
import { emit } from "react-gbus";
import { Batch } from "types/traceability";

const VARIANT_MAPPING = {
  ADD: "blue",
  EDIT: "orange",
  DONE: "green",
};

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["id"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => `B-${row.id}`,
  },
  {
    name: "Name",
    selector: (row) => row["batchName"],
    width: "280px",
  },
  {
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
    selector: (row) => row["date"],
    maxWidth: "150px",
    cell: (row) => timeCell(row.date),
    sortable: true,
  },
  {
    name: "Batch Status",
    selector: (row) => row["batchStatus"],
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
          onClick={() => emit(BATCH_UPDATE, row)}
        >
          {row.batchStatus}
        </Button>
      ) : (
        <NotApplicable />
      ),
  },
  {
    name: "Perchment Quantity",
    selector: (row) => row["perchmentQuantity"],
    maxWidth: "100px",
    sortable: true,
  },
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
