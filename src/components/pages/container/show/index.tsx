import { AccordionRoot, Button } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Container as ContainerType, Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE } from "@static/constants";
import { generateBackBtnStr } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

import ContainerBatches from "./container-batches";
import ContainerFarmerMember from "./container-farmerMember";
import ContainerFarmerProduce from "./container-farmerProduce";
import ContainerInfo from "./container-info";
import ContainerLots from "./container-lots";

interface IContainerShowProps {
  container: ContainerType;
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: any[];
  batches: any[];
  lotArr: Lot[];
  farmerProduceArr: any[];
  farmerLocationArr: any[];
  farmerArr: any[];
  activityArr: any[];
}

export default function ContainerShowPageComponent({ show }: { show: IContainerShowProps }) {
  const router = useRouter();
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Container List");

  if (!previousPath) {
    setPreviousPath("/traceability/container");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const ActionButtons = () => {
    return (
      <Button onClick={handleGoBack} variant="subtle" rounded="md" colorPalette="gray">
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
      <PageHeading actions={<ActionButtons />}>📦 {show.container.containerName}</PageHeading>
      <AccordionRoot defaultValue={["Information", "activity"]} multiple pb={4} spaceY="4">
        <ContainerInfo container={show.container} geojsonData={geojsonData} />
        {show.lotArr && <ContainerLots rows={show.lotArr} />}
        {show.batches && <ContainerBatches rows={show.batches} />}
        {show.farmerProduceArr && <ContainerFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <ContainerFarmerMember rows={show.farmerArr} />}
        <Activity resourceId={show.container.id} resourceType={RESOURCE_TYPE.CONTAINER} />
      </AccordionRoot>
    </Container>
  );
}
