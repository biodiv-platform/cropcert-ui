import MultiSelect from "@khanacademy/react-multi-select";
import { axGetCoById } from "@services/co.service";
import BatchStore from "@stores/batch.store";
import { getToday } from "@utils/basic.util";
import { BATCH_TYPE, MESSAGE } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import { Button, ContentSwitcher, Switch } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InfiniteScroll from "react-infinite-scroller";

import { columnsDry, columnsWet } from "./batch.columns";

interface IProps {
  CCAccessible: any[];
}

function ListBatch({ CCAccessible }: IProps) {
  const [ccCodes, setccCodes] = useState(CCAccessible.map(i => i.id));
  const batchStore = useContext(BatchStore);
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [batchType, setBatchType] = useState(BATCH_TYPE.WET);
  const [currentCO, setCurrentCo] = useState({} as any);
  const coCode = getUserKey("coCode");

  useEffect(() => {
    axGetCoById(coCode).then(setCurrentCo);
  }, []);

  useEffect(() => {
    batchStore.lazyList(true, batchType, ccCodes, true);
  }, [ccCodes, batchType]);

  const generateLotName = () => {
    const ccs = selectedRows.reduce((acc, o) => {
      const coName = toJS(CCAccessible.find(c => c.id === o.ccCode)).ccName;
      return acc.includes(coName) ? acc : [...acc, coName];
    }, []);
    return `${
      ccs.length > 1 ? `${currentCO.name}_co` : ccs[0]
    }_Lot_${getToday()}`;
  };

  const handleCreateLot = () => {
    navigate("/lot/create", {
      state: {
        batches: selectedRows,
        lotName: generateLotName(),
        type: batchType,
        coCode,
      },
    });
  };

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
        <div className="bx--col-lg-4 bx--col-md-12 mb-4">
          <MultiSelect
            options={CCAccessible}
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
