import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import React from "react";

import FarmerShowPanel from "./panel";

export default function FarmerInfo({ farmer }) {
  const basicInfoHeader = [
    {
      name: "#",
      selector: (row) => row["farmerId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `${row.farmerId}`,
    },
    {
      name: "Name",
      selector: (row) => row["personalDetails"]["farmer_name"],
      width: "280px",
    },
    {
      name: "Village",
      selector: (row) => row["personalDetails"]["village"],
      maxWidth: "260px",
      sortable: true,
    },
    {
      name: "Collection Center",
      selector: (row) => row["personalDetails"]["cc"],
      maxWidth: "250px",
      sortable: true,
    },
    {
      name: "No. of Coffee Trees",
      selector: (row) => row["farmDetails"]["no_of_coffee_trees"],
      maxWidth: "210px",
      sortable: true,
      right: true,
    },
    {
      name: "Land Acreage",
      selector: (row) => row["farmDetails"]["land_acreage"],
      maxWidth: "210px",
      sortable: true,
      right: true,
    },
    {
      name: "createdAt",
      selector: (row) => row["createdAt"],
      cell: (row) => timeCell(row.createdOn),
    },
  ];

  return (
    <FarmerShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <DataTable keyField="_id" columns={basicInfoHeader} noHeader={true} data={[farmer]} />
    </FarmerShowPanel>
  );
}
