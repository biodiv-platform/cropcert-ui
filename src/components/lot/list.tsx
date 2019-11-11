import Accesser from "@components/@core/accesser";
import EditButton from "@components/@core/modal/edit-button";
import GenricModal from "@components/@core/modal/genric-modal";
import DataTable from "@components/@core/table";
import BatchlistExpanded from "@components/batch/batchlist-expanded";
import { axCoByUnionId } from "@services/co.service";
import LotStore from "@stores/lot.store";
import { DATATYPE, LOT_AT, ROLES } from "@utils/constants";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDispatch } from "./lot.columns";

function ListLots() {
  const lotStore = useContext(LotStore);
  const [lots, setLots] = useState([] as any);
  const [coCodes, setCoCodes] = useState([] as any);
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [isDateModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    row: {} as any,
  } as any);

  useEffect(() => {
    setLots(
      lotStore.lots.map(l => ({
        ...l,
        disabled:
          l.weightLeavingCooperative && l.mcLeavingCooperative ? false : true,
      }))
    );
  }, [lotStore.lots]);

  const columns = [
    ...columnsDispatch,
    {
      name: "Quantity",
      selector: "quantity",
    },
    {
      name: "Weight Leaving Cooperative",
      selector: "id",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.weightLeavingCooperative}
          onClick={() => {
            setModalData({
              row,
              keyName: "weightLeavingCooperative",
              keyTitle: "Weight Leaving Cooperative",
              dataType: DATATYPE.NUMBER,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Moisture Content Leaving Cooperative",
      selector: "id",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.mcLeavingCooperative}
          onClick={() => {
            setModalData({
              row,
              keyName: "mcLeavingCooperative",
              keyTitle: "Moisture Content Leaving Cooperative",
              dataType: DATATYPE.NUMBER,
              max: 100,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (coCodes.length > 0) {
      lotStore.lazyList(true, LOT_AT.COOPERATIVE, coCodes, false);
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

  const onClose = async (updated, keyName?, body?) => {
    if (updated) {
      await lotStore.updateLot(keyName, body, LOT_AT.FACTORY);
    }
    setIsModalOpen(false);
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
      <GenricModal
        isOpen={isDateModalOpen}
        onClose={onClose}
        keyId="id"
        {...modalData}
      />

      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1>Dispatch Lot(s) to Factory</h1>
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
        <Accesser toRole={ROLES.UNION} onChange={onUnionSelected} />
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (lotStore.lots.length > 0) {
            lotStore.lazyList(false, LOT_AT.COOPERATIVE, coCodes, false);
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
          data={lots}
          expandableRows={true}
          expandableRowsComponent={<BatchlistExpanded />}
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(ListLots);
