import FarmerCell from "@components/@core/table/farmer-cell";
import React from "react";

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["farmerProduceId"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => `FP-${row.farmerProduceId}`,
  },
  {
    name: "Farmer Name",
    selector: (row) => row["farmerName"],
    maxWidth: "280px",
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    maxWidth: "100px",
    sortable: true,
    right: true,
  },
  {
    name: "Type",
    selector: (row) => row["produceType"]?.toUpperCase(),
    maxWidth: "70px",
    sortable: true,
  },
  {
    name: "Collection Date",
    selector: (row) => new Date(row.dateOfCollection).toLocaleString(),
    maxWidth: "150px",
    sortable: true,
  },
  {
    name: "GRN Number",
    selector: (row) => row["calculateGrn"],
    maxWidth: "150px",
    sortable: true,
  },
  {
    name: "Farmer ID",
    selector: (row) => row["farmerId"],
    maxWidth: "120px",
    sortable: true,
    cell: (row) => <FarmerCell {...{ farmerId: row.farmerId, _id: row.farmerEID }} />,
  },
  {
    name: "Last Updated",
    selector: (row) => new Date(row.lastUpdatedAt).toLocaleString(),
    width: "210px",
    sortable: true,
  },
];

export const lotCreateModalCols = [
  {
    name: "#",
    selector: (row) => row["farmerProduceId"],
    width: "100px",
    cell: (row) => `FP-${row.farmerProduceId}`,
  },
  {
    name: "Name",
    selector: (row) => row["farmerName"],
    width: "200px",
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
