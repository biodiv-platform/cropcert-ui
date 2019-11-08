import Accesser from "@components/@core/accesser";
import DataTable from "@components/@core/table";
import BatchlistExpanded from "@components/batch/batchlist-expanded";
import { axCoByUnionId } from "@services/co.service";
import LotStore from "@stores/lot.store";
import { camelCaseToStartCase } from "@utils/basic.util";
import { LOT_AT, REPORT_TYPE, ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "../lot.columns";
import actionButton from "./action-button";

function GRNLots({ reportType = REPORT_TYPE.GREEN }: { reportType: string }) {
  const lotStore = useContext(LotStore);
  const reportTypeTitle = camelCaseToStartCase(reportType);
  const [coCodes, setCoCodes] = useState([] as any);

  useEffect(() => {
    if (coCodes.length > 0) {
      lotStore.lazyList(true, LOT_AT.UNION, coCodes);
    }
  }, [coCodes]);

  const columns = [
    {
      name: "GRN Number",
      selector: "grnNumber",
    },
    ...columnsDispatch,
    {
      name: "Report",
      selector: "id",
      cell: row => actionButton(reportType, row),
    },
  ];

  const onUnionSelected = union =>
    union &&
    axCoByUnionId(union.value).then(({ success, data }) => {
      if (success) {
        setCoCodes(data.map(o => o.code));
      }
    });

  return (
    <>
      <div className="bx--row mb-2">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Add/Update {reportTypeTitle} Report</h1>
        </div>
      </div>

      <div className="bx--row">
        <Accesser toRole={ROLES.UNION} onChange={onUnionSelected} />
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (lotStore.lots.length > 0) {
            lotStore.lazyList(false, LOT_AT.UNION, coCodes);
          }
        }}
        hasMore={lotStore.lazyListHasMore}
      >
        <DataTable
          keyField="id"
          columns={columns}
          noHeader={true}
          data={lotStore.lots}
          expandableRows={true}
          expandableRowsComponent={
            <BatchlistExpanded reportType={reportType} />
          }
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(GRNLots);
