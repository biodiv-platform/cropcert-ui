import BatchlistExpanded from "@components/batch/batchlist-expanded";
import LotStore from "@stores/lot.store";
import { LOT_AT } from "@utils/constants";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component-tmp";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "./lot.columns";

function ListLots() {
  const lotStore = useContext(LotStore);
  const [selectedRows, setSelectedRows] = useState([] as any);

  useEffect(() => {
    lotStore.lazyList(true, LOT_AT.COOPERATIVE);
  }, []);

  const handleDispatchLot = () => {
    navigate("/lot/dispatch", {
      state: {
        rows: selectedRows,
        to: "factory",
        timeKey: "timeToFactory",
      },
    });
  };

  return (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Dispatch Lot(s) to Factory</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-2"
            disabled={selectedRows.length <= 0}
            onClick={handleDispatchLot}
          >
            Dispatch Lot(s)
          </Button>
        </div>
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (lotStore.lots.length > 0) {
            lotStore.lazyList(false, LOT_AT.COOPERATIVE);
          }
        }}
        hasMore={lotStore.lazyListHasMore}
      >
        <DataTable
          keyField="id"
          columns={columnsDispatch}
          noHeader={true}
          selectableRows={true}
          onRowSelected={e => {
            setSelectedRows(e.selectedRows.map(o => toJS(o)));
          }}
          data={lotStore.lots}
          expandableRows={true}
          expandableRowsComponent={<BatchlistExpanded />}
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(ListLots);
