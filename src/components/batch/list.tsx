import Accesser from "@components/@core/accesser";
import MultiSelect from "@khanacademy/react-multi-select";
import { axListCCByCoId } from "@services/cc.service";
import BatchStore from "@stores/batch.store";
import { getToday } from "@utils/basic.util";
import { BATCH_TYPE, MESSAGE, ROLES } from "@utils/constants";
import { Button, ContentSwitcher, Switch } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDry, columnsWet } from "./batch.columns";

function ListBatch() {
  const [ccList, setCCList] = useState([] as any[]);
  const [ccCodes, setccCodes] = useState([] as any[]);
  const batchStore = useContext(BatchStore);
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [batchType, setBatchType] = useState(BATCH_TYPE.WET);
  const [co, setCO] = useState({} as any);

  useEffect(() => {
    batchStore.lazyList(true, batchType, ccCodes, true);
  }, [ccCodes, batchType]);

  const generateLotName = () => {
    const ccs = selectedRows.reduce((acc, o) => {
      const coName = toJS(ccList.find(c => c.code === o.ccCode)).name;
      return acc.includes(coName) ? acc : [...acc, coName];
    }, []);
    return `${ccs.length > 1 ? `${co.label}_co` : ccs[0]}_Lot_${getToday()}`;
  };

  const handleCreateLot = () => {
    navigate("/lot/create", {
      state: {
        batches: selectedRows,
        lotName: generateLotName(),
        type: batchType,
        coCode: co.value,
      },
    });
  };

  const onCoSelected = coCode =>
    coCode &&
    axListCCByCoId(coCode.value).then(data => {
      setCO(coCode);
      if (data.success) {
        const ccs = data.data;
        setCCList(ccs.map(o => ({ ...o, label: o.name, value: o.code })));
        setccCodes(ccs.map(o => o.code));
      }
    });

  return (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Create Lot from Batch(s)</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-2"
            disabled={selectedRows.length <= 0}
            onClick={handleCreateLot}
          >
            Create Lot
          </Button>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-2 bx--col-md-12 mb-4">
          <ContentSwitcher onChange={() => null}>
            <Switch
              text={BATCH_TYPE.WET}
              onClick={() => {
                setBatchType(BATCH_TYPE.WET);
              }}
            />
            <Switch
              text={BATCH_TYPE.DRY}
              onClick={() => {
                setBatchType(BATCH_TYPE.DRY);
              }}
            />
          </ContentSwitcher>
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
          columns={batchType === BATCH_TYPE.DRY ? columnsDry : columnsWet}
          noHeader={true}
          selectableRows={true}
          selectableRowsDisabledField="disabled"
          onRowSelected={e => {
            setSelectedRows(
              e.selectedRows.map(o => toJS(o)).filter(o => o.type === batchType)
            );
          }}
          data={batchStore.batches}
        />
      </InfiniteScroll>
    </>
  );
}

export default observer(ListBatch);
