import { Badge, Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import ContainerCell from "@components/@core/table/container-cell";
import CoopCell from "@components/@core/table/coop-cell";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import timeCell from "@components/@core/table/time-cell";
import { CONTAINER_FLAGS, ROLES } from "@static/constants";
import { CONTAINER_REPORT_UPDATE } from "@static/events";
import { capitalizeFirstLetter } from "@utils/basic";
import React from "react";
import { emit } from "react-gbus";

import BatchCell from "@/components/@core/table/batch-cell";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs",
};

export const createContainerColumns = (columns) => {
  try {
    if (!columns) return [];

    columns.sort((col1, col2) => col1.modalIndex - col2.modalIndex);

    const containerModalFieldColumns = columns.reduce((acc, curr) => {
      const printCurrRow = (container, canWrite) => {
        return { container, canWrite };
      };

      const ButtonComponent = (row) => {
        const data = row.modalFieldCombined.find((o) => o.modalFieldId == curr.modalFieldId);

        const { canWrite, colorPalette, show } = useActionProps(data?.columnStatus, ROLES.UNION);
        const isDone = data?.columnStatus === CONTAINER_FLAGS.DONE;
        const isOptional = data?.isOptional;

        const updatedContainer = {
          ...row,
          currentColumnStatus: data?.columnStatus,
          showModalById: data?.modalFieldId,
        };

        const renderButton = show && (canWrite || isDone);

        return (isOptional && renderButton) || renderButton ? (
          <Button
            {...buttonProps}
            colorPalette={colorPalette}
            onClick={() => emit(CONTAINER_REPORT_UPDATE, printCurrRow(updatedContainer, canWrite))}
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
          showDefault: true,
        },
      ];
    }, []);

    return [...containerModalFieldColumns, ...containerExtraColumns];
  } catch (e) {
    console.error("error", e);
    return [];
  }
};

export const containerColumns = [
  {
    name: "#",
    selector: (row) => row.containerId,
    sortable: true,
    width: "80px",
    cell: (row) => <ContainerCell {...row} />,
    showDefault: true,
  },
  {
    name: "Name",
    selector: (row) => row.containerName,
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
    center: true,
    sortable: true,
    maxWidth: "150px",
    showDefault: true,
  },
  {
    name: "Cooperative",
    selector: (row) => row.coCode,
    maxWidth: "250px",
    showDefault: true,
    cell: (row) => <CoopCell coCode={row.coCode} />,
  },
  {
    name: "Container Status",
    selector: (row) => row.containerStatus,
    center: true,
    sortable: true,
    width: "150px",
    cell: ({ containerStatus }) => <Badge>{containerStatus?.split("_").join(" ")}</Badge>,
    showDefault: false,
  },
  {
    name: "Amount Paid",
    selector: (row) => row.amountPaidCalculate,
    maxWidth: "170px",
    sortable: true,
    right: true,
    showDefault: true,
    cell: (row) => row.amountPaidCalculate || "N/A",
  },
];

const containerExtraColumns = [
  {
    name: "Record Created",
    selector: (row) => new Date(row.createdAt).toLocaleString(),
    maxWidth: "210px",
    sortable: true,
    sortFunction: (rowA, rowB) =>
      new Date(rowA.createdAt).getTime() - new Date(rowB.createdAt).getTime(),
    showDefault: true,
  },
  {
    name: "Record Updated",
    selector: (row) => new Date(row.lastUpdatedAt).toLocaleString(),
    maxWidth: "210px",
    sortable: true,
    sortFunction: (rowA, rowB) =>
      new Date(rowA.lastUpdatedAt).getTime() - new Date(rowB.lastUpdatedAt).getTime(),
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

export const lotColumns = [
  {
    name: "#",
    selector: (row) => row.lotId,
    sortable: true,
    width: "80px",
    cell: (row) => <LotCell {...row} />,
  },
  {
    name: "Lot Name",
    selector: (row) => row.lotName,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type?.toUpperCase(),
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    right: true,
    width: "110px",
    sortable: true,
  },
  {
    name: "Last Updated",
    selector: (row) => row.lastUpdatedAt,
    cell: (row) => timeCell(row.lastUpdatedAt),
    sortable: true,
    sortFunction: (rowA, rowB) =>
      new Date(rowA.lastUpdatedAt).getTime() - new Date(rowB.lastUpdatedAt).getTime(),
    maxWidth: "180px",
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
    maxWidth: "110px",
    sortable: true,
    right: true,
  },
  {
    name: "Last Updated",
    selector: (row) => row.lastUpdatedAt,
    maxWidth: "180px",
    cell: (row) => timeCell(row.lastUpdatedAt),
    sortable: true,
    sortFunction: (rowA, rowB) =>
      new Date(rowA.lastUpdatedAt).getTime() - new Date(rowB.lastUpdatedAt).getTime(),
  },
];
