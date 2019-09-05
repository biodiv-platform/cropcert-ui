import React from "react";

export default function ListColumns() {
  return [
    {
      name: "CC Code",
      selector: "code",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Village",
      selector: "village",
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      cell: row =>
        row.type
          .replace("B", "Both")
          .replace("D", "Dry")
          .replace("P", "Wet"),
    },
    /*{
      name: "Actions",
      selector: "ccCode",
      sortable: true,
      cell: row => (
        <Link to={`/collection-center/show?id=${row.ccCode}`}>View &rarr;</Link>
      ),
    },*/
  ];
}
