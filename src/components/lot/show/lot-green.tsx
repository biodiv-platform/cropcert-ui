import React from "react";
import DataTable from "react-data-table-component-tmp";

import { ExpandedSection } from "./expand";
import { GreenReportExpand, GreenReportHeader } from "./models";
import LotShowPanel from "./panel";

export default function LotGreenReport({ reports }) {
  return (
    <LotShowPanel title={`📗 Green Report (${reports.length})`}>
      <DataTable
        keyField="id"
        columns={GreenReportHeader}
        noHeader={true}
        data={reports}
        expandableRows={true}
        expandableRowsComponent={<ExpandedSection modal={GreenReportExpand} />}
      />
    </LotShowPanel>
  );
}
