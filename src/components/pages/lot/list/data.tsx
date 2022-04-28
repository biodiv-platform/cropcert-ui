import { Badge, Button, ButtonProps } from "@chakra-ui/react";
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
  LOT_REPORT_GREEN,
} from "@static/events";
import { useStoreState } from "easy-peasy";
import React from "react";
import { emit } from "react-gbus";
import { Lot } from "types/traceability";

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

const LotFactoryActionCell = (lot: Lot) => {
  const { canWrite, colorScheme, show } = useActionProps(lot.factoryStatus, ROLES.UNION);
  const isDone = lot.factoryStatus === LOT_FLAGS.DONE;

  return show && (canWrite || isDone) ? (
    <Button
      {...buttonProps}
      colorScheme={colorScheme}
      onClick={() => emit(`${LOT_REPORT_FACTORY}_${lot.type}`, { lot, canWrite })}
    >
      {lot.factoryStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const GreenLabReportCell = (lot: Lot) => {
  const { canWrite, colorScheme, show } = useActionProps(lot.greenAnalysisStatus, ROLES.UNION);
  const isDone = lot.greenAnalysisStatus === LOT_FLAGS.DONE;

  return show && (canWrite || isDone) ? (
    <Button
      {...buttonProps}
      colorScheme={colorScheme}
      onClick={() => emit(LOT_REPORT_GREEN, { lot, canWrite })}
    >
      {lot.greenAnalysisStatus}
    </Button>
  ) : (
    <NotApplicable />
  );
};

const CuppingLabReportCell = (lot: Required<Lot>) => {
  const currentCupper = useStoreState((state) => state.user.email);
  const currentReport = lot.cuppings.find((r) => r.cupper === currentCupper);
  const withSkeletonReport = currentReport || {
    status:
      lot.greenAnalysisStatus === LOT_FLAGS.NOTAPPLICABLE ? LOT_FLAGS.NOTAPPLICABLE : LOT_FLAGS.ADD,
  };
  const { canWrite, colorScheme, show } = useActionProps(withSkeletonReport.status, ROLES.UNION);
  const atLeastOneDoneReport = lot.cuppings.find((o) => o.status === LOT_FLAGS.DONE);

  return show && (canWrite || atLeastOneDoneReport) ? (
    <Button
      {...buttonProps}
      colorScheme={canWrite ? colorScheme : "green"}
      onClick={() =>
        emit(LOT_REPORT_CUPPING, {
          lot,
          currentReport: canWrite ? currentReport : atLeastOneDoneReport,
          canWrite,
        })
      }
    >
      {canWrite ? withSkeletonReport.status : LOT_FLAGS.DONE}
    </Button>
  ) : (
    <NotApplicable />
  );
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
    cell: ({ lotStatus }) => <Badge>{lotStatus.split("_").join(" ")}</Badge>,
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
  {
    name: "Factory Report",
    selector: (row) => row.id,
    center: true,
    cell: LotFactoryActionCell,
  },
  {
    name: "Green Lab Report",
    selector: (row) => row.id,
    center: true,
    cell: GreenLabReportCell,
  },
  {
    name: "Cupping Lab Report",
    selector: (row) => row.id,
    center: true,
    cell: CuppingLabReportCell,
  },
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
