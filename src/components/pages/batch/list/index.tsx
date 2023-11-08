import { Box, Button, ButtonGroup, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { Batch } from "@interfaces/traceability";
import { axGetColumns } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import { LOT_CREATE } from "@static/events";
import { hasAccess } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import InfiniteScroll from "react-infinite-scroller";

import { createBatchColumns } from "./data";
import BatchCreateModal from "./modals/batch-create-modal";
import BatchUpdateModal from "./modals/batch-update-modal-new";
import LotCreateModal from "./modals/lot-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import { useBatchStore } from "./use-batch-store";

function BatchListPageComponent() {
  const [co, setCo] = useState([] as any);
  const [ccs, setCCs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useBatchStore();
  const { user } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<Required<Batch>[]>([]);
  const { isOpen: clearRows, onToggle } = useDisclosure();
  const [hideAccessor, setHideAccessor] = useState<boolean>();
  const [triggerRender, setTriggerRender] = useState(false);
  const [batchModalColumns, setBatchModalColumns] = useState<any>([]);
  const { t } = useTranslation();

  useEffect(() => {
    ccCodes.length && actions.listBatch({ ccCodes, reset: true });
  }, [triggerRender, ccCodes]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  useEffect(() => {
    if (hasAccess([ROLES.UNION], user)) {
      setHideAccessor(false);
      setCCs([0]); // dummy cc
    }
  }, []);

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("BATCH");
      setBatchModalColumns(columns.data);
    })();
  }, []);

  const handleLoadMore = () => {
    actions.listBatch({ ccCodes });
  };

  const handleOnSelectionChange = ({ selectedRows }: { selectedRows: Required<Batch>[] }) => {
    setSelectedBatches(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateLot = () => {
    const prefix = "Buzaaya"; // TODO: change based on odk data
    const quantity = selectedBatches.reduce(
      (acc, cv) => selectedBatches.length && cv.quantity + acc,
      0
    );

    const payload = {
      name: `${prefix}_${selectedBatches[0].type.charAt(0).toUpperCase()}_`,
      type: selectedBatches[0].type,
      selected: selectedBatches,
      coCode: co.value,
      quantity,
    };

    emit(LOT_CREATE, payload);
    setTriggerRender(!triggerRender);
  };

  const ActionButtons = () => (
    <ButtonGroup spacing={4}>
      <Button
        colorScheme="green"
        variant="solid"
        isDisabled={
          showTypeError ||
          selectedBatches.length === 0 ||
          !hasAccess([ROLES.ADMIN, ROLES.COOPERATIVE], user)
        }
        onClick={handleOnCreateLot}
        leftIcon={<AddIcon />}
      >
        Create Lot
      </Button>
    </ButtonGroup>
  );

  const onBatchUpdate = (props) => {
    onToggle();
    actions.updateBatch(props);
    setTriggerRender(!triggerRender);
  };

  // Generate dynamic batchColumns based on state.batch
  const batchColumns = batchModalColumns.length > 0 ? createBatchColumns(batchModalColumns) : [];

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>🧺 {t("traceability:tab_titles.batch")}</PageHeading>
      <Box my={2}>
        {t("traceability:total_records")}:{" "}
        {state.isLoading ? <Spinner size="xs" /> : state.batch.length}
      </Box>
      <CoreGrid hidden={hideAccessor}>
        <Accesser
          toRole={ROLES.COOPERATIVE}
          onChange={setCo}
          onTouch={() => {
            actions.clearBatch();
            actions.setLoading(true);
          }}
        />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {state.isLoading ? (
        <Spinner />
      ) : state.batch.length > 0 ? (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
          <Table
            data={state.batch}
            columns={batchColumns}
            selectableRows={true}
            selectableRowDisabled={(r) => !r.isReadyForLot || r.lotId}
            onSelectedRowsChange={handleOnSelectionChange}
            clearSelectedRows={clearRows}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            conditionalRowStyles={[
              {
                when: (row) => row.lotId,
                style: {
                  background: "var(--chakra-colors-gray-100)!important",
                  opacity: "0.6",
                },
              },
            ]}
            pagination
            paginationPerPage={20}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
          />
        </InfiniteScroll>
      ) : (
        <Box mt={2}>No records found</Box>
      )}

      <BatchUpdateModal update={onBatchUpdate} />
      <LotCreateModal update={onBatchUpdate} />
      <BatchCreateModal update={actions.addBatch} />
    </Box>
  );
}

export default BatchListPageComponent;
