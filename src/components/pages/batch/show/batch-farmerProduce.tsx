import DataTable from "@components/@core/table";
import { farmerProduceColumns } from "@components/pages/farmer-produce/list/data";
import React from "react";

import BatchShowPanel from "./panel";

export default function BatchFarmerProduce({ rows }) {
  return (
    <BatchShowPanel icon="🚜" title="Farmer Produce" count={rows.length}>
      <DataTable
        keyField="farmerProduceId"
        columns={farmerProduceColumns}
        noHeader={true}
        data={rows}
      />
    </BatchShowPanel>
  );
}
