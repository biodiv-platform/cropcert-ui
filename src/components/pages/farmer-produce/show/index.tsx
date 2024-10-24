import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { FarmerMember, FarmerProduce } from "@interfaces/traceability";
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

  const handleGoBack = () => {
    router.back();
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
          Back to List
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
          <GrnReceiptInfo farmerProduces={show.farmerProduces} />
        </Accordion>
      </Container>
    )
  );
}
