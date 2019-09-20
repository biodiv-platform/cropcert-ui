import Accesser from "@components/@core/accesser";
import BatchlistExpanded from "@components/batch/batchlist-expanded";
import { axCoByUnionId } from "@services/co.service";
import LotStore from "@stores/lot.store";
import { LOT_AT, ROLES } from "@utils/constants";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "./lot.columns";

function ListLots() {
  const lotStore = useContext(LotStore);
  const [coCodes, setCoCodes] = useState([] as any);
  const [selectedRows, setSelectedRows] = useState([] as any);

  useEffect(() => {
    if (coCodes.length > 0) {
      lotStore.lazyList(true, LOT_AT.COOPERATIVE, coCodes);
    }
  }, [coCodes]);

  const handleDispatchLot = () => {
    navigate("/lot/dispatch", {
      state: {
        rows: selectedRows,
        to: "factory",
        timeKey: "timeToFactory",
      },
    });
  };

  const onUnionSelected = union =>
    union &&
    axCoByUnionId(union.value).then(({ success, data }) => {
      if (success) {
        setCoCodes(data.map(o => o.code));
      }
    });

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

      <div className="bx--row">
        <Accesser toRole={ROLES.UNION} onChange={onUnionSelected} />
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (lotStore.lots.length > 0) {
            lotStore.lazyList(false, LOT_AT.COOPERATIVE, coCodes);
          }
        }}
        hasMore={lotStore.lazyListHasMore}
      >
        <DataTable
          keyField="id"
          columns={columnsDispatch}
          noHeader={true}
          selectableRows={true}
          selectableRowsDisabledField="disabled"
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
