import { Box, Group, Spinner, Text } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetColumns, axGetDataInCSV } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { DownloadButtonWithTooltip } from "@/components/@core/action-buttons/DownloadButtonWithTooltip";
import useGlobalState from "@/hooks/use-global-state";
import { Container } from "@/interfaces/traceability";
import { hasAccess } from "@/utils/auth";
import { getCurrentTimestamp } from "@/utils/basic";
import { sendFileFromResponse } from "@/utils/download";
import notification, { NotificationType } from "@/utils/notification";

import { useTraceability } from "../../common/traceability-tabs";
import { containerColumns, createContainerColumns } from "./data";
import ContainerExpand from "./expand";
import ContainerReportUpdate from "./modals/container-report-update";
import useContainerFilter from "./use-container-filter";

function ContainerComponent() {
  const { user, union, setUnion } = useGlobalState();
  const [containerExtraColumns, setContainerExtraColumns] = useState<any>([]);
  const [selectedContainers, setSelectedContainers] = useState<Container[]>([]);
  const [clearRows, setClearRows] = useState(false);
  const { t } = useTranslation();
  const { setReRenderTabs } = useTraceability();

  const {
    clearContainer,
    setCOCodes,
    containerListData,
    loading,
    updateContainer,
    page,
    perPage,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
  } = useContainerFilter();

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("CONTAINER");
      columns.data.length > 0 && setContainerExtraColumns(createContainerColumns(columns.data));
    })();
  }, []);

  const [visibleColumns, setVisibleColumns] = useState(
    [...containerColumns, ...containerExtraColumns].filter((col) => col.showDefault)
  );

  useEffect(() => {
    containerExtraColumns.length > 0 &&
      setVisibleColumns(
        [...containerColumns, ...containerExtraColumns].filter((col) => col.showDefault)
      );
  }, [containerExtraColumns]);

  useEffect(() => {
    setReRenderTabs && setReRenderTabs((prev) => !prev);
  }, [union]);

  const handleOnSelectionChange = ({ selectedRows }) => {
    setSelectedContainers(selectedRows);
  };

  const handleOnDownloadData = async () => {
    const selectedContainerIds = selectedContainers.map((r) => r._id);

    if (selectedContainerIds.length === 0) {
      notification(t("traceability:download.no_records_selected"), NotificationType.Warning);
      return;
    }

    const response = await axGetDataInCSV("container", selectedContainerIds);

    if (response.success) {
      sendFileFromResponse(response.data, `container_${getCurrentTimestamp()}.csv`);
    } else {
      notification(t("traceability:download.download_error"), NotificationType.Error);
    }

    setClearRows(true);
    setSelectedContainers([]);
  };

  const ActionButtons = () => {
    const { quantity, amount } = selectedContainers.reduce(
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
          paddingX="6px"
          paddingY="3px"
          rounded={"md"}
          hidden={
            selectedContainers.length === 0 ||
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
        <DownloadButtonWithTooltip
          variant="surface"
          disabled={
            selectedContainers.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
          }
          onClick={handleOnDownloadData}
        />
      </Group>
    );
  };

  return (
    <>
      <PageHeading actions={<ActionButtons />}>
        🏗️ {t("traceability:tab_titles.container")}
      </PageHeading>
      <Box mt={2}>
        {t("traceability:total_records")}:{" "}
        {loading ? <Spinner size="xs" /> : containerListData?.length}
      </Box>

      <CoreGrid>
        <Accesser
          toRole={ROLES.UNION}
          onChange={setUnion}
          onTouch={() => {
            clearContainer();
          }}
        />
        <CoMultiSelect unionId={union?.code} onChange={setCOCodes} />
      </CoreGrid>

      {loading ? (
        <Spinner />
      ) : containerListData?.length > 0 ? (
        <Table
          data={containerListData}
          columns={visibleColumns}
          expandableRows={true}
          selectableRows={true}
          onSelectedRowsChange={handleOnSelectionChange}
          clearSelectedRows={clearRows}
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
          expandableRowsComponent={ContainerExpand}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          paginationDefaultPage={page}
          paginationRowsPerPageOptions={
            totalRows > 10000
              ? [10, 20, 50, 100, 10000, Number(totalRows)]
              : [10, 20, 50, 100, 10000]
          }
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          fixedHeader
          fixedHeaderScrollHeight="570px"
          showManageColumnDropdown={true}
          setVisibleColumns={setVisibleColumns}
          allColumns={[...containerColumns, ...containerExtraColumns]}
        />
      ) : (
        <Box mt={2} minHeight={"300px"}>
          {t("traceability:no_records")}
        </Box>
      )}

      <ContainerReportUpdate update={updateContainer} />
    </>
  );
}

export default ContainerComponent;
