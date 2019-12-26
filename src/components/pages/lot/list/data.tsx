import { Badge, Button, ButtonProps } from "@chakra-ui/core";
import { useActionProps } from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import NotApplicable from "@components/@core/table/not-applicable";
import { LOT_FLAGS, ROLES } from "@static/constants";
import {
  LOT_DISPATCH_FACTORY,
  LOT_FACTORY_PROCESS,
  LOT_GRN,
  LOT_REPORT_CUPPING,
  LOT_REPORT_FACTORY,
  LOT_REPORT_GREEN
} from "@static/events";
import { useStoreState } from "easy-peasy";
import React from "react";
import { emit } from "react-gbus";
import { Lot } from "types/traceability";

const buttonProps: Partial<ButtonProps> = {
  variant: "outline",
  minWidth: "50px",
  size: "xs"
};

const CoActionCell = (lot: Lot) => {
  const { canWrite, variantColor, show } = useActionProps(lot.coopStatus, ROLES.COOPERATIVE);
  return show ? (
    <Button
      {...buttonProps}
      variantColor={variantColor}
      onClick={() => emit(LOT_DISPATCH_FACTORY, lot)}
    >
      {lot.coopStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const GRNActionCell = (lot: Lot) => {
  const { canWrite, variantColor, show } = useActionProps(lot.grnStatus, ROLES.UNION);
  return show ? (
    <Button
      {...buttonProps}
      variantColor={variantColor}
      onClick={() => emit(LOT_GRN, { lot, canWrite })}
    >
      {lot.grnStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const MillingActionCell = (lot: Lot) => {
  const { canWrite, variantColor, show } = useActionProps(lot.millingStatus, ROLES.UNION);

  return show ? (
    <Button
      {...buttonProps}
      variantColor={variantColor}
      onClick={() => emit(LOT_FACTORY_PROCESS, { lot, canWrite })}
    >
      {lot.millingStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const LotFactoryActionCell = (lot: Lot) => {
  const { canWrite, variantColor, show } = useActionProps(lot.factoryStatus, ROLES.UNION);

  return show ? (
    <Button
      {...buttonProps}
      variantColor={variantColor}
      onClick={() => emit(`${LOT_REPORT_FACTORY}_${lot.type}`, { lot, canWrite })}
    >
      {lot.factoryStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const GreenLabReportCell = (lot: Lot) => {
  const { canWrite, variantColor, show } = useActionProps(lot.greenAnalysisStatus, ROLES.UNION);

  return show ? (
    <Button
      {...buttonProps}
      variantColor={variantColor}
      onClick={() => emit(LOT_REPORT_GREEN, { lot, canWrite })}
    >
      {lot.greenAnalysisStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const CuppingLabReportCell = (lot: Lot) => {
  const currentCupper = useStoreState(state => state.user.email);
  const currentReport = lot.cuppings.find(r => r.cupper === currentCupper);
  const withSkeletonReport = currentReport || {
    status:
      lot.greenAnalysisStatus === LOT_FLAGS.NOTAPPLICABLE ? LOT_FLAGS.NOTAPPLICABLE : LOT_FLAGS.ADD
  };
  const { canWrite, variantColor, show } = useActionProps(withSkeletonReport.status, ROLES.UNION);

  return show ? (
    <Button
      {...buttonProps}
      variantColor={variantColor}
      onClick={() => emit(LOT_REPORT_CUPPING, { lot, currentReport, canWrite })}
    >
      {withSkeletonReport.status}
    </Button>
  ) : (
    <NotApplicable />
  );
};

export const lotColumns = [
  {
    name: "#",
    selector: "id",
    sortable: true,
    width: "80px",
    cell: LotCell
  },
  {
    name: "Name",
    selector: "lotName",
    width: "250px"
  },
  {
    name: "Initial Quantity",
    selector: "quantity",
    center: true,
    sortable: true,
    width: "70px"
  },
  {
    name: "Lot Status",
    selector: "lotStatus",
    center: true,
    sortable: true,
    width: "160px",
    cell: ({ lotStatus }) => <Badge>{lotStatus.split("_").join(" ")}</Badge>
  },
  {
    center: true,
    name: "Cooperative",
    selector: "id",
    cell: CoActionCell
  },
  {
    name: "Milling",
    selector: "id",
    center: true,
    cell: MillingActionCell
  },
  {
    name: "GRN",
    selector: "id",
    center: true,
    cell: GRNActionCell
  },
  {
    name: "Factory Report",
    selector: "id",
    center: true,
    cell: LotFactoryActionCell
  },
  {
    name: "Green Lab Report",
    selector: "id",
    center: true,
    cell: GreenLabReportCell
  },
  {
    name: "Cupping Lab Report",
    selector: "id",
    center: true,
    cell: CuppingLabReportCell
  }
];

export const batchColumns = [
  {
    name: "#",
    selector: "id",
    sortable: true
  },
  {
    name: "Name",
    selector: "batchName"
  },
  {
    name: "Quantity",
    selector: "quantity",
    sortable: true
  }
];

export const batchColumnsWet = [
  {
    name: "Perchment Quantity",
    selector: "perchmentQuantity",
    sortable: true
  }
];
