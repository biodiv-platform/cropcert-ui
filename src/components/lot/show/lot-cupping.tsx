import React from "react";
import DataTable from "react-data-table-component-tmp";

import { ExpandedSection } from "./expand";
import { CuppingReportExpand, CuppingReportHeader } from "./models";
import LotShowPanel from "./panel";

export default function LotCuppingReport({ reports }) {
  return (
    <LotShowPanel title="☕ Cupping Report">
      <DataTable
        keyField="id"
        columns={CuppingReportHeader}
        noHeader={true}
        data={reports}
        expandableRows={true}
        expandableRowsComponent={
          <ExpandedSection modal={CuppingReportExpand} />
        }
      />
    </LotShowPanel>
  );
}
