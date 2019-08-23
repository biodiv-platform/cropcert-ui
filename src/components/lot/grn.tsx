import EditButton from "@components/@core/modal/edit-button";
import GenricModal from "@components/@core/modal/genric-modal";
import BatchlistExpanded from "@components/batch/batchlist-expanded";
import LotStore from "@stores/lot.store";
import { DATATYPE, ENDPOINT, LOT_AT } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component-tmp";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "./lot.columns";

function GRNLots() {
  const lotStore = useContext(LotStore);
  const [isDateModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    row: {} as any,
  } as any);

  useEffect(() => {
    lotStore.lazyList(true, LOT_AT.UNION);
  }, []);

  const columns = [
    ...columnsDispatch,
    {
      name: "GRN",
      selector: "grnNumber",
      cell: row => (
        <EditButton
          dataType={DATATYPE.TEXT}
          value={row.grnNumber}
          onClick={() => {
            setModalData({
              row,
              keyName: "grnNumber",
              dataType: DATATYPE.TEXT,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
  ];

  const onClose = async (updated, keyName?, body?) => {
    if (updated) {
      await lotStore.updateLot(keyName, body, LOT_AT.UNION);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <GenricModal
        isOpen={isDateModalOpen}
        onClose={onClose}
        keyId="id"
        {...modalData}
      />

      <div className="bx--row mb-2">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Add/Update GRN Number</h1>
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
