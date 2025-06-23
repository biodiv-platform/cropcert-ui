import { AccordionRoot, Button, Group } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Container as ContainerType, Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE, ROLES } from "@static/constants";
import { generateBackBtnStr, getCurrentTimestamp } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

import { DownloadButtonWithTooltip } from "@/components/@core/action-buttons/DownloadButtonWithTooltip";
import { axGetDataInCSV } from "@/services/traceability.service";
import { hasAccess } from "@/utils/auth";
import { sendFileFromResponse } from "@/utils/download";

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
}

export default function ContainerShowPageComponent({ show }: { show: IContainerShowProps }) {
  const router = useRouter();
  const { user } = useGlobalState();
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Container List");

  if (!previousPath) {
    setPreviousPath("/traceability/container");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const handleOnDownloadData = async () => {
    try {
      const response = await axGetDataInCSV("container", [show.container._id]);
      if (response.success) {
        sendFileFromResponse(response.data, `container_${getCurrentTimestamp()}.csv`);
      }
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  const ActionButtons = () => {
    return (
      <Group gap={4}>
        <Button onClick={handleGoBack} variant="subtle" rounded="md">
          <LuArrowLeft />
          {backButtonText}
        </Button>
        <DownloadButtonWithTooltip
          disabled={!hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)}
          onClick={handleOnDownloadData}
        />
      </Group>
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
      <PageHeading actions={<ActionButtons />} floatHeader={true}>
        📦 {show.container.containerName}
      </PageHeading>
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
