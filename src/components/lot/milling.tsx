import Accesser from "@components/@core/accesser";
import EditButton from "@components/@core/modal/edit-button";
import GenricModal from "@components/@core/modal/genric-modal";
import DataTable from "@components/@core/table";
import BatchlistExpanded from "@components/batch/batchlist-expanded";
import LotStore from "@stores/lot.store";
import { DATATYPE, LOT_AT, ROLES, TABLE_DATE_CELL } from "@utils/constants";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
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
      lotStore.lazyList(true, LOT_AT.FACTORY, coCodes, false);
    }
  }, [coCodes]);

  const columns = [
    ...columnsDispatch,
    {
      name: "Weight Leaving Cooperative",
      selector: "weightLeavingCooperative",
    },
    {
      name: "Weight Arriving Factory",
      selector: "id",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.weightArrivingFactory}
          onClick={() => {
            setModalData({
              row,
              keyName: "weightArrivingFactory",
              keyTitle: "Weight Arriving Factory",
              dataType: DATATYPE.NUMBER,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Moisture Content Arriving Factory",
      selector: "id",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.mcArrivingFactory}
          onClick={() => {
            setModalData({
              row,
              keyName: "mcArrivingFactory",
              keyTitle: "Moisture Content Arriving Factory",
              dataType: DATATYPE.NUMBER,
              max: 100,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
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
              keyTitle: "Milling Time",
              dataType: DATATYPE.DATETIME,
              min: row.timeToFactory,
            });
            setIsModalOpen(true);
          }}
        />
      ),
      ...TABLE_DATE_CELL,
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
              keyTitle: "Out Turn",
              dataType: DATATYPE.NUMBER,
              max: row.quantity,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Weight Leaving Factory",
      selector: "id",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.weightLeavingFactory}
          onClick={() => {
            setModalData({
              row,
              keyName: "weightLeavingFactory",
              keyTitle: "Weight Leaving Factory",
              dataType: DATATYPE.NUMBER,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Moisture Content Leaving Factory",
      selector: "id",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.mcLeavingFactory}
          onClick={() => {
            setModalData({
              row,
              keyName: "mcLeavingFactory",
              keyTitle: "Moisture Content Leaving Factory",
              dataType: DATATYPE.NUMBER,
              max: 100,
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
          <h1>Dispatch Lot(s) to Union</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-3"
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
            lotStore.lazyList(false, LOT_AT.FACTORY, coCodes, false);
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
          className="mb-4"
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(MillingLots);
