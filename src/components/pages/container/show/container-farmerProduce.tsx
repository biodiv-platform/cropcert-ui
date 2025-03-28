import DataTable from "@components/@core/table";
import { farmerProduceColumns } from "@components/pages/farmer-produce/list/data";
import React from "react";

import ContainerShowPanel from "./panel";

export default function ContainerFarmerProduce({ rows }) {
  return (
    <ContainerShowPanel icon="🚜" title="Farmer Produce" count={rows.length}>
      <DataTable
        keyField="farmerProduceId"
        columns={farmerProduceColumns}
        noHeader={true}
        data={rows}
      />
    </ContainerShowPanel>
  );
}
