import Accesser from "@components/@core/accesser";
import EditButton from "@components/@core/modal/edit-button";
import GenricModal from "@components/@core/modal/genric-modal";
import BatchlistExpanded from "@components/batch/batchlist-expanded";
import LotStore from "@stores/lot.store";
import { DATATYPE, LOT_AT, ROLES } from "@utils/constants";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "./lot.columns";

function MillingLots() {
  const lotStore = useContext(LotStore);
  const [coCodes, setCoCodes] = useState([] as any);
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [isDateModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    row: {} as any,
  } as any);

  useEffect(() => {
    if (coCodes.length > 0) {
      lotStore.lazyList(true, LOT_AT.FACTORY, coCodes);
    }
  }, [coCodes]);

  const columns = [
    ...columnsDispatch,
    {
      name: "Milling Time",
      selector: "millingTime",
      cell: row => (
        <EditButton
          value={row.millingTime}
          onClick={() => {
            setModalData({
              row,
              keyName: "millingTime",
              dataType: DATATYPE.DATETIME,
              min: row.timeToFactory,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Out Turn",
      selector: "outTurn",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.outTurn}
          onClick={() => {
            setModalData({
              row,
              keyName: "outTurn",
              dataType: DATATYPE.NUMBER,
              max: row.quantity,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
  ];

  const handleDispatchLot = () => {
    navigate("/lot/dispatch", {
      state: {
        rows: selectedRows,
        to: "union",
        timeKey: "dispatchTime",
      },
    });
  };

  const onClose = async (updated, keyName?, body?) => {
    if (updated) {
      await lotStore.updateLot(keyName, body, LOT_AT.FACTORY);
    }
    setIsModalOpen(false);
  };

  const onCoSelected = co => co && setCoCodes([co.value]);

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
          <h1 className="eco--title">Dispatch Lot(s) to Union</h1>
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
        <Accesser toRole={ROLES.COOPERATIVE} onChange={onCoSelected} />
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (lotStore.lots.length > 0) {
            lotStore.lazyList(false, LOT_AT.FACTORY, coCodes);
          }
        }}
        hasMore={lotStore.lazyListHasMore}
      >
        <DataTable
          keyField="id"
          columns={columns}
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

export default observer(MillingLots);
