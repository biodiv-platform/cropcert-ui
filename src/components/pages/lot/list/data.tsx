import { Badge, Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import BatchCell from "@components/@core/table/batch-cell";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { LOT_FLAGS, ROLES } from "@static/constants";
import { LOT_REPORT_UPDATE } from "@static/events";
import { capitalizeFirstLetter } from "@utils/basic";
import React from "react";
import { emit } from "react-gbus";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs",
};

export const createLotColumns = (columns) => {
  try {
    if (!columns) return [];

    columns.sort((col1, col2) => col1.modalIndex - col2.modalIndex);

    const lotModalFieldColumns = columns.reduce((acc, curr) => {
      const printCurrRow = (lot, canWrite) => {
        return { lot, canWrite };
      };

      const ButtonComponent = (row) => {
        const data = row.modalFieldCombined.find((o) => o.modalFieldId == curr.modalFieldId);

        const { canWrite, colorScheme, show } = useActionProps(data?.columnStatus, ROLES.UNION);
        const isDone = data?.columnStatus === LOT_FLAGS.DONE;
        const isOptional = data?.isOptional;

        const updatedLot = {
          ...row,
          currentColumnStatus: data?.columnStatus,
          showModalById: data?.modalFieldId,
        };

        const renderButton = show && (canWrite || isDone);

        return (isOptional && renderButton) || renderButton ? (
          <Button
            {...buttonProps}
            colorScheme={colorScheme}
            onClick={() => emit(LOT_REPORT_UPDATE, printCurrRow(updatedLot, canWrite))}
          >
            {data?.columnStatus}
          </Button>
        ) : (
          <NotApplicable />
        );
      };

      return [
        ...acc,
        {
          name: capitalizeFirstLetter(curr.columnName),
          selector: (row) => row[curr.columnName],
          center: true,
          maxWidth: "130px",
          cell: ButtonComponent,
          showDefault: true, // revisit this later
        },
      ];
    }, []);

    return [...lotModalFieldColumns, ...lotExtraColumns];
  } catch (e) {
    console.error("error", e);
    return [];
  }
};

export const lotColumns = [
  {
    name: "#",
    selector: (row) => row.lotId,
    sortable: true,
    width: "80px",
    cell: (row) => <LotCell {...row} type="l" />,
    showDefault: true,
  },
  {
    name: "Name",
    selector: (row) => row.lotName,
    width: "210px",
    sortable: true,
    showDefault: true,
  },
  {
    name: "Initial Quantity",
    selector: (row) => row.quantity,
    center: true,
    sortable: true,
    maxWidth: "140px",
    showDefault: true,
  },
  {
    name: "Lot Status",
    selector: (row) => row.lotStatus,
    center: true,
    sortable: true,
    width: "150px",
    cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
    showDefault: true,
  },
];

const lotExtraColumns = [
  {
    name: "Last Updated",
    selector: (row) => new Date(row.lastUpdatedAt).toLocaleString(),
    maxWidth: "210px",
    sortable: true,
    showDefault: true,
  },
  {
    name: "Note",
    selector: (row) => row.note,
    maxWidth: "200px",
    sortable: false,
    showDefault: false,
  },
];

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row.batchId,
    maxWidth: "150px",
    sortable: true,
    cell: (row) => <BatchCell {...row} />,
  },
  {
    name: "Batch Name",
    selector: (row) => row.batchName,
    maxWidth: "250px",
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type?.toUpperCase(),
    maxWidth: "150px",
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    maxWidth: "150px",
    sortable: true,
    right: true,
  },
  {
    name: "Last Updated",
    selector: (row) => row.lastUpdatedAt,
    maxWidth: "180px",
    cell: (row) => timeCell(row.lastUpdatedAt),
  },
];

export const batchColumnsWet = [];
