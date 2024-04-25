import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Heading, Stack } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { Activity, Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { CC_COLOR_MAPPING } from "@static/constants";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import LotBatches from "./lot-batches";
import LotFarmerMember from "./lot-farmerMember";
import LotFarmerProduce from "./lot-farmerProduce";
import LotInfo from "./lot-info";

const MultiMarkerMap = dynamic(
  () =>
    import("@components/pages/farmer-member/list/modals/multi-marker-map/geojson-multi-marker-map"),
  { ssr: false }
);

interface ILotShowProps {
  lot: Lot;
  activities: Activity[];
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: any[];
  batches: any[];
  farmerProduceIds: any[];
  farmerLocationArr: any[];
  farmerArr: any[];
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
      <PageHeading actions={<ActionButtons />}>📦 Lot: {show.lot.lotName}</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <LotInfo lot={show.lot} />
        {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceIds && <LotFarmerProduce rows={show.farmerProduceIds} />}
        {show.farmerArr && <LotFarmerMember rows={show.farmerArr} />}
        {show.farmerLocationArr && (
          <Stack direction={"column"} spacing={2} width={"full"} my={4} mb={8} height={"400px"}>
            <Box
              rounded="md"
              borderWidth={1}
              borderColor={"gray.200"}
              width={{ base: "full" }}
              height={{ base: "400", md: "full", lg: "full", xl: "full" }}
              overflow={"hidden"}
              boxShadow="md"
            >
              <MultiMarkerMap geojsonData={geojsonData} />
            </Box>
          </Stack>
        )}
      </Accordion>
    </Container>
  );
}
