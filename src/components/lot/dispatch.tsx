import { axLotDispatch } from "@services/lot.service";
import { local2utc, messageRedirect } from "@utils/basic.util";
import { Button } from "carbon-components-react";
import React from "react";
import DataTable from "react-data-table-component";

import { columnsDispatch } from "./lot.columns";

interface IProps {
  rows: [any];
  to: string;
  timeKey: string;
}

export default function CreateLot({ rows, to, timeKey }: IProps) {
  const handleFinalizeWetBatch = () => {
    axLotDispatch(to, {
      ids: rows.map(o => o.id),
      [timeKey]: local2utc().getTime(),
    }).then(response =>
      messageRedirect({
        ...response,
        mcode: `LOT_DISPATCHED_${to.toUpperCase()}`,
      })
    );
  };

  return (
    <>
      <div className="bx--row mb-2">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Finalize Dispatch Lot to {to}</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-2"
            disabled={rows.length <= 0}
            onClick={handleFinalizeWetBatch}
          >
            Confirm dispatch to {to}
          </Button>
        </div>
      </div>

      <DataTable
        keyField="id"
        columns={columnsDispatch}
        noHeader={true}
        data={rows}
      />
    </>
  );
}
