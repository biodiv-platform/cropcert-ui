import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
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
import BatchExpand from "./expand";
import BatchCreateModal from "./modals/batch-create-modal";
import BatchUpdateModal from "./modals/batch-update-modal-new";
import LotCreateModal from "./modals/lot-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import { useBatchStore } from "./use-batch-store";

function BatchListPageComponent() {
  const [union, setUnion] = useState({} as any);
  const [coCodes, setCOCodes] = useState<any>([]);
  const { state, ...actions } = useBatchStore();
  const { user } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<Required<Batch>[]>([]);
  const { isOpen: clearRows, onToggle } = useDisclosure();
  const [hideAccessor] = useState<boolean>();
  const [triggerRender, setTriggerRender] = useState(false);
  const [batchModalColumns, setBatchModalColumns] = useState<any>([]);
  const [showAlert, setShowAlert] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    coCodes.length && actions.listBatch({ coCodes, reset: true });
  }, [triggerRender, coCodes]);

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("BATCH");
      setBatchModalColumns(columns.data);
    })();
  }, []);

  const handleLoadMore = () => {
    actions.listBatch({ coCodes });
  };

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
  };

  const handleDisabledRows = (r) => {
    if (r.isReadyForLot && !r.lotId) {
      setShowAlert(true);
    }
    return r.lotId;
  };

  const ActionButtons = () => (
    <ButtonGroup spacing={4}>
      <Button
        colorScheme="green"
        variant="solid"
        isDisabled={
          showTypeError ||
          selectedBatches.length === 0 ||
          !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
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
          toRole={ROLES.UNION}
          onChange={setUnion}
          onTouch={() => {
            actions.clearBatch();
            actions.setLoading(true);
          }}
        />
        <Box>
          <CoMultiSelect unionId={union?.value} onChange={setCOCodes} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {state.batch.length
        ? showAlert && (
            <Alert status="success" variant="left-accent" marginY={2} rounded={"md"}>
              <AlertIcon />
              {t("traceability:batch.batch_ready_for_lot")}
            </Alert>
          )
        : null}

      {state.isLoading ? (
        <Spinner />
      ) : state.batch.length > 0 ? (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
          <Table
            data={state.batch}
            columns={batchColumns}
            selectableRows={true}
            expandableRows={true}
            selectableRowDisabled={(r) => handleDisabledRows(r)}
            onSelectedRowsChange={handleOnSelectionChange}
            clearSelectedRows={clearRows}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            conditionalRowStyles={[
              {
                when: (row) => row.lotId,
                style: {
                  background: "var(--chakra-colors-gray-100)!important",
                  opacity: "0.5",
                },
              },
              {
                when: (row) => row.isReadyForLot && !row.lotId,
                style: {
                  borderLeft: "5px solid var(--chakra-colors-green-500)",
                  borderRadius: "6px",
                  backgroundColor: "var(--chakra-colors-green-50)",
                },
              },
            ]}
            expandableRowsComponent={BatchExpand}
            pagination
            paginationPerPage={20}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
          />
        </InfiniteScroll>
      ) : (
        <Box mt={2}>{t("traceability:no_records")}</Box>
      )}

      <BatchUpdateModal update={onBatchUpdate} />
      <LotCreateModal update={onBatchUpdate} />
      <BatchCreateModal update={actions.addBatch} />
    </Box>
  );
}

export default BatchListPageComponent;
