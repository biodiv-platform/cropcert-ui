import { Box, Skeleton, Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
  const lotStore = useLotStore();
  const [lotModalColumns, setLotModalColumns] = useState<any>([]);

  const handleLoadMore = () => lotStore.listLot({ ccCodes: coCodes });

  useEffect(() => {
    coCodes.length && lotStore.listLot({ ccCodes: coCodes, reset: true });
  }, [coCodes]);

  useEffect(() => {
    (async () => {
      const columns = await axGetColumns("LOT");
      setLotModalColumns(columns.data);
    })();
  }, []);

  // Generate dynamic batchColumns based on state.batch
  const lotExtraColumns = lotModalColumns.length > 0 ? createLotColumns(lotModalColumns) : [];

  const loadingColumns = Array.from({ length: 5 }).map((_, index) => (
    <Th key={index}>
      <Skeleton height="20px" startColor="gray.200" endColor="gray.400" />
    </Th>
  ));

  const loadingRows = Array.from({ length: 5 }).map((_, index) => (
    <Tr key={index}>
      {loadingColumns.map((cell, cellIndex) => (
        <Td key={cellIndex}>
          <Skeleton height="20px" startColor="gray.200" endColor="gray.400" />
        </Td>
      ))}
    </Tr>
  ));
  return (
    <Container>
      <PageHeading>📦 Lot(s)</PageHeading>
      <Box my={2}>{`Total Records: ${
        lotStore.state.isLoading ? "Loading..." : lotStore.state.lot.length
      }`}</Box>

      <CoreGrid>
        <Accesser toRole={ROLES.UNION} onChange={setUnion} onTouch={lotStore.clearLot} />
        <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />
      </CoreGrid>

      {lotStore.state.isLoading && (
        <ChakraTable variant="simple">
          <Thead>
            <Tr>{loadingColumns}</Tr>
          </Thead>
          <Tbody>{loadingRows}</Tbody>
        </ChakraTable>
      )}

      {lotStore.state.lot.length > 0 && (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={lotStore.state.hasMore}>
          <Table
            data={lotStore.state.lot}
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
      )}
      <LotReportUpdate update={lotStore.updateLot} />
    </Container>
  );
}

export default LotListPageComponent;
