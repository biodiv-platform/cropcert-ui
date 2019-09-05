import react from "react";

import lotTableLink from "./lot-table-link";

export const columnsDispatch = [
  {
    name: "Lot Id",
    selector: "id",
    cell: row => lotTableLink(row.id),
  },
  {
    name: "Lot Name",
    selector: "lotName",
  },
  {
    name: "Quantity",
    selector: "quantity",
  },
  {
    name: "Type",
    selector: "type",
  },
];
