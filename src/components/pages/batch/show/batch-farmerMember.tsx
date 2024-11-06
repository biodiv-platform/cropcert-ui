import DataTable from "@components/@core/table";
import { farmerMemberColumns } from "@components/pages/farmer-member/list/data";
import React from "react";

import BatchShowPanel from "./panel";

export default function BatchFarmerMember({ rows }) {
  return (
    <BatchShowPanel icon="🧑‍🌾" title="Farmer Member" count={rows.length}>
      <DataTable keyField="farmerId" columns={farmerMemberColumns} noHeader={true} data={rows} />
    </BatchShowPanel>
  );
}
