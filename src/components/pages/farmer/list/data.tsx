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

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["farmerId"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => `MIT-${row.farmerId}`,
  },
  {
    name: "Name",
    selector: (row) => row["farmerName"],
    width: "280px",
  },
  // {
  //   //TODO: do we need this?
  //   name: "Type",
  //   selector: (row) => row["type"],
  //   maxWidth: "100px",
  //   sortable: true,
  // },
  {
    name: "Region",
    selector: (row) => row["region"],
    maxWidth: "150px",
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    maxWidth: "100px",
    sortable: true,
  },
  {
    name: "Collection Center",
    selector: (row) => row["collectionCenter"],
    maxWidth: "250px",
    sortable: true,
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
