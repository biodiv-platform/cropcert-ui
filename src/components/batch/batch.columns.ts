import timeCell from "@components/@core/table/time-cell";

export const columnsWet = [
  {
    name: "Batch Id",
    selector: "batchId",
  },
  {
    name: "Batch Name",
    selector: "batchName",
  },
  {
    name: "Total Quantity",
    selector: "quantity",
  },
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

export const columnsDry = [
  {
    name: "Batch Id",
    selector: "batchId",
  },
  {
    name: "Batch Name",
    selector: "batchName",
  },
  {
    name: "Total Quantity",
    selector: "quantity",
  },
];
