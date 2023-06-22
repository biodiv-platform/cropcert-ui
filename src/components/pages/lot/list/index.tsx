import { Box, Skeleton, Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { createLotColumns, lotColumns } from "./data";
import LotExpand from "./expand";
import LotReportUpdate from "./modals/lot-report-update";
import { useLotStore } from "./use-lot-store";

//TODO: function LotListPageComponent({ unions })

function LotListPageComponent() {
  const lotStore = useLotStore();

  const handleLoadMore = () => lotStore.listLot({ ccCodes: [6, 7, 4, 2, 3, 8, 71] });

  useEffect(() => {
    lotStore.listLot({ ccCodes: [6, 7, 4, 2, 3, 8, 71], reset: true });
  }, []);

  useEffect(() => {
    lotStore.listLot({ ccCodes: [6, 7, 4, 2, 3, 8, 71], reset: true });
  }, [lotStore.state.lot]);

  // Generate dynamic batchColumns based on state.batch
  const lotExtraColumns =
    lotStore.state.lot && lotStore.state.lot.length > 0
      ? createLotColumns(lotStore.state.lot[0])
      : [];

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
      <Box my={2}>{`Total Records: ${lotStore.state.lot.length}`}</Box>

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
            customStyles={{
              cells: {
                style: {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
              },
            }}
            expandableRowsComponent={LotExpand}
          />
        </InfiniteScroll>
      )}
      <LotReportUpdate update={lotStore.updateLot} />
    </Container>
  );
}

export default LotListPageComponent;
