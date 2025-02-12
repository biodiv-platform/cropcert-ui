import DataTable from "@components/@core/table";
import { farmerMemberColumns } from "@components/pages/farmer-member/list/data";
import React from "react";

import LotShowPanel from "./panel";

export default function LotFarmerMember({ rows }) {
  return (
    <LotShowPanel icon="🧑‍🌾" title="Farmer Member" count={rows.length}>
      <DataTable keyField="farmerId" columns={farmerMemberColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
