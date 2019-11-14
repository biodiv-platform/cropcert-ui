import DataTable from "@components/@core/table";
import { axGetFarmersByCCId } from "@services/farmer.service";
import React, { useEffect, useState } from "react";

import ListColumns from "./list-columns";

export default function FarmerListTable({ ccId }) {
  const [farmers, setFarmers] = useState({
    success: false,
    data: [] as any,
  });

  useEffect(() => {
    axGetFarmersByCCId(ccId).then(d => setFarmers(d));
  }, []);

  return (
    <DataTable
      keyField="ccId"
      columns={ListColumns()}
      noHeader={true}
      data={farmers.data}
    />
  );
}
