import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { NextSyncCounter } from "@components/traceability/nextSyncCounter";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { FarmerProduce } from "@interfaces/traceability";
import { axSyncFPDataOnDemand } from "@services/farmer.service";
import { axGetLastSyncedTimeFP } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import { BATCH_CREATE } from "@static/events";
import { useQuery } from "@tanstack/react-query";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import { getLocalTime } from "@utils/traceability";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import BatchCreateModal from "./modals/batch-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import { useFarmerProduceStore } from "./use-farmer-store";

function FarmerListPageComponent() {
  const [co, setCo] = useState({} as any);
  const [ccs, setCCs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useFarmerProduceStore();
  const { user } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [selectedFarmerProduce, setSelectedFarmerProduce] = useState<Required<FarmerProduce>[]>([]);
  const { isOpen: clearRows, onToggle } = useDisclosure();
  const { t } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    ccCodes.length && actions.listFarmerProduce({ ccCodes, reset: true });
  }, [ccCodes]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const { data, isLoading } = useQuery({
    queryKey: ["lastSyncedTimeFP"],
    queryFn: axGetLastSyncedTimeFP,
    refetchInterval: 60 * 60 * 1000,
  });

  const handleLoadMore = () => {
    actions.listFarmerProduce({ ccCodes });
  };

  const handleOnSelectionChange = ({
    selectedRows,
  }: {
    selectedRows: Required<FarmerProduce>[];
  }) => {
    setSelectedFarmerProduce(selectedRows);
    setShowTypeError(
      [...new Set(selectedRows.map((r) => r.produceType))].length === 2 ? true : false
    );
  };

  const handleOnCreateBatch = () => {
    const prefix = "Buzaaya"; // TODO: get from odk data

    const batchTypeArr = [...new Set(selectedFarmerProduce.map((r) => r.produceType))];

    // checking if multiple types are selected
    if (batchTypeArr.length === 2) return setShowTypeError(true);
    else {
      const quantity = selectedFarmerProduce.reduce(
        (acc, cv) => selectedFarmerProduce.length && cv.quantity + acc,
        0
      );

      const payload = {
        name: `${prefix}_D_`,
        selected: selectedFarmerProduce,
        coCode: co.value,
        type: batchTypeArr[0],
        quantity,
      };
      emit(BATCH_CREATE, payload);
    }
  };

  const handleSyncData = async () => {
    try {
      setIsSyncing(true);
      await axSyncFPDataOnDemand();
      window.location.reload();
      notification(t("traceability:sync_status.success"), NotificationType.Success);
      setIsSyncing(false);
    } catch (error) {
      notification(t("traceability:sync_status.error"), NotificationType.Error);
      setIsSyncing(false);
    }
  };

  const ActionButtons = () => {
    const quantity = selectedFarmerProduce.reduce(
      (acc, cv) => selectedFarmerProduce.length && cv.quantity + acc,
      0
    );
    return (
      <ButtonGroup display={"flex"} flexWrap={"wrap"} gap={4}>
        <Box
          display="flex"
          alignItems="center"
          hidden={
            showTypeError ||
            selectedFarmerProduce.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
        >
          {t("traceability:selected_quantity")}: {quantity}(Kgs)
        </Box>
        <Button
          colorScheme="blue"
          variant="solid"
          onClick={handleOnCreateBatch}
          isDisabled={
            showTypeError ||
            selectedFarmerProduce.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
          leftIcon={<AddIcon />}
        >
          Create Batch
        </Button>
        <Button
          colorScheme="gray"
          variant="solid"
          onClick={handleSyncData}
          isDisabled={showTypeError || isSyncing || !hasAccess([ROLES.ADMIN, ROLES.UNION], user)}
          leftIcon={isSyncing ? <Spinner size="xs" /> : <RepeatIcon />}
        >
          {isSyncing
            ? t("traceability:sync_status.syncing")
            : t("traceability:sync_status.sync_now")}
        </Button>
      </ButtonGroup>
    );
  };

  const onFarmerUpdate = (props) => {
    onToggle();
    actions.updateFarmerProduce(props);
  };

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>
        🚜 {t("traceability:tab_titles.farmer_produce")}
      </PageHeading>
      <Flex justifyContent={"space-between"} alignItems={"center"} wrap={"wrap"}>
        <Box my={2}>
          {t("traceability:total_records")}:{" "}
          {state.isLoading ? <Spinner size="xs" /> : state.farmer.length}
        </Box>
        <Box fontSize={"xs"}>
          {t("traceability:sync_status.last_synced")}{" "}
          {isLoading ? <Spinner size="xs" /> : getLocalTime(data?.data)} | <NextSyncCounter />
        </Box>
      </Flex>

      <CoreGrid hidden={false}>
        <Accesser
          toRole={ROLES.COOPERATIVE}
          onChange={setCo}
          onTouch={() => {
            actions?.clearFarmerProduce();
            actions?.setLoading(true);
          }}
        />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {state.isLoading ? (
        <Spinner />
      ) : state.farmer.length > 0 ? (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={false}>
          <Table
            data={state.farmer}
            columns={batchColumns}
            selectableRows={true}
            selectableRowDisabled={(r) => r.batchId}
            onSelectedRowsChange={handleOnSelectionChange}
            clearSelectedRows={clearRows}
            conditionalRowStyles={[
              {
                when: (row) => row.batchId,
                style: {
                  background: "var(--chakra-colors-gray-100)!important",
                  opacity: "0.6",
                },
              },
            ]}
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50, 100]}
          />
        </InfiniteScroll>
      ) : (
        <Box mt={2}>{t("traceability:no_records")}</Box>
      )}

      <BatchCreateModal update={onFarmerUpdate} />
    </Box>
  );
}

export default FarmerListPageComponent;
