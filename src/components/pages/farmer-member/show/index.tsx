import { Accordion } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import React from "react";

import FarmerBatches from "./farmer-batches";
import FarmerInfo from "./farmer-info";
import FarmerLots from "./farmer-lots";
import FarmerProduce from "./farmer-produce";

interface IFarmerShowProps {
  lots: any[];
  batches: any[];
  farmerProduces: any[];
  farmer: any; //TODO: add farmer interface
}

export default function FarmerShowPageComponent({ show }: { show: IFarmerShowProps }) {
  return (
    show?.farmer && (
      <Container>
        <PageHeading>🧑‍🌾 {show.farmer.personalDetails.farmer_name}</PageHeading>
        <Accordion defaultIndex={[0]} allowMultiple>
          <FarmerInfo farmer={show.farmer} />
          {show.farmerProduces && <FarmerProduce rows={show.farmerProduces} />}
          {show.batches && <FarmerBatches rows={show.batches} />}
          {show.lots && <FarmerLots rows={show.lots} />}
        </Accordion>
      </Container>
    )
  );
}
