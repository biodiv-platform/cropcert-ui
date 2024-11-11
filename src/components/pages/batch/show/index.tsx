import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Button } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Batch } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE } from "@static/constants";
import { generateBackBtnStr } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";

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
  const { previousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath);

  // Function to go back to the previous page
  const handleGoBack = () => {
    if (previousPath.includes("/traceability")) {
      router.push(backLink);
    } else {
      router.back();
      setTimeout(() => window.location.reload(), 300); // workaround to reload pages which are not reloading due to filter query param in url.
    }
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
      <Accordion defaultIndex={[0]} allowMultiple>
        <BatchInfo batch={show.batch} geojsonData={geojsonData} />
        {show.farmerProduceArr && <BatchFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <BatchFarmerMember rows={show.farmerArr} />}
        <Activity resourceId={show.batch.id} resourceType={RESOURCE_TYPE.BATCH} />
      </Accordion>
    </Container>
  );
}
