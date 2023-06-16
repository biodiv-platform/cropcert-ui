import { Badge, Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import { LOT_FLAGS, ROLES } from "@static/constants";
import { LOT_REPORT_UPDATE } from "@static/events";
import React from "react";
import { emit } from "react-gbus";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs",
};

export const createLotColumns = (lot) => {
  if (lot) {
    const lotExtraColumns = lot.modalFieldCombined.reduce((acc, curr) => {
      const printCurrRow = (lot, canWrite) => {
        return { lot, canWrite };
      };

      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
          maxWidth: "100px",
          cell: ButtonComponent,
        },
      ];
    }, []);

    return lotExtraColumns;
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

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row.batchId,
    sortable: true,
    cell: (row) => `B-${row.batchId}`,
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
