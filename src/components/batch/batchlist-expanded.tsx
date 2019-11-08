import DataTable from "@components/@core/table";
import { ExpandedSection } from "@components/lot/show/expand";
import { CuppingReportExpand, CuppingReportHeader } from "@components/lot/show/models";
import { axGetBatchesByLotId } from "@services/lot.service";
import { BATCH_TYPE, REPORT_TYPE } from "@utils/constants";
import React, { useEffect, useState } from "react";

import { columnsDry, columnsWetExpand } from "./batch.columns";

export default function BatchlistExpanded({
  data = [] as any,
  reportType = "NA",
}) {
  const [rows, setRows] = useState([] as any);

  useEffect(() => {
    axGetBatchesByLotId(data.id).then(props => {
      setRows(props.data);
    });
  }, [data]);

  return (
    <>
      {reportType === REPORT_TYPE.CUPPING && (
        <DataTable
          keyField="id"
          className="eco--table-expanded pt-3 px-3"
          columns={CuppingReportHeader}
          noHeader={true}
          data={data.cuppingReports}
          expandableRows={true}
          expandableRowsComponent={
            <ExpandedSection modal={CuppingReportExpand} />
          }
        />
      )}
      <DataTable
        className="eco--table-expanded p-3"
        keyField="batchId"
        columns={data.type === BATCH_TYPE.WET ? columnsWetExpand : columnsDry}
        noHeader={true}
        data={rows}
      />
    </>
  );
}
