import { Accordion } from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import React from "react";
import { Activity, Cupping, Lot, QualityReport } from "types/traceability";
import { User } from "types/user";

import LotBatches from "./lot-batches";
import LotCuppingReport from "./lot-cupping";
import LotGreenReport from "./lot-green";
import LotInfo from "./lot-info";
import { Timeline } from "./timeline";

interface ILotShowProps {
  lot: Lot;
  activities: Activity[];
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: User[];
}

export default function LotShowPageComponent({ show }: { show: ILotShowProps }) {
  return (
    <div>
      <PageHeading>📦 {show.lot.lotName}</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <LotInfo lot={show.lot} />
        <LotBatches lotId={show.lot.id} />
        <LotGreenReport reports={show.quality_report} />
        <LotCuppingReport reports={show.cupping_report} />
        <Timeline activities={show.activities} />
      </Accordion>
    </div>
  );
}
