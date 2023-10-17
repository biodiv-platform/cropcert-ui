import { Accordion } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { Activity, Cupping, Lot, QualityReport } from "@interfaces/traceability";
import React from "react";

import FarmerInfo from "./farmer-info";
import LotBatches from "./lot-batches";
import LotFarmerProduce from "./lot-farmeProduce";

interface ILotShowProps {
  lot: Lot;
  activities: Activity[];
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: any[];
  batches: any[];
  farmerProduceIds: any[];
  farmer: any; //TODO: add farmer interface
}

export default function LotShowPageComponent({ show }: { show: ILotShowProps }) {
  return (
    <Container>
      <PageHeading>📦 {show.farmer.personalDetails.farmer_name}</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <FarmerInfo farmer={show.farmer} />
        {/* {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceIds && <LotFarmerProduce rows={show.farmerProduceIds} />} */}
      </Accordion>
    </Container>
  );
}
