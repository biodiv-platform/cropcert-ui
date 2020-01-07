import { Badge, Button } from "@chakra-ui/core";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { BATCH_TYPE } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import { emit } from "react-gbus";
import { Batch } from "types/traceability";

const VARIANT_MAPPING = {
  ADD: "blue",
  EDIT: "orange",
  DONE: "green"
};

export const batchColumns = [
  {
    name: "#",
    selector: "id",
    maxWidth: "100px",
    sortable: true
  },
  {
    name: "Name",
    selector: "batchName",
    width: "280px"
  },
  {
    name: "Type",
    selector: "type",
    maxWidth: "100px",
    sortable: true
  },
  {
    name: "Quantity",
    selector: "quantity",
    maxWidth: "100px",
    sortable: true
  },
  {
    name: "Last Updated",
    selector: "date",
    maxWidth: "150px",
    cell: row => timeCell(row.date),
    sortable: true
  },
  {
    name: "Batch Status",
    selector: "batchStatus",
    center: true,
    maxWidth: "100px",
    cell: (row: Batch) =>
      row.type === BATCH_TYPE.WET ? (
        <Button
          variantColor={VARIANT_MAPPING[row.batchStatus]}
          variant="outline"
          minWidth="50px"
          isDisabled={row.type === BATCH_TYPE.DRY}
          size="xs"
          onClick={() => emit(BATCH_UPDATE, row)}
        >
          {row.batchStatus}
        </Button>
      ) : (
        <NotApplicable />
      )
  },
  {
    name: "Perchment Quantity",
    selector: "perchmentQuantity",
    maxWidth: "100px",
    sortable: true
  },
  {
    name: "Lot",
    selector: "lotId",
    maxWidth: "100px",
    cell: LotCell
  },
  {
    name: "Lot Status",
    selector: "lotStatus",
    cell: row => <Badge>{row.lotStatus}</Badge>
  }
];

export const lotCreateModalCols = [
  {
    name: "Name",
    selector: "batchName",
    width: "280px"
  },
  {
    name: "Quantity",
    selector: "quantity",
    sortable: true,
    right: true
  }
];

export const lotCreateModalColsExtra = [
  {
    name: "Perchment Quantity",
    selector: "perchmentQuantity",
    sortable: true,
    right: true
  }
];
