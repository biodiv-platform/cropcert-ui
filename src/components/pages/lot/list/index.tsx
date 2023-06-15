import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { createLotColumns, lotColumns } from "./data";
import LotExpand from "./expand";
import LotReportUpdate from "./modals/lot-report-update";
import { useLotStore } from "./use-lot-store";

//TODO: function LotListPageComponent({ unions })

function LotListPageComponent() {
  const [coCodes] = useState<any>([]);
  const lotStore = useLotStore();

  const handleLoadMore = () => lotStore.listLot({ ccCodes: [6, 7, 4, 2, 3, 8] });

  useEffect(() => {
    lotStore.listLot({ ccCodes: [6, 7, 4, 2, 3, 8], reset: true });
  }, []);

  useEffect(() => {
    coCodes.length;
  }, [lotStore.state.lot]);

  // Generate dynamic batchColumns based on state.batch
  const lotExtraColumns =
    lotStore.state.lot && lotStore.state.lot.length > 0
      ? createLotColumns(lotStore.state.lot[0])
      : [];

  return (
    <Container>
      <PageHeading>📦 Lot(s)</PageHeading>

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
