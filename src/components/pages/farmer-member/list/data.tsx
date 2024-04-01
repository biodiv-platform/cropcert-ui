import FarmerCell from "@components/@core/table/farmer-cell";
import React from "react";

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["farmerId"],
    maxWidth: "150px",
    sortable: true,
    cell: (row) => <FarmerCell {...row} type="l" />,
  },
  {
    name: "Name",
    selector: (row) => row["farmerName"],
    width: "280px",
    sortable: true,
  },
  {
    name: "Village",
    selector: (row) => row["village"],
    maxWidth: "260px",
    sortable: true,
  },
  {
    name: "Collection Center",
    selector: (row) => row["cc"],
    maxWidth: "250px",
    sortable: true,
  },
  {
    name: "No. of Coffee Trees",
    selector: (row) => row["noOfCoffeeTrees"],
    maxWidth: "210px",
    sortable: true,
    right: true,
  },
  {
    name: "Land Acreage",
    selector: (row) => row["landAcreage"],
    maxWidth: "210px",
    sortable: true,
    right: true,
  },
];
