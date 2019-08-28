import { Timeline } from "@components/lot/show/timeline";
import { axGetLotById } from "@services/lot.service";
import React, { useEffect, useState } from "react";

import LotBatches from "./lot-batches";
import LotCuppingReport from "./lot-cupping";
import LotGreenReport from "./lot-green";
import LotInfo from "./lot-info";
import LotName from "./lot-name";

export default function LotShow({ lotId = -1 }) {
  const [lot, setLot] = useState({ success: false, data: {} as any });

  useEffect(() => {
    axGetLotById(lotId).then(setLot);
  }, [lotId]);

  return lot.success ? (
    <>
      <LotName name={lot.data.lot.lotName} status={lot.data.lot.lotStatus} />
      <LotInfo lot={lot.data.lot} />
      <LotBatches lotId={lotId} batchType={lot.data.lot.type} />
      <LotGreenReport reports={lot.data.quality_report} />
      <LotCuppingReport reports={lot.data.cupping_report} />
      <Timeline activities={lot.data.activities} />
    </>
  ) : (
    <>...</>
  );
}
