import DataTable from "@components/@core/table";
import React from "react";

import { ExpandedSection } from "./expand";
import { GreenReportExpand, GreenReportHeader } from "./models";
import LotShowPanel from "./panel";

export default function LotGreenReport({ reports }) {
  return (
    <LotShowPanel icon="🧪" title="Quality/Green Lab Report(s)" count={reports.length}>
      <DataTable
        keyField="id"
        columns={GreenReportHeader}
        noHeader={true}
        data={reports}
        expandableRows={true}
        expandableRowsComponent={({ data }) => (
          <ExpandedSection modal={GreenReportExpand} data={data} />
        )}
      />
    </LotShowPanel>
  );
}
