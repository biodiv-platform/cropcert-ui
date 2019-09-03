import BatchlistExpanded from "@components/batch/batchlist-expanded";
import LotStore from "@stores/lot.store";
import { camelCaseToStartCase } from "@utils/basic.util";
import { LOT_AT, REPORT_TYPE } from "@utils/constants";
import { Link } from "gatsby";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "../lot.columns";

function GRNLots({ reportType = REPORT_TYPE.GREEN }) {
  const lotStore = useContext(LotStore);
  const reportTypeTitle = camelCaseToStartCase(reportType);

  useEffect(() => {
    lotStore.lazyList(true, LOT_AT.UNION);
  }, []);

  const columns = [
    ...columnsDispatch,
    {
      name: "Report",
      selector: "id",
      cell: row => (
        <Link to={`/lot/report/${reportType}?id=${row.id}`}>
          {reportTypeTitle} Report
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="bx--row mb-2">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Add/Update {reportTypeTitle} Report</h1>
        </div>
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (lotStore.lots.length > 0) {
            lotStore.lazyList(false, LOT_AT.UNION);
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
          expandableRowsComponent={<BatchlistExpanded />}
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(GRNLots);
