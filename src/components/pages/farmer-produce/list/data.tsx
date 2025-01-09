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
    showDefault: true,
  },
  {
    name: "Name",
    selector: (row) => row["farmerName"],
    maxWidth: "210px",
    showDefault: true,
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    maxWidth: "100px",
    sortable: true,
    right: true,
    showDefault: true,
  },
  {
    name: "Type",
    selector: (row) => row["produceType"]?.toUpperCase(),
    maxWidth: "70px",
    sortable: true,
    showDefault: true,
  },
  {
    name: "GRN Number",
    selector: (row) => row["calculateGrn"],
    maxWidth: "120px",
    sortable: true,
    showDefault: true,
  },
  {
    name: "Amount Paid",
    selector: (row) => row["amountPaidCalculate"],
    maxWidth: "120px",
    sortable: true,
    right: true,
    showDefault: true,
  },
  {
    name: "Milling Charge",
    selector: (row) => row["millingCharge"],
    maxWidth: "100px",
    sortable: true,
    right: true,
    showDefault: true,
  },
  {
    name: "Price Per Kg",
    selector: (row) => row["row.pricePerKg"],
    maxWidth: "120px",
    sortable: true,
    right: true,
  },
  {
    name: "Farmer ID",
    selector: (row) => row["farmerId"],
    maxWidth: "120px",
    sortable: true,
    cell: (row) => <FarmerCell {...{ farmerId: row.farmerId, _id: row.farmerEID }} />,
    showDefault: true,
  },
  {
    name: "Date of Collection",
    selector: (row) => new Date(row.dateOfCollection).toLocaleString(),
    sortable: true,
  },
  {
    name: "Contact Number",
    selector: (row) => row["contactNo"],
    maxWidth: "150px",
    sortable: true,
    showDefault: false,
  },
  {
    name: "No Of Bags",
    selector: (row) => row["noOfBags"],
    maxWidth: "120px",
    sortable: true,
    showDefault: false,
  },
  {
    name: "Deduction",
    selector: (row) => row["deduction"],
    maxWidth: "120px",
    sortable: true,
    showDefault: false,
  },
  {
    name: "Deduction Reason",
    selector: (row) => row["deductionReason"],
    maxWidth: "150px",
    sortable: true,
    showDefault: false,
  },
  {
    name: "Net Collection",
    selector: (row) => row["netCollection"],
    maxWidth: "120px",
    sortable: true,
    showDefault: false,
  },
  {
    name: "Collector Name",
    selector: (row) => row["collectorName"],
    maxWidth: "150px",
    sortable: true,
    showDefault: false,
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
