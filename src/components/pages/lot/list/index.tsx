import { Box } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { ROLES } from "@static/constants";
import { useLotStore } from "@stores/lot.store";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { lotColumns } from "./data";
import LotExpand from "./expand";
import LotCoDispatchModal from "./modals/lot-co-dispatch-modal";
import CuppingReportModal from "./modals/lot-cupping-report";
import LotFactoryDispatchModal from "./modals/lot-factory-dispatch-modal";
import FactoryReportDry from "./modals/lot-factory-report/factory-report-dry";
import FactoryReportWet from "./modals/lot-factory-report/factory-report-wet";
import GreenReportModal from "./modals/lot-green-report";
import LotGRNModal from "./modals/lot-grn-modal";

function LotListPageComponent({ unions }) {
  const [union, setUnion] = useState({} as any);
  const [coCodes, setCoCodes] = useState<any>([]);
  const [state, actions] = useLotStore();

  const handleLoadMore = () => {
    actions.listLot({ ccCodes: coCodes });
  };

  useEffect(() => {
    coCodes.length && actions.listLot({ ccCodes: coCodes, reset: true });
  }, [coCodes]);

  return (
    <Box>
      <PageHeading>📦 Lot(s)</PageHeading>
      <CoreGrid>
        <Accesser toRole={ROLES.UNION} onChange={setUnion} onTouch={actions.clearLot} />
        <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />
      </CoreGrid>
      {coCodes.length > 0 && state.lot.length > 0 && (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
          <Table
            data={state.lot}
            columns={lotColumns}
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

      <LotCoDispatchModal update={actions.updateLot} />
      <LotFactoryDispatchModal unions={unions} update={actions.updateLot} />
      <FactoryReportDry update={actions.updateLot} />
      <FactoryReportWet update={actions.updateLot} />
      <GreenReportModal update={actions.updateLot} />
      <CuppingReportModal update={actions.updateLot} />
      <LotGRNModal update={actions.updateLot} />
    </Box>
  );
}

export default LotListPageComponent;
