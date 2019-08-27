import { Timeline } from "@components/lot/show/timeline";
import { axGetLotById } from "@services/lot.service";
import { Tag } from "carbon-components-react";
import React, { useEffect, useState } from "react";

import BasicInfo from "./basic-info";
import LotBatches from "./batches";

export default function LotShow({ lotId = -1 }) {
  const [lot, setLot] = useState({ success: false, data: {} as any });

  useEffect(() => {
    axGetLotById(lotId).then(setLot);
  }, [lotId]);

  return lot.success ? (
    <>
      <h1 className="eco--title mb-0">
        Lot #{lot.data.lot.id}. {lot.data.lot.lotName}
        <Tag className="eco--tag-heading" type="cyan">
          {lot.data.lot.lotStatus}
        </Tag>
      </h1>
      <BasicInfo lot={lot.data.lot} />
      <LotBatches lotId={lotId} batchType={lot.data.lot.type} />
      <Timeline activities={lot.data.activities} />
    </>
  ) : (
    <>...</>
  );
}
