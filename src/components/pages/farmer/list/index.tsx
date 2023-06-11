import { Box, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { Batch } from "@interfaces/traceability";
import { BATCH_TYPE, ROLES } from "@static/constants";
import { BATCH_CREATE, LOT_CREATE } from "@static/events";
import { hasAccess } from "@utils/auth";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import BatchCreateModal from "./modals/batch-create-modal";
import BatchUpdateModal from "./modals/batch-update-modal-new";
import LotCreateModal from "./modals/lot-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import { useFarmerStore } from "./use-farmer-store";

function FarmerListPageComponent() {
  const [co, setCo] = useState({} as any);
  const [ccs, setCCs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useFarmerStore();
  const { user } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<Required<Batch>[]>([]);
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
    setSelectedBatches(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateLot = () => {
    const ccIds = [...new Set(selectedBatches.map((b) => b.ccCode))];
    const prefix = ccIds.length > 1 ? co.label : ccs.find((c) => c.value === ccIds[0]).label;
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
  };

  const handleOnCreateBatch = () => {
    emit(BATCH_CREATE, null);
  };

  const ActionButtons = () => (
    <ButtonGroup spacing={4}>
      <Button
        colorScheme="blue"
        variant="solid"
        onClick={handleOnCreateBatch}
        isDisabled={!hasAccess([ROLES.ADMIN, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)}
        leftIcon={<AddIcon />}
      >
        Create Batch
      </Button>
    </ButtonGroup>
  );

  const onFarmerUpdate = (props) => {
    onToggle();
    actions.updateFarmer(props);
  };

  // Generate dynamic batchColumns based on state.batch

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>🚜 Farmer(s)</PageHeading>

      <CoreGrid hidden={hideAccessor}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={actions.clearBatch} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
        <Table
          data={state.farmer}
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

      <BatchCreateModal update={actions.addFarmer} />
    </Box>
  );
}

export default FarmerListPageComponent;
