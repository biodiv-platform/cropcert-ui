import {
  Box,
  Button,
  ButtonGroup,
  Skeleton,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { Batch } from "@interfaces/traceability";
import { ROLES } from "@static/constants";
import { LOT_CREATE } from "@static/events";
import { hasAccess } from "@utils/auth";
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
  const [ccs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useBatchStore();
  const { user } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<Required<Batch>[]>([]);
  const { isOpen: clearRows, onToggle } = useDisclosure();
  const [triggerRender, setTriggerRender] = useState(false);

  useEffect(() => {
    actions.listBatch({ ccCodes: [71, 70, 78, 77, 73, 76, 72, 74, 69, 75], reset: true });
  }, [triggerRender]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const handleLoadMore = () => {
    actions.listBatch({ ccCodes });
  };

  const handleOnSelectionChange = ({ selectedRows }: { selectedRows: Required<Batch>[] }) => {
    setSelectedBatches(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateLot = () => {
    const prefix = "Mityana";
    const quantity = selectedBatches.reduce(
      (acc, cv) => selectedBatches.length && cv.quantity + acc,
      0
    );

    const payload = {
      name: `${prefix}_${selectedBatches[0].type.charAt(0).toUpperCase()}_`,
      type: selectedBatches[0].type,
      selected: selectedBatches,
      coCode: "71", //TODO: change it to co.value
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
  const batchColumns =
    state.batch && state.batch.length > 0 ? createBatchColumns(state.batch[0]) : [];

  const loadingColumns = Array.from({ length: 5 }).map((_, index) => (
    <Th key={index}>
      <Skeleton height="20px" startColor="gray.200" endColor="gray.400" />
    </Th>
  ));

  const loadingRows = Array.from({ length: 5 }).map((_, index) => (
    <Tr key={index}>
      {loadingColumns.map((cell, cellIndex) => (
        <Td key={cellIndex}>
          <Skeleton height="20px" startColor="gray.200" endColor="gray.400" />
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>🧺 Batch(s)</PageHeading>
      <Box my={2}>{`Total Records: ${state.batch.length}`}</Box>

      <MultipleTypeWarning show={showTypeError} />

      {state.isLoading && (
        <ChakraTable variant="simple">
          <Thead>
            <Tr>{loadingColumns}</Tr>
          </Thead>
          <Tbody>{loadingRows}</Tbody>
        </ChakraTable>
      )}

      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
        <Table
          data={state.batch}
          columns={batchColumns}
          selectableRows={true}
          selectableRowDisabled={(r) => !r.isReadyForLot || r.lotId}
          onSelectedRowsChange={handleOnSelectionChange}
          clearSelectedRows={clearRows}
          conditionalRowStyles={[
            {
              when: (row) => row.lotId,
              style: {
                background: "var(--chakra-colors-gray-100)!important",
                opacity: "0.6",
              },
            },
          ]}
        />
      </InfiniteScroll>

      <BatchUpdateModal update={onBatchUpdate} />
      <LotCreateModal update={onBatchUpdate} />
      <BatchCreateModal update={actions.addBatch} />
    </Box>
  );
}

export default BatchListPageComponent;
