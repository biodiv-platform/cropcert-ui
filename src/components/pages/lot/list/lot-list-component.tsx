import { Box, Spinner } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetColumns } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { createLotColumns, lotColumns } from "./data";
import LotExpand from "./expand";
import LotReportUpdate from "./modals/lot-report-update";
import useLotFilter from "./use-lot-filter";

function LotComponent() {
  const [union, setUnion] = useState({} as any);
  const [lotModalColumns, setLotModalColumns] = useState<any>([]);
  const { t } = useTranslation();

  const { clearLot, setCOCodes, lotListData, loading, updateLot } = useLotFilter();

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("LOT");
      setLotModalColumns(columns.data);
    })();
  }, []);

  // Generate dynamic batchColumns based on state.batch
  const lotExtraColumns = lotModalColumns.length > 0 ? createLotColumns(lotModalColumns) : [];

  return (
    <>
      <PageHeading>📦 {t("traceability:tab_titles.lot")}</PageHeading>
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
        <CoMultiSelect unionId={union?.value} onChange={setCOCodes} />
      </CoreGrid>

      {loading ? (
        <Spinner />
      ) : lotListData?.length > 0 ? (
        <Table
          data={lotListData}
          columns={[...lotColumns, ...lotExtraColumns]}
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
          fixedHeaderScrollHeight="570px"
          showFooter={false}
        />
      ) : (
        <Box mt={2} minHeight={"300px"}>
          {t("traceability:no_records")}
        </Box>
      )}
      <LotReportUpdate update={updateLot} />
    </>
  );
}

export default LotComponent;
