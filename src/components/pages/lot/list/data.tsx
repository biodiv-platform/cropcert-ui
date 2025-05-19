import { Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import BatchCell from "@components/@core/table/batch-cell";
import CoopCell from "@components/@core/table/coop-cell";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { LOT_FLAGS, ROLES } from "@static/constants";
import { LOT_REPORT_UPDATE } from "@static/events";
import { capitalizeFirstLetter } from "@utils/basic";
import React from "react";
import { emit } from "react-gbus";

import { axGetColumns } from "@/services/traceability.service";

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
      const printCurrRow = (lot, canWrite, isDone) => {
        return { lot, canWrite, isDone };
      };

      const ButtonComponent = (row) => {
        const data = row.modalFieldCombined.find((o) => o.modalFieldId == curr.modalFieldId);

        const { canWrite, colorPalette, show } = useActionProps(data?.columnStatus, ROLES.UNION);
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
            colorPalette={colorPalette}
            onClick={() => emit(LOT_REPORT_UPDATE, printCurrRow(updatedLot, canWrite, isDone))}
          >
            {data?.columnStatus}
          </Button>
        ) : (
          <NotApplicable />
        );
      };

      const optionalColumnName = curr.isOptional
        ? curr.columnName + " (Optional)"
        : curr.columnName;

      return [
        ...acc,
        {
          name: capitalizeFirstLetter(optionalColumnName),
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
    width: "200px",
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
    name: "Quantity",
    selector: (row) => row.quantity,
    right: true,
    sortable: true,
    maxWidth: "110px",
    showDefault: true,
  },
  {
    name: "Type",
    selector: (row) => row.type?.toUpperCase(),
    sortable: true,
    maxWidth: "480px",
    showDefault: true,
    center: true,
  },
  {
    name: "Cooperative",
    selector: (row) => row.coCode,
    maxWidth: "200px",
    showDefault: true,
    cell: (row) => <CoopCell coCode={row.coCode} />,
  },
];

const lotExtraColumns = [
  {
    name: "Record Created",
    selector: (row) => new Date(row.createdAt).toLocaleString(),
    maxWidth: "210px",
    sortable: true,
    showDefault: true,
  },
  {
    name: "Record Updated",
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
    width: "110px",
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

export const containerCreateModalCols = [
  {
    name: "Name",
    selector: (row) => row["lotName"],
    width: "380px",
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    sortable: true,
    right: true,
  },
];

export async function fetchLotColumns(): Promise<any[]> {
  try {
    const response = await axGetColumns("LOT");
    return response.data.length > 0 ? [...lotColumns, ...createLotColumns(response.data)] : [];
  } catch (error) {
    console.error("Error fetching batch columns:", error);
    throw error;
  }
}
