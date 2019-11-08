import tooltipCell from "@components/@core/table/tooltip-cell";
import react from "react";

import lotTableLink from "./lot-table-link";

export const columnsDispatch = [
  {
    name: "Lot Name",
    selector: "lotName",
    cell: row => lotTableLink(row.id, row.lotName),
  },
  {
    name: "Quantity",
    selector: "quantity",
  },
  {
    name: "Note",
    selector: "note",
    cell: row => tooltipCell(row.note),
  },
];
