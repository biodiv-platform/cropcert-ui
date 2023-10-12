import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Skeleton,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import FilterComponent from "@components/@core/table/filter-component";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { Batch } from "@interfaces/traceability";
import { ROLES } from "@static/constants";
import { BATCH_CREATE } from "@static/events";
import { hasAccess } from "@utils/auth";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import BatchCreateModal from "./modals/batch-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import { useFarmerStore } from "./use-farmer-store";

function FarmerListPageComponent() {
  const [co, setCo] = useState({} as any);
  const [ccs, setCCs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useFarmerStore();
  const { user } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedFarmerProduce, setSelectedFarmerProduce] = useState<Required<Batch>[]>([]);
  const { isOpen: clearRows, onToggle } = useDisclosure();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    ccCodes.length && actions.listFarmer({ ccCodes, reset: true });
  }, [ccCodes]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const handleLoadMore = () => {
    actions.listFarmer({ ccCodes });
  };

  const handleOnSelectionChange = ({ selectedRows }: { selectedRows: Required<Batch>[] }) => {
    setSelectedFarmerProduce(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateBatch = () => {
    const prefix = "Mityana";
    const quantity = selectedFarmerProduce.reduce(
      (acc, cv) => selectedFarmerProduce.length && cv.quantity + acc,
      0
    );

    const payload = {
      name: `${prefix}_D_`,
      type: "Dry",
      selected: selectedFarmerProduce,
      coCode: co.value,
      quantity,
    };
    emit(BATCH_CREATE, payload);
  };

  const ActionButtons = () => {
    const quantity = selectedFarmerProduce.reduce(
      (acc, cv) => selectedFarmerProduce.length && cv.quantity + acc,
      0
    );
    return (
      <ButtonGroup spacing={4}>
        <Box
          display="flex"
          alignItems="center"
          hidden={
            showTypeError ||
            selectedFarmerProduce.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
        >
          Selected Quantity: {quantity}(Kgs)
        </Box>
        <Button
          colorScheme="blue"
          variant="solid"
          onClick={handleOnCreateBatch}
          isDisabled={
            showTypeError ||
            selectedFarmerProduce.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
          leftIcon={<AddIcon />}
        >
          Create Batch
        </Button>
      </ButtonGroup>
    );
  };

  const onFarmerUpdate = (props) => {
    onToggle();
    actions.updateFarmer(props);
  };

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

  const filteredItems =
    state.farmer &&
    state.farmer.filter((item) => {
      return (
        item.farmerName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.collectionCenter.toLowerCase().includes(filterText.toLowerCase())
      );
    });

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        // setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>🚜 Farmer Produce </PageHeading>
      <Box my={2}>{`Total Records: ${
        state.isLoading
          ? "Loading..."
          : state.farmer.filter(
              (row) => row.batchId === null || row.batchId === undefined || row.batchId === ""
            ).length
      }`}</Box>

      <CoreGrid hidden={false}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={actions?.clearFarmer} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {state.isLoading ? (
        <ChakraTable variant="simple">
          <Thead>
            <Tr>{loadingColumns}</Tr>
          </Thead>
          <Tbody>{loadingRows}</Tbody>
        </ChakraTable>
      ) : (
        // TODO: check the loadMore prop
        <InfiniteScroll pageStart={0} loadMore={false} hasMore={false}>
          {filteredItems.length > 0 ? (
            <Table
              data={filteredItems || []}
              columns={batchColumns}
              selectableRows={true}
              selectableRowDisabled={(r) => r.batchId}
              onSelectedRowsChange={handleOnSelectionChange}
              clearSelectedRows={clearRows}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
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
              paginationRowsPerPageOptions={[20, 50, 100]}
            />
          ) : (
            <Flex alignItems="center" flexDirection="column" gap={2}>
              <Box textAlign="center" mt={4}>
                No matching records found.
              </Box>
              <Button onClick={() => setFilterText("")}>Clear Filter</Button>
            </Flex>
          )}
        </InfiniteScroll>
      )}

      <BatchCreateModal update={onFarmerUpdate} />
    </Box>
  );
}

export default FarmerListPageComponent;
