import { Box, Button, Group, Spinner } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetColumns, axGetDataInCSV } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { LuDownload } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";
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

  const { clearContainer, setCOCodes, containerListData, loading, updateContainer } =
    useContainerFilter();

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
    try {
      const selectedContainerIds = selectedContainers.map((r) => r._id);
      if (selectedContainerIds.length === 0) {
        return notification(
          t("traceability:download.no_records_selected"),
          NotificationType.Warning
        );
      }
      const response = await axGetDataInCSV("container", selectedContainerIds);
      if (response.success) {
        sendFileFromResponse(response.data, `container_${getCurrentTimestamp()}.csv`);
      }
    } catch (error) {
      notification(t("traceability:download.download_error"), NotificationType.Error);
    } finally {
      setClearRows(true);
      setSelectedContainers([]);
    }
  };

  const ActionButtons = () => (
    <Group gap={4}>
      <Tooltip content={t("traceability:download.download_data")}>
        <Button
          colorPalette="gray"
          variant="surface"
          disabled={
            selectedContainers.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)
          }
          onClick={handleOnDownloadData}
        >
          <LuDownload />
        </Button>
      </Tooltip>
    </Group>
  );

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
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 40, 60, 100]}
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
