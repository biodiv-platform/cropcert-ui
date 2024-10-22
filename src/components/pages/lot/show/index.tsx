import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Button } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { CC_COLOR_MAPPING } from "@static/constants";
import { useRouter } from "next/router";
import React from "react";

import LotActivity from "./lot-activity";
import LotBatches from "./lot-batches";
import LotFarmerMember from "./lot-farmerMember";
import LotFarmerProduce from "./lot-farmerProduce";
import LotInfo from "./lot-info";

interface ILotShowProps {
  lot: Lot;
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: any[];
  batches: any[];
  farmerProduceArr: any[];
  farmerLocationArr: any[];
  farmerArr: any[];
  activityArr: any[];
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

  const geojsonData = show.farmerLocationArr?.map((loc) => ({
    ...loc,
    properties: {
      ...loc.properties,
      color: CC_COLOR_MAPPING[loc.properties.cc],
    },
  }));

  return (
    <Container>
      <PageHeading actions={<ActionButtons />}>📦 {show.lot.lotName}</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <LotInfo lot={show.lot} geojsonData={geojsonData} />
        {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceArr && <LotFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <LotFarmerMember rows={show.farmerArr} />}
        {show.activityArr && <LotActivity rows={show.activityArr} />}
      </Accordion>
    </Container>
  );
}
