import { Box, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
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
  const [hideAccessor, setHideAccessor] = useState<boolean>();

  useEffect(() => {
    ccCodes.length && actions.listFarmer({ ccCodes, reset: true });
  }, [ccCodes]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  useEffect(() => {
    if (hasAccess([ROLES.UNION], user)) {
      setHideAccessor(true);
      setCCs([0]); // dummy cc
    }
  }, []);

  const handleLoadMore = () => {
    actions.listFarmer({ ccCodes });
  };

  const handleOnSelectionChange = ({ selectedRows }: { selectedRows: Required<Batch>[] }) => {
    setSelectedFarmerProduce(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateBatch = () => {
    const prefix = "Busalya";
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

  // Generate dynamic batchColumns based on state.batch

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>🚜 Farmer Collection(s)</PageHeading>

      <CoreGrid hidden={hideAccessor}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={actions?.clearFarmer} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
        <Table
          data={state.farmer.filter(
            (row) => row.batchId === null || row.batchId === undefined || row.batchId === ""
          )}
          columns={batchColumns}
          selectableRows={true}
          selectableRowDisabled={(r) => r.batchId}
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

      <BatchCreateModal update={onFarmerUpdate} />
    </Box>
  );
}

export default FarmerListPageComponent;
