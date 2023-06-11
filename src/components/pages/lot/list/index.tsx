import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import Container from "@components/@core/container";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { ROLES } from "@static/constants";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { lotColumns, createLotColumns } from "./data";
import LotExpand from "./expand";
import LotCoDispatchModal from "./modals/lot-co-dispatch-modal";
import CuppingReportModal from "./modals/lot-cupping-report";
import LotFactoryDispatchModal from "./modals/lot-factory-dispatch-modal";
import FactoryReportDry from "./modals/lot-factory-report/factory-report-dry";
import FactoryReportWet from "./modals/lot-factory-report/factory-report-wet";
import GreenReportModal from "./modals/lot-green-report";
import LotGRNModal from "./modals/lot-grn-modal";
import LotReportUpdate from "./modals/lot-report-update";
import { useLotStore } from "./use-lot-store";

function LotListPageComponent({ unions }) {
  const [union, setUnion] = useState({} as any);
  const [coCodes, setCoCodes] = useState<any>([]);
  const lotStore = useLotStore();

  const handleLoadMore = () => lotStore.listLot({ ccCodes: coCodes });

  useEffect(() => {
    console.log("cocodes", coCodes);
    coCodes.length && lotStore.listLot({ ccCodes: coCodes, reset: true });

    coCodes.length && console.log(Array.isArray(lotStore.state.lot));
  }, [coCodes]);

  console.log("list of unions");
  console.log(unions);

  console.log("list of lots");
  // Generate dynamic batchColumns based on state.batch
  const lotExtraColumns = createLotColumns(lotStore.state);

  return (
    <Container>
      <PageHeading>📦 Lot(s)</PageHeading>
      <CoreGrid>
        <Accesser toRole={ROLES.UNION} onChange={setUnion} onTouch={lotStore.clearLot} />
        <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />
      </CoreGrid>
      {coCodes.length > 0 && lotStore.state.lot.length > 0 && (
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

      <LotCoDispatchModal update={lotStore.updateLot} />
      <LotFactoryDispatchModal unions={unions} update={lotStore.updateLot} />
      <FactoryReportDry update={lotStore.updateLot} />
      <FactoryReportWet update={lotStore.updateLot} />
      <GreenReportModal update={lotStore.updateLot} />
      <CuppingReportModal update={lotStore.updateLot} />
      <LotGRNModal update={lotStore.updateLot} />
      <LotReportUpdate update={lotStore.updateLot} />
    </Container>
  );
}

export default LotListPageComponent;
