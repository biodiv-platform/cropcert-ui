import { AccordionRoot, Box, Button } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { FarmerMember, FarmerProduce } from "@interfaces/traceability";
import { RESOURCE_TYPE } from "@static/constants";
import { generateBackBtnStr } from "@utils/basic";
import { useRouter } from "next/router";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

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

  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Produce List");

  if (!previousPath) {
    setPreviousPath("/traceability/farmer-produce");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const ActionButtons = () => {
    return (
      <Box display={"flex"}>
        <Button onClick={handleGoBack} variant="solid" rounded="md" colorScheme="gray">
          <LuArrowLeft />
          {backButtonText}
        </Button>
      </Box>
    );
  };

  return (
    show?.farmer && (
      <Container>
        <PageHeading actions={<ActionButtons />}>🧑‍🌾 {show.farmerProduces.farmerName}</PageHeading>
        <AccordionRoot defaultValue={["Produce Information"]} multiple>
          <FarmerProduceInfo farmerProduces={show.farmerProduces} />
          {show?.farmerProduces?.grnReceipt && (
            <GrnReceiptInfo farmerProduces={show.farmerProduces} />
          )}
        </AccordionRoot>
        <Activity resourceId={show.farmerProduces.id} resourceType={RESOURCE_TYPE.FARMER_PRODUCE} />
      </Container>
    )
  );
}
