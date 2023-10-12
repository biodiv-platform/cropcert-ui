import { Box, Spinner } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import Container from "@components/@core/container";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetColumns } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { createLotColumns, lotColumns } from "./data";
import LotExpand from "./expand";
import LotReportUpdate from "./modals/lot-report-update";
import { useLotStore } from "./use-lot-store";

//TODO: function LotListPageComponent({ unions })

function LotListPageComponent() {
  const [union, setUnion] = useState({} as any);
  const [coCodes, setCoCodes] = useState<any>([]);
  const { state, ...actions } = useLotStore();
  const [lotModalColumns, setLotModalColumns] = useState<any>([]);

  const handleLoadMore = () => actions.listLot({ ccCodes: coCodes });

  useEffect(() => {
    coCodes.length && actions.listLot({ ccCodes: coCodes, reset: true });
  }, [coCodes]);

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("LOT");
      setLotModalColumns(columns.data);
    })();
  }, []);

  // Generate dynamic batchColumns based on state.batch
  const lotExtraColumns = lotModalColumns.length > 0 ? createLotColumns(lotModalColumns) : [];

  return (
    <Container>
      <PageHeading>📦 Lot(s)</PageHeading>
      <Box my={2}>Total Records: {state.isLoading ? <Spinner size="xs" /> : state.lot.length}</Box>

      <CoreGrid>
        <Accesser
          toRole={ROLES.UNION}
          onChange={setUnion}
          onTouch={() => {
            actions.clearLot();
            actions.setLoading(true);
          }}
        />
        <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />
      </CoreGrid>

      {state.isLoading ? (
        <Spinner />
      ) : state.lot.length > 0 ? (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
          <Table
            data={state.lot}
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
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
          />
        </InfiniteScroll>
      ) : (
        <Box mt={2}>No records found</Box>
      )}
      <LotReportUpdate update={actions.updateLot} />
    </Container>
  );
}

export default LotListPageComponent;
