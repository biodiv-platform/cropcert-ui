import { Box, Button, Group, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { Batch } from "@interfaces/traceability";
import { ROLES } from "@static/constants";
import { LOT_CREATE } from "@static/events";
import { hasAccess } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";

import { Alert } from "@/components/ui/alert";

import { useTraceability } from "../../common/traceability-tabs";
import { fetchBatchColumns } from "./data";
import BatchExpand from "./expand";
import BatchCreateModal from "./modals/batch-create-modal";
import BatchUpdateModal from "./modals/batch-update-modal-new";
import LotCreateModal from "./modals/lot-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import useBatchFilter from "./use-batch-filter";

function BatchComponent() {
  const { user, union, setUnion } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<Required<Batch>[]>([]);
  const { open: clearRows, onToggle } = useDisclosure();
  const [hideAccessor] = useState<boolean>();
  const [triggerRender, setTriggerRender] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [batchColumns, setBatchColumns] = useState<any[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<any[]>([]);
  const [columnsLoading, setColumnsLoading] = useState(true);
  const [columnsError, setColumnsError] = useState<Error | null>(null);
  const { t } = useTranslation();
  const { setReRenderTabs } = useTraceability();

  const { clearBatch, setCOCodes, batchListData, loading, updateBatch, addBatch } =
    useBatchFilter();

  useEffect(() => {
    async function loadColumns() {
      try {
        setColumnsLoading(true);
        const columns = await fetchBatchColumns();
        setBatchColumns(columns);
        setVisibleColumns(columns.filter((col) => col.showDefault));
      } catch (error) {
        setColumnsError(error as Error);
      } finally {
        setColumnsLoading(false);
      }
    }

    loadColumns();
  }, []);

  const handleOnSelectionChange = ({ selectedRows }: { selectedRows: Required<Batch>[] }) => {
    setSelectedBatches(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateLot = () => {
    const prefix = selectedBatches[0].batchName.split("_")[0];
    const quantity = selectedBatches.reduce(
      (acc, cv) => selectedBatches.length && cv.quantity + acc,
      0
    );

    const payload = {
      name: `${prefix}_${selectedBatches[0].type.charAt(0).toUpperCase()}_`,
      type: selectedBatches[0].type,
      selected: selectedBatches,
      coCode: [...new Set(selectedBatches.map((r) => r.coCode))].flat(),
      ccCode: [...new Set(selectedBatches.map((r) => r.ccCode))].flat(),
      unionCode: union.value,
      quantity,
    };

    emit(LOT_CREATE, payload);
    setTriggerRender(!triggerRender);
    setReRenderTabs && setReRenderTabs((prevState) => !prevState);
  };

  const handleDisabledRows = (r) => {
    if (r.isReadyForLot && !r.lotId) {
      setShowAlert(true);
    }
    return r.lotId;
  };

  const ActionButtons = () => (
    <Group gap={4}>
      <Button
        colorPalette="green"
        variant="solid"
        disabled={
          showTypeError ||
          selectedBatches.length === 0 ||
          !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
        }
        onClick={handleOnCreateLot}
      >
        {<AddIcon />}
        Create Lot
      </Button>
    </Group>
  );

  const onBatchUpdate = () => {
    onToggle();
    updateBatch();
    setTriggerRender(!triggerRender);
    setReRenderTabs && setReRenderTabs((prevState) => !prevState);
  };

  if (columnsError) {
    return <Box>Error loading columns: {columnsError.message}</Box>;
  }

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>🧺 {t("traceability:tab_titles.batch")}</PageHeading>
      <Box mt={2}>
        {t("traceability:total_records")}: {loading ? <Spinner size="xs" /> : batchListData?.length}
      </Box>
      <CoreGrid hidden={hideAccessor}>
        <Accesser
          toRole={ROLES.UNION}
          onChange={setUnion}
          onTouch={() => {
            clearBatch();
          }}
        />
        <Box>
          <CoMultiSelect unionId={union?.value} onChange={setCOCodes} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {batchListData?.length
        ? showAlert && (
            <Alert
              status="success"
              marginBottom={2}
              rounded={"md"}
              title={t("traceability:batch.batch_ready_for_lot")}
            />
          )
        : null}

      {loading || columnsLoading ? (
        <Spinner />
      ) : batchListData?.length > 0 ? (
        <Table
          data={batchListData}
          columns={visibleColumns}
          selectableRows={true}
          expandableRows={true}
          selectableRowDisabled={(r) => handleDisabledRows(r)}
          onSelectedRowsChange={handleOnSelectionChange}
          clearSelectedRows={clearRows}
          defaultSortFieldId={1}
          defaultSortAsc={false}
          conditionalRowStyles={[
            {
              when: (row) => row._id,
              style: {
                paddingLeft: "2px",
              },
            },
            {
              when: (row) => row.lotId,
              style: {
                background: "var(--chakra-colors-gray-100)!important",
                paddingLeft: "2px",
                opacity: "0.5",
              },
            },
            {
              when: (row) => row.isReadyForLot && !row.lotId,
              style: {
                borderLeft: "2px solid var(--chakra-colors-green-500)",
              },
            },
          ]}
          expandableRowsComponent={BatchExpand}
          pagination
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 40, 60, 100]}
          fixedHeader
          fixedHeaderScrollHeight={`calc(100vh - var(--batch-table-gap, 370px))`}
          showManageColumnDropdown={true}
          setVisibleColumns={setVisibleColumns}
          allColumns={batchColumns}
        />
      ) : (
        <Box mt={2} minHeight={"300px"}>
          {t("traceability:no_records")}
        </Box>
      )}

      <BatchUpdateModal update={onBatchUpdate} />
      <LotCreateModal update={onBatchUpdate} />
      <BatchCreateModal update={addBatch} />
    </Box>
  );
}

export default BatchComponent;
