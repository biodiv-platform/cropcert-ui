import { ArrowBackIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import FarmerEditForm from "./farmer-edit-form";

const FarmerMap = dynamic(() => import("../map/farmer-map"), { ssr: false });

export default function FarmerEditPageComponent({ edit }) {
  const [isDraggable, setIsDraggable] = useState(false);

  const farmer = edit;

  const farmerInfo = {
    lat: farmer.location.coordinates[1],
    long: farmer.location.coordinates[0],
    name: farmer.farmerName,
    farmerId: farmer.farmerId,
    cc: farmer.cc,
  };

  const hasEditDeleteAccess = true; //TODO: add access control

  const PreviousPageButton = () => {
    return (
      <Button
        // onClick={goBack}
        leftIcon={<ArrowBackIcon />}
        variant="solid"
        rounded="md"
        colorScheme="gray"
      >
        Go Back
      </Button>
    );
  };

  return (
    <Container>
      <PageHeading PreviousPageButton={<PreviousPageButton />}>🧑‍🌾 Edit Farmer</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <FarmerEditForm initialData={farmer} />
        <Stack direction={"column"} spacing={2} width={"full"} height={"600px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">Location :</Heading>
            {hasEditDeleteAccess &&
              (isDraggable ? (
                <Button
                  size={"md"}
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  onClick={() => setIsDraggable(false)}
                >
                  Save Marker Location
                </Button>
              ) : (
                <Button
                  size={"md"}
                  leftIcon={<EditIcon />}
                  colorScheme="yellow"
                  onClick={() => setIsDraggable(true)}
                >
                  Edit Marker Location
                </Button>
              ))}
          </Flex>
          <Box
            rounded="md"
            border={4}
            borderColor={"gray.400"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerMap farmerInfo={farmerInfo} isDraggable={isDraggable} />
          </Box>
        </Stack>
        <Flex justifyContent={"flex-end"} gap={2} my={8}>
          <Button variant="solid" colorScheme="gray" size={"lg"}>
            Cancel
          </Button>
          <Button variant="solid" colorScheme="red" size={"lg"}>
            Update Farmer
          </Button>
        </Flex>
      </Accordion>
    </Container>
  );
}
