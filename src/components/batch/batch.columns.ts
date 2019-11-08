import timeCell from "@components/@core/table/time-cell";
import tooltipCell from "@components/@core/table/tooltip-cell";

export const columnsDefault = [
  {
    name: "Batch Id",
    selector: "batchId",
  },
  {
    name: "Batch Name",
    selector: "batchName",
    cell: row => tooltipCell(row.batchName),
  },
  {
    name: "Notes",
    selector: "note",
    cell: row => tooltipCell(row.note),
  },
  {
    name: "Total Quantity",
    selector: "quantity",
  },
];

export const columnsWet = [
  ...columnsDefault,
  {
    name: "Start Time",
    selector: "startTime",
    cell: row => timeCell(row.startTime),
  },
  {
    name: "Fermentation Ended on",
    selector: "fermentationEndTime",
    cell: row => timeCell(row.fermentationEndTime),
  },
  {
    name: "Drying Ended on",
    selector: "dryingEndTime",
    cell: row => timeCell(row.dryingEndTime),
  },
  {
    name: "Perchment Quantity",
    selector: "perchmentQuantity",
  },
];

export const columnsDry = columnsDefault;

export const columnsWetExpand = [
  ...columnsDefault,
  {
    name: "Perchment Quantity",
    selector: "perchmentQuantity",
  },
];
