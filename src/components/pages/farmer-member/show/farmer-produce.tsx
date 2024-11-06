import DataTable from "@components/@core/table";
import { farmerProduceColumns } from "@components/pages/farmer-produce/list/data";
import React from "react";

import FarmerShowPanel from "./panel";

export default function FarmerProduce({ rows }) {
  return (
    <FarmerShowPanel icon="🚜" title="Farmer Produce" count={rows.length}>
      <DataTable keyField="batchId" columns={farmerProduceColumns} noHeader={true} data={rows} />
    </FarmerShowPanel>
  );
}
