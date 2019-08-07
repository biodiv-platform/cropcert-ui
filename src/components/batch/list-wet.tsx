import EditButton from "@components/@core/modal/edit-button";
import GenricModal from "@components/@core/modal/genric-modal";
import MultiSelect from "@khanacademy/react-multi-select";
import BatchStore from "@stores/batch.store";
import { BATCH_TYPE, DATATYPE, ENDPOINT } from "@utils/constants";
import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component-tmp";
import InfiniteScroll from "react-infinite-scroller";

interface IProps {
  CCAccessible: any[];
  batchType?;
}

function ListWet({ CCAccessible, batchType = BATCH_TYPE.WET }: IProps) {
  const [ccCodes, setccCodes] = useState(CCAccessible.map(i => i.id));
  const batchStore = useContext(BatchStore);
  const [isDateModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalData, setModalData] = useState({
    row: {} as any,
  } as any);

  const columns = [
    {
      name: "Batch Id",
      selector: "batchId",
    },
    {
      name: "Batch Name",
      selector: "batchName",
    },
    {
      name: "Total Quantity",
      selector: "quantity",
    },
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
              min: row.createdOn,
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

  const onClose = (updated = false) => {
    setIsModalOpen(false);
    if (updated) {
      batchStore.lazyList(true, batchType, ccCodes, false);
    }
  };

  const handleFinalizeWetBatch = () => {
    navigate("/batch/finalize-wet", {
      state: {
        rows: selectedRows.map(o => toJS(o)),
      },
    });
  };

  return (
    <>
      <GenricModal
        isOpen={isDateModalOpen}
        onClose={onClose}
        keyId="batchId"
        endpoint={`${ENDPOINT.TRACEABILITY}/wetbatch/`}
        {...modalData}
      />

      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Update Wet Batch</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="mt-2"
            disabled={selectedRows.length <= 0}
            onClick={handleFinalizeWetBatch}
          >
            Finalize Wetbatch
          </Button>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-4 bx--col-md-12 mb-4">
          <MultiSelect
            options={CCAccessible}
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
