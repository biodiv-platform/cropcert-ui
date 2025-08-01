import { Box, Button, Group, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import AddIcon from "@icons/add";
import { axGetColumns, axGetDataInCSV } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import { CONTAINER_CREATE } from "@static/events";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";

import { DownloadButtonWithTooltip } from "@/components/@core/action-buttons/DownloadButtonWithTooltip";
import useGlobalState from "@/hooks/use-global-state";
import { hasAccess } from "@/utils/auth";
import { getCurrentTimestamp } from "@/utils/basic";
import { sendFileFromResponse } from "@/utils/download";
import notification, { NotificationType } from "@/utils/notification";

import { useTraceability } from "../../common/traceability-tabs";
import { createLotColumns, lotColumns } from "./data";
import LotExpand from "./expand";
import ContainerCreateModal from "./modals/container-create-modal";
import LotReportUpdate from "./modals/lot-report-update";
import MultipleTypeWarning from "./multiple-warning";
import useLotFilter from "./use-lot-filter";

function LotComponent() {
  const { user, union, setUnion } = useGlobalState();
  const [lotExtraColumns, setLotExtraColumns] = useState<any>([]);
  const { t } = useTranslation();
  const { open: clearRows, onToggle } = useDisclosure();
  const [triggerRender, setTriggerRender] = useState(false);
  const [selectedLots, setSelectedLots] = useState<any>([]);
  const {
    clearLot,
    setCOCodes,
    lotListData,
    loading,
    updateLot,
    page,
    perPage,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
  } = useLotFilter();
  const { setReRenderTabs } = useTraceability();
  const [showTypeError, setShowTypeError] = useState(false);

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("LOT");
      columns.data.length > 0 && setLotExtraColumns(createLotColumns(columns.data));
    })();
  }, []);

  const [visibleColumns, setVisibleColumns] = useState(
    [...lotColumns, ...lotExtraColumns].filter((col) => col.showDefault)
  );

  useEffect(() => {
    lotExtraColumns.length > 0 &&
      setVisibleColumns([...lotColumns, ...lotExtraColumns].filter((col) => col.showDefault));
  }, [lotExtraColumns]);

  useEffect(() => {
    setReRenderTabs && setReRenderTabs((prev) => !prev);
  }, [union]);

  const handleOnSelectionChange = ({ selectedRows }) => {
    setSelectedLots(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleOnCreateContainer = () => {
    const prefix = selectedLots[0].lotName.split("_")[0];
    const quantity = selectedLots.reduce((acc, cv) => selectedLots.length && cv.quantity + acc, 0);

    const payload = {
      name: `${prefix}_${selectedLots[0].type.charAt(0).toUpperCase()}`,
      selected: selectedLots,
      coCode: [...new Set(selectedLots.map((r) => r.coCode))].flat(),
      unionCode: union?.code,
      type: selectedLots[0].type,
      quantity,
    };

    emit(CONTAINER_CREATE, payload);
    setTriggerRender(!triggerRender);
    setReRenderTabs && setReRenderTabs((prevState) => !prevState);
  };

  const onLotUpdate = () => {
    onToggle();
    updateLot();
    setTriggerRender(!triggerRender);
    setReRenderTabs && setReRenderTabs((prevState) => !prevState);
  };

  const handleOnDownloadData = async () => {
    const selectedLotIds = selectedLots.map((r) => r._id);

    if (selectedLotIds.length === 0) {
      notification(t("traceability:download.no_records_selected"), NotificationType.Warning);
      return;
    }

    const response = await axGetDataInCSV("lot", selectedLotIds);

    if (response.success) {
      sendFileFromResponse(response.data, `lot_${getCurrentTimestamp()}.csv`);
    } else {
      notification(t("traceability:download.download_error"), NotificationType.Error);
    }

    setSelectedLots([]);
  };

  const ActionButtons = () => {
    const { quantity, amount } = selectedLots.reduce(
      (acc, { quantity = 0, amountPaidCalculate }) => ({
        quantity: acc.quantity + quantity,
        amount:
          acc.amount === null || amountPaidCalculate === null
            ? null
            : acc.amount + (amountPaidCalculate || 0),
      }),
      { quantity: 0, amount: 0 as number | null }
    );

    return (
      <Group display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={4}>
        <Box
          display="flex"
          flexDirection="column"
          fontSize={"xs"}
          borderWidth="1px"
          backgroundColor={"gray.50"}
          paddingX="8px"
          paddingY="2px"
          rounded={"md"}
          hidden={
            showTypeError ||
            selectedLots.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
        >
          <Box fontWeight={"semibold"}>Stock Card</Box>
          <Box display={"flex"} gap={1}>
            <Text display={"flex"} alignItems={"center"} gap={1}>
              {t("traceability:selected_quantity")}: {quantity}(Kgs)
            </Text>
            <Text>|</Text>
            <Text display={"flex"} alignItems={"center"} gap={1}>
              {t("traceability:amount_paid")}: {amount !== null ? `Ugx ${amount}` : "N/A"}
            </Text>
          </Box>
        </Box>
        <Button
          colorPalette="green"
          variant="solid"
          disabled={
            showTypeError ||
            selectedLots.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
          }
          onClick={handleOnCreateContainer}
        >
          {<AddIcon />} Create Container
        </Button>
        <DownloadButtonWithTooltip
          variant="surface"
          disabled={
            selectedLots.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
          }
          onClick={handleOnDownloadData}
        />
      </Group>
    );
  };

  return (
    <>
      <PageHeading actions={<ActionButtons />}>📦 {t("traceability:tab_titles.lot")}</PageHeading>
      <Box mt={2}>
        {t("traceability:total_records")}: {loading ? <Spinner size="xs" /> : lotListData?.length}
      </Box>

      <CoreGrid>
        <Accesser
          toRole={ROLES.UNION}
          onChange={setUnion}
          onTouch={() => {
            clearLot();
          }}
        />
        <CoMultiSelect unionId={union?.code} onChange={setCOCodes} />
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {loading ? (
        <Spinner />
      ) : lotListData?.length > 0 ? (
        <Table
          data={lotListData}
          columns={visibleColumns}
          expandableRows={true}
          defaultSortFieldId={1}
          defaultSortAsc={false}
          customStyles={{
            cells: {
              style: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
          }}
          conditionalRowStyles={[
            {
              when: (row) => row.lotCategory === "lot",
              style: {
                borderLeft: "2px solid var(--chakra-colors-gray-500)",
              },
            },
            {
              when: (row) => row.lotCategory === "sub_lot",
              style: {
                borderLeft: "2px solid var(--chakra-colors-green-500)",
              },
            },
            {
              when: (row) => row.lotCategory === "remaining_lot",
              style: {
                borderLeft: "2px solid var(--chakra-colors-yellow-500)",
              },
            },
          ]}
          expandableRowsComponent={LotExpand}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          paginationDefaultPage={page}
          paginationRowsPerPageOptions={
            totalRows > 100 ? [10, 20, 50, 100, Number(totalRows)] : [10, 20, 50, 100]
          }
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          fixedHeader
          fixedHeaderScrollHeight={`calc(100vh - var(--table-gap, 260px))`}
          showManageColumnDropdown={true}
          setVisibleColumns={setVisibleColumns}
          allColumns={[...lotColumns, ...lotExtraColumns]}
          selectableRows={true}
          onSelectedRowsChange={handleOnSelectionChange}
          clearSelectedRows={clearRows}
          selectableRowDisabled={(r) => r.containerId || r.isSubLotCreated}
        />
      ) : (
        <Box mt={2} minHeight={"300px"}>
          {t("traceability:no_records")}
        </Box>
      )}
      <LotReportUpdate update={updateLot} />
      <ContainerCreateModal update={onLotUpdate} />
    </>
  );
}

export default LotComponent;
