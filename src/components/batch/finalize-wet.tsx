import { axFinalizeWetBatch } from "@services/batch.service";
import { messageRedirect } from "@utils/basic.util";
import { Button } from "carbon-components-react";
import React from "react";
import DataTable from "react-data-table-component-tmp";

import { columnsWet } from "./batch.columns";

interface IProps {
  batches: [any];
}

export default function FinalizeWetBatch({ batches }: IProps) {
  const handleFinalizeWetBatch = () => {
    axFinalizeWetBatch({ batchIds: batches.map(o => o.batchId) }).then(
      response => messageRedirect({ ...response, mcode: "READY_FOR_LOT" })
    );
  };

  return (
    <>
      <div className="bx--row mb-1">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Finalize Wetbatch(s)</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-2"
            disabled={batches.length <= 0}
            onClick={handleFinalizeWetBatch}
          >
            Finalize Wetbatch
          </Button>
        </div>
      </div>

      <DataTable
        keyField="batchId"
        columns={columnsWet}
        noHeader={true}
        data={batches}
      />
    </>
  );
}
