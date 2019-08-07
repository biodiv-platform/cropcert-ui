import { columnsDry, columnsWet } from "@components/batch/batch.columns";
import { axCreateLotFromBatches } from "@services/lot.service";
import { getTodayDisplay, local2utc, messageRedirect } from "@utils/basic.util";
import { BATCH_TYPE } from "@utils/constants";
import { Button } from "carbon-components-react";
import React from "react";
import DataTable from "react-data-table-component-tmp";

interface IProps {
  batches: [any];
  lotName: string;
  type: string;
  coCode: number;
}

export default function CreateLot({ batches, type, lotName, coCode }: IProps) {
  const qty = batches.reduce((acc, { quantity }) => acc + quantity, 0);

  const handleFinalizeWetBatch = () => {
    axCreateLotFromBatches({
      batchIds: batches.map(o => o.batchId),
      createdOn: local2utc(),
      timeToFactory: local2utc(),
      quantity: qty,
      coCode,
      type,
      lotName,
    }).then(response => messageRedirect({ ...response, mcode: "LOT_CREATED" }));
  };

  return (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Finalize Lot</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-2"
            disabled={batches.length <= 0}
            onClick={handleFinalizeWetBatch}
          >
            Create Lot
          </Button>
        </div>
      </div>

      <h2>Batches</h2>
      <DataTable
        keyField="batchId"
        columns={type === BATCH_TYPE.DRY ? columnsDry : columnsWet}
        noHeader={true}
        data={batches}
      />

      <div className="bx--row mt-4">
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Lot Name</h2>
          {lotName}
        </div>
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Date</h2>
          {getTodayDisplay()}
        </div>
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Lot Type</h2>
          {getTodayDisplay()}
        </div>
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Total Quantity</h2>
          {qty}
        </div>
      </div>
    </>
  );
}
