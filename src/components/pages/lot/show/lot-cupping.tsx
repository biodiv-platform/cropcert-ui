import DataTable from "@components/@core/table";
import React from "react";

import { ExpandedSection } from "./expand";
import { CuppingReportExpand, CuppingReportHeader } from "./models";
import LotShowPanel from "./panel";

export default function LotCuppingReport({ reports }) {
  return (
    <LotShowPanel icon="☕" title="Cupping Report(s)" count={reports.length}>
      <DataTable
        keyField="id"
        columns={CuppingReportHeader}
        noHeader={true}
        data={reports}
        expandableRows={true}
        expandableRowsComponent={({ data }) => (
          <ExpandedSection modal={CuppingReportExpand} data={data} />
        )}
      />
    </LotShowPanel>
  );
}
