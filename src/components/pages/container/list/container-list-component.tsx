import { Box, Spinner } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetColumns } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { containerColumns, createContainerColumns } from "./data";
import ContainerExpand from "./expand";
// import ContainerReportUpdate from "./modals/container-report-update";
import useContainerFilter from "./use-container-filter";

function ContainerComponent() {
  const [union, setUnion] = useState({} as any);
  const [containerExtraColumns, setContainerExtraColumns] = useState<any>([]);
  const { t } = useTranslation();

  const { clearContainer, setCOCodes, containerListData, loading } = useContainerFilter();

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
  return (
    <>
      <PageHeading>🏗️ {t("traceability:tab_titles.container")}</PageHeading>
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
        <CoMultiSelect unionId={union?.value} onChange={setCOCodes} />
      </CoreGrid>

      {loading ? (
        <Spinner />
      ) : containerListData?.length > 0 ? (
        <Table
          data={containerListData}
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

      {/* <ContainerReportUpdate update={updateContainer} /> */}
    </>
  );
}

export default ContainerComponent;
