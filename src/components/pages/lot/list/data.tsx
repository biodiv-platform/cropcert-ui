import { Badge, Button, ButtonProps } from "@chakra-ui/react";
import { useActionProps } from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import useGlobalState from "@hooks/use-global-state";
import { Lot } from "@interfaces/traceability";
import { LOT_FLAGS, ROLES } from "@static/constants";
import {
  LOT_DISPATCH_FACTORY,
  LOT_FACTORY_PROCESS,
  LOT_GRN,
  LOT_REPORT_UPDATE,
} from "@static/events";
import React from "react";
import { emit } from "react-gbus";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs",
};

const CoActionCell = (lot: Lot) => {
  const { colorScheme, show } = useActionProps(lot.coopStatus, ROLES.COOPERATIVE);

  return show ? (
    <Button
      {...buttonProps}
      colorScheme={colorScheme}
      onClick={() => emit(LOT_DISPATCH_FACTORY, lot)}
    >
      {lot.coopStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const GRNActionCell = (lot: Lot) => {
  const { canWrite, colorScheme, show } = useActionProps(lot.grnStatus, ROLES.UNION);
  return show ? (
    <Button
      {...buttonProps}
      colorScheme={colorScheme}
      onClick={() => emit(LOT_GRN, { lot, canWrite })}
    >
      {lot.grnStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const MillingActionCell = (lot: Lot) => {
  const { canWrite, colorScheme, show } = useActionProps(lot.millingStatus, ROLES.COOPERATIVE);

  return show && (canWrite || lot.millingStatus === LOT_FLAGS.DONE) ? (
    <Button
      {...buttonProps}
      colorScheme={colorScheme}
      onClick={() => emit(LOT_FACTORY_PROCESS, { lot, canWrite })}
    >
      {lot.millingStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

export const createLotColumns = (lot2) => {
  const lot = {
    _id: "6485c79993e32a012a24d1f1",
    product: "645774053e1875e3bd793978",
    lotName: "Busalya_W_28-05-2023_1f1",
    type: "WET",
    coCode: 6,
    quantity: 6,
    createdOn: "2023-06-11T13:09:45.608Z",
    deleted: false,
    lotStatus: "AT_CO_OPERATIVE",
    modalFieldCombined: [
      {
        modalFieldId: "6457c8497b5610f0a0214fb7",
        isOptional: false,
        product: "645774053e1875e3bd793978",
        columnName: "GRN",
        fields: [
          {
            fieldType: "Title",
            value: "GRN details",
            width: "FULL",
          },
          {
            fieldType: "input",
            inputType: "Text",
            value: "",
            width: "FULL",
            label: "GRN Name",
            name: "GRN_Name",
          },
        ],
        isSaved: false,
        __v: 0,
        fieldsOf: "LOT",
        columnStatus: "ADD",
      },
      {
        modalFieldId: "64587f48c117cd33cd18ed9a",
        isOptional: false,
        product: "645774053e1875e3bd793978",
        columnName: "milling",
        fields: [
          {
            fieldType: "Title",
            value: "Milling details",
            width: "FULL",
          },
          {
            fieldType: "input",
            inputType: "Text",
            value: "",
            width: "FULL",
            label: "Add miiling details",
            name: "milling_details",
          },
          {
            fieldType: "input",
            inputType: "Text",
            value: "",
            width: "FULL",
            label: "Add corporative details",
            name: "corporative_details",
          },
        ],
        isSaved: false,
        __v: 0,
        fieldsOf: "LOT",
        columnStatus: "ADD",
      },
    ],
    lotId: "001",
    __v: 0,
  };

  if (lot) {
    const lotExtraColumns = lot.modalFieldCombined.reduce((acc, curr) => {
      const printCurrRow = (updatedLot, canWrite) => {
        console.log("updatedLot");
        console.log(updatedLot);

        console.log("canWrite");
        console.log(canWrite);
        return { updatedLot, canWrite };
      };

      const ButtonComponent = (row) => {
        const data = row.modalFieldCombined.find((o) => o.modalFieldId == curr.modalFieldId);

        const { canWrite, colorScheme, show } = useActionProps(data?.columnStatus, ROLES.UNION);
        const isDone = data?.columnStatus === LOT_FLAGS.DONE;

        const updatedLot = {
          ...row,
          currentColumnStatus: data?.columnStatus,
        };

        return show && (canWrite || isDone) ? (
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
          name: curr.columnName,
          selector: (row) => row[curr.columnName],
          center: true,
          maxWidth: "100px",
          cell: ButtonComponent,
        },
      ];
    }, []);

    console.log("lotExtraColumns");
    console.log(lotExtraColumns);
    return lotExtraColumns;
  }
};

export const lotColumns = [
  {
    name: "#",
    selector: (row) => row.id,
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
    width: "70px",
  },
  {
    name: "Lot Status",
    selector: (row) => row.lotStatus,
    center: true,
    sortable: true,
    width: "150px",
    cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
  },
  {
    center: true,
    name: "Cooperative",
    selector: (row) => row.id,
    cell: CoActionCell,
  },
  {
    name: "Milling",
    selector: (row) => row.id,
    center: true,
    cell: MillingActionCell,
  },
  {
    name: "GRN",
    selector: (row) => row.id,
    center: true,
    cell: GRNActionCell,
  },
  // {
  //   name: "Cupping Lab Report",
  //   selector: (row) => row.id,
  //   center: true,
  //   cell: CuppingLabReportCell,
  // },
];

export const batchColumns = [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
    cell: (row) => `B-${row.id}`,
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

export const batchColumnsWet = [
  {
    name: "Perchment Quantity",
    selector: (row) => row.perchmentQuantity,
    sortable: true,
  },
];
