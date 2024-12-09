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
import { formatTimeDifference } from "@utils/date";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";

import { farmerProduceColumns } from "./data";
import BatchCreateModal from "./modals/batch-create-modal";
import MultipleTypeWarning from "./multiple-warning";
import useFarmerProduceFilter from "./use-farmer-produce-filter";

function FarmerProduceListComponent() {
  const [co, setCo] = useState({} as any);
  const [ccs, setCCs] = useState([] as any);

  const { clearFarmerProduce, setCCCodes, farmerProduceListData, loading, updateFarmerProduce } =
    useFarmerProduceFilter();

  const { user, union } = useGlobalState();
  const [showTypeError, setShowTypeError] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const [selectedFarmerProduce, setSelectedFarmerProduce] = useState<Required<FarmerProduce>[]>([]);
  const { isOpen: clearRows, onToggle } = useDisclosure();
  const { t } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const { data } = useQuery({
    queryKey: ["lastSyncedTimeFP"],
    queryFn: () => axGetLastSyncedTimeFP(union?.value),
    enabled: !!union?.value,
    refetchInterval: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setTimeString(formatTimeDifference(data?.data));
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [data?.data]);

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
    const batchTypeArr = [...new Set(selectedFarmerProduce.map((r) => r.produceType))];

    // checking if multiple types are selected
    if (batchTypeArr.length === 2) return setShowTypeError(true);
    else {
      const quantity = selectedFarmerProduce.reduce(
        (acc, cv) => selectedFarmerProduce.length && cv.quantity + acc,
        0
      );

      const payload = {
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
      await axSyncFPDataOnDemand(user?.unionCode);
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
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
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

  const onFarmerUpdate = () => {
    onToggle();
    updateFarmerProduce();
  };

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>
        🚜 {t("traceability:tab_titles.farmer_produce")}
      </PageHeading>
      <Flex justifyContent={"space-between"} alignItems={"center"} wrap={"wrap"}>
        <Box my={2}>
          {t("traceability:total_records")}:{" "}
          {loading ? <Spinner size="xs" /> : farmerProduceListData?.length}
        </Box>
        <Box fontSize={"xs"} visibility={data && union?.value ? "visible" : "hidden"}>
          {t("traceability:sync_status.last_synced")} {timeString} |{" "}
          <NextSyncCounter syncIntervalHours={60} />
        </Box>
      </Flex>

      <CoreGrid hidden={false}>
        <Accesser
          toRole={ROLES.COOPERATIVE}
          onChange={setCo}
          onTouch={() => {
            clearFarmerProduce();
          }}
        />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {loading ? (
        <Spinner />
      ) : farmerProduceListData?.length > 0 ? (
        <Table
          data={farmerProduceListData}
          columns={farmerProduceColumns}
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
      ) : (
        <Box mt={2} minHeight={"300px"}>
          {t("traceability:no_records")}
        </Box>
      )}

      <BatchCreateModal update={onFarmerUpdate} />
    </Box>
  );
}

export default FarmerProduceListComponent;
