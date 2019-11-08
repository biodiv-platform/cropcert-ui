import Accesser from "@components/@core/accesser";
import EditButton from "@components/@core/modal/edit-button";
import GenricModal from "@components/@core/modal/genric-modal";
import DataTable from "@components/@core/table";
import MultiSelect from "@khanacademy/react-multi-select";
import { axListCCByCoId } from "@services/cc.service";
import BatchStore from "@stores/batch.store";
import { hasAccess } from "@utils/auth.util";
import { local2utc } from "@utils/basic.util";
import { BATCH_TYPE, DATATYPE, MESSAGE, ROLES } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDefault } from "./batch.columns";

function ListWet({ batchType = BATCH_TYPE.WET }) {
  const [ccList, setCCList] = useState([] as any[]);
  const [ccCodes, setccCodes] = useState([] as any[]);
  const batchStore = useContext(BatchStore);
  const [isDateModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalData, setModalData] = useState({
    row: {} as any,
  } as any);

  const columns = [
    ...columnsDefault,
    {
      name: "Start Time",
      selector: "startTime",
      cell: row => (
        <EditButton
          value={row.startTime}
          onClick={() => {
            setModalData({
              row,
              keyName: "startTime",
              dataType: DATATYPE.DATETIME,
              min: local2utc(row.date).getTime(),
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Fermentation Ended on",
      selector: "fermentationEndTime",
      cell: row => (
        <EditButton
          value={row.fermentationEndTime}
          onClick={() => {
            setModalData({
              row,
              keyName: "fermentationEndTime",
              dataType: DATATYPE.DATETIME,
              min: row.startTime,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Drying Ended on",
      selector: "dryingEndTime",
      cell: row => (
        <EditButton
          value={row.dryingEndTime}
          onClick={() => {
            setModalData({
              row,
              keyName: "dryingEndTime",
              dataType: DATATYPE.DATETIME,
              min: row.fermentationEndTime,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Perchment Quantity",
      selector: "perchmentQuantity",
      cell: row => (
        <EditButton
          dataType={DATATYPE.NUMBER}
          value={row.perchmentQuantity}
          onClick={() => {
            setModalData({
              row,
              keyName: "perchmentQuantity",
              dataType: DATATYPE.NUMBER,
              max: row.quantity,
            });
            setIsModalOpen(true);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    batchStore.lazyList(true, batchType, ccCodes, false);
  }, [ccCodes]);

  const onClose = async (updated, keyName?, body?) => {
    if (updated) {
      await batchStore.updateWetBatch(keyName, body);
    }
    setIsModalOpen(false);
  };

  const handleFinalizeWetBatch = () => {
    navigate("/batch/finalize-wet", {
      state: {
        rows: selectedRows.map(o => toJS(o)),
      },
    });
  };

  const onCoSelected = coCode =>
    coCode &&
    axListCCByCoId(coCode.value).then(data => {
      if (data.success) {
        const ccs = hasAccess([ROLES.COLLECTION_CENTER])
          ? data.data.filter(o => o.code === getUserKey("ccCode"))
          : data.data;
        setCCList(ccs.map(o => ({ ...o, label: o.name, value: o.code })));
        setccCodes(ccs.map(o => o.code));
      }
    });

  return (
    <>
      <GenricModal
        isOpen={isDateModalOpen}
        onClose={onClose}
        keyId="batchId"
        {...modalData}
      />

      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Update Wet Batch</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right mt-3">
          <Button
            kind="primary"
            disabled={selectedRows.length <= 0}
            onClick={handleFinalizeWetBatch}
          >
            Finalize Wetbatch
          </Button>
        </div>
      </div>

      <div className="bx--row">
        <Accesser toRole={ROLES.COOPERATIVE} onChange={onCoSelected} />
        <div className="bx--col-lg-4 bx--col-md-12 mb-4">
          <label className="bx--label">Collection Center(s)</label>
          <MultiSelect
            options={ccList}
            overrideStrings={{ allItemsAreSelected: MESSAGE.ALL_CC_SELECTED }}
            selected={ccCodes}
            onSelectedChanged={setccCodes}
          />
        </div>
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (batchStore.batches.length > 0) {
            batchStore.lazyList(false, batchType, ccCodes, false);
          }
        }}
        hasMore={batchStore.lazyListHasMore}
      >
        <DataTable
          keyField="batchId"
          columns={columns}
          noHeader={true}
          selectableRows={true}
          selectableRowsDisabledField="disabled"
          onRowSelected={e => {
            setSelectedRows(e.selectedRows);
          }}
          data={batchStore.batches}
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(ListWet);
