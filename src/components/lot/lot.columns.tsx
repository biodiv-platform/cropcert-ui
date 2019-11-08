import tooltipCell from "@components/@core/table/tooltip-cell";
import react from "react";

import lotTableLink from "./lot-table-link";

export const columnsDispatch = [
  {
    name: "Lot Name",
    selector: "lotName",
    cell: row => tooltipCell(row.lotName),
  },
  {
    name: "Quantity",
    selector: "quantity",
  },
  {
    name: "Notes",
    selector: "note",
    cell: row => tooltipCell(row.note),
  },
  {
    name: "Type",
    selector: "type",
  },
  {
    name: "Lot Id",
    selector: "id",
    cell: row => lotTableLink(row.id),
  },
];
