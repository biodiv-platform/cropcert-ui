import { Badge, Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import BatchCell from "@components/@core/table/batch-cell";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
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
        },
      ];
    }, []);

    return [...lotModalFieldColumns, ...lotExtraColumns];
  } catch (e) {
    console.error("error", e);
    // returning default value
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
  },
  {
    name: "Name",
    selector: (row) => row.lotName,
    width: "220px",
  },
  {
    name: "Initial Quantity",
    selector: (row) => row.quantity,
    center: true,
    sortable: true,
    maxWidth: "140px",
  },
  {
    name: "Lot Status",
    selector: (row) => row.lotStatus,
    center: true,
    sortable: true,
    width: "150px",
    cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
  },
];

const lotExtraColumns = [
  {
    name: "Last Updated",
    selector: (row) => new Date(row.lastUpdatedAt).toLocaleString(),
    maxWidth: "210px",
    sortable: true,
  },
];

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row.batchId,
    sortable: true,
    cell: (row) => <BatchCell {...row} />,
  },
  {
    name: "Name",
    selector: (row) => row.batchName,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    sortable: true,
  },
];

export const batchColumnsWet = [];
