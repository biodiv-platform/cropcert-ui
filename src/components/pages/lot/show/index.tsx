import { AccordionRoot, Button } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE } from "@static/constants";
import { generateBackBtnStr } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

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
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Lot List");

  if (!previousPath) {
    setPreviousPath("/traceability/lot");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const ActionButtons = () => {
    return (
      <Button onClick={handleGoBack} variant="solid" rounded="md" colorScheme="gray">
        <LuArrowLeft />
        {backButtonText}
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
      <AccordionRoot defaultValue={["Information"]} multiple>
        <LotInfo lot={show.lot} geojsonData={geojsonData} />
        {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceArr && <LotFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <LotFarmerMember rows={show.farmerArr} />}
        <Activity resourceId={show.lot.id} resourceType={RESOURCE_TYPE.LOT} />
      </AccordionRoot>
    </Container>
  );
}
