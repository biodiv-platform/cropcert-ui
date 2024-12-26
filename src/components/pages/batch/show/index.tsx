import { Button } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Batch } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE } from "@static/constants";
import { generateBackBtnStr } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { AccordionRoot } from "@/components/ui/accordion";

import BatchFarmerMember from "./batch-farmerMember";
import BatchFarmerProduce from "./batch-farmerProduce";
import BatchInfo from "./batch-info";

interface IBatchShowProps {
  batch: Batch;
  farmerProduceArr;
  farmerArr;
  farmerLocationArr;
}

export default function BatchShowPageComponent({ show }: { show: IBatchShowProps }) {
  const router = useRouter();
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Batch List");

  if (!previousPath) {
    setPreviousPath("/traceability/batch");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const ActionButtons = () => {
    return (
      <Button onClick={handleGoBack} variant="solid" rounded="md" colorScheme="gray">
        <LuArrowRight />
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
      <PageHeading actions={<ActionButtons />}>🧺 {show.batch.batchName}</PageHeading>
      {/* defaultIndex={[0]}  */}
      <AccordionRoot multiple>
        <BatchInfo batch={show.batch} geojsonData={geojsonData} />
        {show.farmerProduceArr && <BatchFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <BatchFarmerMember rows={show.farmerArr} />}
        <Activity resourceId={show.batch.id} resourceType={RESOURCE_TYPE.BATCH} />
      </AccordionRoot>
    </Container>
  );
}
