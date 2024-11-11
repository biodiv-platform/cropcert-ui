import FarmerCell from "@components/@core/table/farmer-cell";
import FarmerProduceCell from "@components/@core/table/farmer-produce-cell";
import React from "react";

export const farmerProduceColumns = [
  {
    name: "#",
    selector: (row) => row["farmerProduceId"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => <FarmerProduceCell {...row} />,
  },
  {
    name: "Name",
    selector: (row) => row["farmerName"],
    maxWidth: "210px",
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
    name: "GRN Number",
    selector: (row) => row["calculateGrn"],
    maxWidth: "120px",
    sortable: true,
  },
  {
    name: "Amount Paid",
    selector: (row) => row["amountPaidCalculate"],
    maxWidth: "120px",
    sortable: true,
    right: true,
  },
  {
    name: "Milling Charge",
    selector: (row) => row["millingCharge"],
    maxWidth: "100px",
    sortable: true,
    right: true,
  },
  {
    name: "Farmer ID",
    selector: (row) => row["farmerId"],
    maxWidth: "120px",
    sortable: true,
    cell: (row) => <FarmerCell {...{ farmerId: row.farmerId, _id: row.farmerEID }} />,
  },
  {
    name: "Date of Collection",
    selector: (row) => new Date(row.dateOfCollection).toLocaleString(),
    sortable: true,
  },
];

export const batchCreateModalCols = [
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
