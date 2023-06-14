import { Accordion } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { Activity, Cupping, Lot, QualityReport } from "@interfaces/traceability";
import React from "react";

import LotBatches from "./lot-batches";
import LotFarmerProduce from "./lot-farmeProduce";
import LotInfo from "./lot-info";

interface ILotShowProps {
  lot: Lot;
  activities: Activity[];
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: any[];
  batches: any[];
  farmerProduceIds: any[];
}

export default function LotShowPageComponent({ show }: { show: ILotShowProps }) {
  return (
    <Container>
      <PageHeading>📦 {show.lot.lotName}</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <LotInfo lot={show.lot} />
        {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceIds && <LotFarmerProduce rows={show.farmerProduceIds} />}
        {/* <LotGreenReport reports={show.quality_report} />
        <LotCuppingReport reports={show.cupping_report} /> */}
        {/* <Timeline activities={show.activities} /> */}
      </Accordion>
    </Container>
  );
}
