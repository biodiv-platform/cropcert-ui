import DataTable from "@components/@core/table";
import { farmerProduceColumns } from "@components/pages/farmer-produce/list/data";
import React from "react";

import LotShowPanel from "./panel";

export default function LotFarmerProduce({ rows }) {
  return (
    <LotShowPanel icon="🚜" title="Farmer Produce" count={rows.length}>
      <DataTable
        keyField="farmerProduceId"
        columns={farmerProduceColumns}
        noHeader={true}
        data={rows}
      />
    </LotShowPanel>
  );
}
