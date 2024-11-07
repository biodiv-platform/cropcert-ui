import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { FarmerMember, FarmerProduce } from "@interfaces/traceability";
import { RESOURCE_TYPE } from "@static/constants";
import { generateBackBtnStr } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";

import FarmerProduceInfo from "./farmer-produce-info";
import GrnReceiptInfo from "./grn-receip";

interface IFarmerProduceShowProps {
  farmerProduces: FarmerProduce;
  farmer: FarmerMember;
}

export default function FarmerProduceShowPageComponent({
  show,
}: {
  show: IFarmerProduceShowProps;
}) {
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
      <Box display={"flex"}>
        <Button
          onClick={handleGoBack}
          leftIcon={<ArrowBackIcon />}
          variant="solid"
          rounded="md"
          colorScheme="gray"
        >
          {backButtonText}
        </Button>
      </Box>
    );
  };

  return (
    show?.farmer && (
      <Container>
        <PageHeading actions={<ActionButtons />}>🧑‍🌾 {show.farmerProduces.farmerName}</PageHeading>
        <Accordion defaultIndex={[0]} allowMultiple>
          <FarmerProduceInfo farmerProduces={show.farmerProduces} />
          {show?.farmerProduces?.grnReceipt && (
            <GrnReceiptInfo farmerProduces={show.farmerProduces} />
          )}
        </Accordion>
        <Activity resourceId={show.farmerProduces.id} resourceType={RESOURCE_TYPE.FARMER_PRODUCE} />
      </Container>
    )
  );
}
