import { Box, Button, Group, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import AddIcon from "@icons/add";
import { axGetColumns } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import { CONTAINER_CREATE } from "@static/events";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";

import useGlobalState from "@/hooks/use-global-state";

import { useTraceability } from "../../common/traceability-tabs";
import { createLotColumns, lotColumns } from "./data";
import LotExpand from "./expand";
import ContainerCreateModal from "./modals/container-create-modal";
import LotReportUpdate from "./modals/lot-report-update";
import useLotFilter from "./use-lot-filter";

function LotComponent() {
  const { union, setUnion } = useGlobalState();
  const [lotExtraColumns, setLotExtraColumns] = useState<any>([]);
  const { t } = useTranslation();
  const { open: clearRows, onToggle } = useDisclosure();
  const [triggerRender, setTriggerRender] = useState(false);
  const [selectedLots, setSelectedLots] = useState<any>([]);
  const { clearLot, setCOCodes, lotListData, loading, updateLot } = useLotFilter();
  const { setReRenderTabs } = useTraceability();

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
  };

  const handleOnCreateContainer = () => {
    const prefix = selectedLots[0].lotName.split("_")[0];
    const quantity = selectedLots.reduce((acc, cv) => selectedLots.length && cv.quantity + acc, 0);

    const payload = {
      name: `${prefix}_Container_`,
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

  const ActionButtons = () => (
    <Group gap={4}>
      <Button
        colorPalette="green"
        variant="solid"
        disabled={selectedLots.length === 0}
        onClick={handleOnCreateContainer}
      >
        {<AddIcon />} Create Container
      </Button>
    </Group>
  );

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
          expandableRowsComponent={LotExpand}
          pagination
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 40, 60, 100]}
          fixedHeader
          fixedHeaderScrollHeight={`calc(100vh - var(--table-gap, 255px))`}
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
