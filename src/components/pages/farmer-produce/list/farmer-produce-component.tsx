import { Box, Button, Flex, Group, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import LastSyncTime from "@components/traceability/lastSyncTime";
import { NextSyncCounter } from "@components/traceability/nextSyncCounter";
import useGlobalState from "@hooks/use-global-state";
import AddIcon from "@icons/add";
import { FarmerProduce } from "@interfaces/traceability";
import { axSyncFPDataOnDemand } from "@services/farmer.service";
import { ROLES } from "@static/constants";
import { BATCH_CREATE } from "@static/events";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import { LuRepeat } from "react-icons/lu";

import { DownloadButtonWithTooltip } from "@/components/@core/action-buttons/DownloadButtonWithTooltip";
import { axGetDataInCSV } from "@/services/traceability.service";
import { getCurrentTimestamp } from "@/utils/basic";
import { sendFileFromResponse } from "@/utils/download";

import { useTraceability } from "../../common/traceability-tabs";
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
  const [selectedFarmerProduce, setSelectedFarmerProduce] = useState<Required<FarmerProduce>[]>([]);
  const { open: clearRows, onToggle } = useDisclosure();
  const { t } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);
  const { setReRenderTabs } = useTraceability();

  const [visibleColumns, setVisibleColumns] = useState(
    farmerProduceColumns.filter((col) => col.showDefault)
  );

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

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
      setReRenderTabs && setReRenderTabs((prevState) => !prevState);
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

  const handleOnDownloadData = async () => {
    const selectedProduceIds = selectedFarmerProduce.map((r) => r._id);

    if (selectedProduceIds.length === 0) {
      notification(t("traceability:download.no_records_selected"), NotificationType.Warning);
      return;
    }

    const response = await axGetDataInCSV("produce", selectedProduceIds);

    if (response.success) {
      sendFileFromResponse(response.data, `produce_${getCurrentTimestamp()}.csv`);
    } else {
      notification(t("traceability:download.download_error"), NotificationType.Error);
    }

    setSelectedFarmerProduce([]);
  };

  const ActionButtons = () => {
    const quantity = selectedFarmerProduce.reduce(
      (acc, cv) => selectedFarmerProduce.length && cv.quantity + acc,
      0
    );
    return (
      <Group display={"flex"} flexWrap={"wrap"} gap={4}>
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
          colorPalette="green"
          variant="solid"
          onClick={handleOnCreateBatch}
          disabled={
            showTypeError ||
            selectedFarmerProduce.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
        >
          {<AddIcon />}
          Create Batch
        </Button>
        <Button
          variant="surface"
          onClick={handleSyncData}
          disabled={showTypeError || isSyncing || !hasAccess([ROLES.ADMIN, ROLES.UNION], user)}
        >
          {isSyncing ? <Spinner size="xs" /> : <LuRepeat />}
          {isSyncing
            ? t("traceability:sync_status.syncing")
            : t("traceability:sync_status.sync_now")}
        </Button>
        <DownloadButtonWithTooltip
          variant="surface"
          disabled={
            showTypeError ||
            selectedFarmerProduce.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
          }
          onClick={handleOnDownloadData}
        />
      </Group>
    );
  };

  const onFarmerUpdate = () => {
    onToggle();
    updateFarmerProduce();
    setReRenderTabs && setReRenderTabs((prevState) => !prevState);
  };

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>
        🚜 {t("traceability:tab_titles.farmer_produce")}
      </PageHeading>
      <Flex justifyContent={"space-between"} alignItems={"center"} wrap={"wrap"}>
        <Box mt={2}>
          {t("traceability:total_records")}:{" "}
          {loading ? <Spinner size="xs" /> : farmerProduceListData?.length}
        </Box>
        <Box
          fontSize={"xs"}
          visibility={union?.code ? "visible" : "hidden"}
          display={"flex"}
          gap={2}
        >
          <LastSyncTime type={"FP"} isSyncing={isSyncing} /> |{" "}
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
          columns={visibleColumns}
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
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 40, 60, 100]}
          fixedHeader
          fixedHeaderScrollHeight={`calc(100vh - var(--table-gap, 255px))`}
          showManageColumnDropdown={true}
          setVisibleColumns={setVisibleColumns}
          allColumns={farmerProduceColumns}
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
