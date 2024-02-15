import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Button } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { Activity, Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { useRouter } from "next/router";
import React from "react";

import LotBatches from "./lot-batches";
import LotFarmerProduce from "./lot-farmerProduce";
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
  const router = useRouter();

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.back();
  };

  const ActionButtons = () => {
    return (
      <Button
        onClick={handleGoBack}
        leftIcon={<ArrowBackIcon />}
        variant="solid"
        rounded="md"
        colorScheme="gray"
      >
        Back to List
      </Button>
    );
  };

  return (
    <Container>
      <PageHeading actions={<ActionButtons />}>📦 {show.lot.lotName}</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <LotInfo lot={show.lot} />
        {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceIds && <LotFarmerProduce rows={show.farmerProduceIds} />}
      </Accordion>
    </Container>
  );
}
