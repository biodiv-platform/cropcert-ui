import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image as ChakraImage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import RotateLeftIcon from "@icons/rotate-left";
import RotateRightIcon from "@icons/rotate-right";
import { ENDPOINT } from "@static/constants";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import FarmerProduceShowPanel from "./panel";

export default function FarmerProduceCollectionInfo({ farmerProduces }) {
  const basicInfoHeader = [
    {
      name: "Collector Name",
      selector: farmerProduces["collectorName"],
    },
    {
      name: "Collector Substr",
      selector: farmerProduces["collectorSubstr"],
    },
    {
      name: "Calculate Grn",
      selector: farmerProduces["calculateGrn"],
    },
  ];

  const prepareImageUrl = (unionName) =>
    `${ENDPOINT.ODK_IMAGES}v1/projects/${unionName.projectId}/forms/${unionName.xmlFormId}/submissions/${farmerProduces.instanceID}/attachments/${farmerProduces.grnReceipt}`;

  const UNION_NAME_TO_PROJECT_DETAILS = {
    5: {
      projectId: 2,
      xmlFormId: "Buzaaya-Farmer-Collection",
    },
  };

  const FarmerProduceMap = dynamic(() => import("../map/geoJson-point-map"), {
    ssr: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleRotateLeft = () => {
    setRotationAngle((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotationAngle((prev) => prev + 90);
  };

  return (
    <FarmerProduceShowPanel icon="ℹ️" title="Collection Information" isOpen={true}>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th textAlign="left" backgroundColor="slategray" color="white">
              Key
            </Th>
            <Th textAlign="left" backgroundColor="slategray" color="white">
              Value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {basicInfoHeader &&
            basicInfoHeader.map((item, index) => (
              <Tr key={index} backgroundColor={index % 2 === 0 ? "gray.100" : "white"}>
                <Td textAlign="left">{item.name}</Td>
                <Td textAlign="left">{item.selector}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Flex
        gap={2}
        mt={2}
        p={2}
        direction={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        minHeight={"400px"}
      >
        {farmerProduces.grnReceipt && (
          <Stack direction={"column"} spacing={2}>
            <Heading size="md">Grn Receipt :</Heading>
            <ChakraImage
              objectFit="cover"
              boxSize={{ base: "400px", sm: "full", md: "400px" }}
              align="center"
              src={prepareImageUrl(UNION_NAME_TO_PROJECT_DETAILS[farmerProduces.unionCode])}
              alt="GRN Receipt"
              rounded="md"
              boxShadow="md"
              loading="lazy"
              onClick={onOpen}
              cursor="pointer"
            />
          </Stack>
        )}
        <Stack direction={"column"} spacing={2} width={"full"}>
          <Box display={"flex"} justifyContent={"space-between"} alignContent={"center"}>
            <Heading size="md">Collection Location :</Heading>
          </Box>

          <Box
            rounded="md"
            border={4}
            borderColor={"gray.400"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerProduceMap geojson={farmerProduces?.location} />
          </Box>
        </Stack>
      </Flex>

      {/* Modal for Fullscreen Image */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={4}>
            <Heading size="md">GRN Receipt</Heading>
            <ModalCloseButton />
          </Box>
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <ChakraImage
              loading="lazy"
              objectFit="contain"
              alt="GRN Receipt"
              src={prepareImageUrl(UNION_NAME_TO_PROJECT_DETAILS[farmerProduces.unionCode])}
              transform={`rotate(${rotationAngle}deg)`}
            />
            <Box display="flex" justifyContent="center" mt={4}>
              <Tooltip label="Rotate Image to the Left" aria-label="Rotate Left">
                <IconButton
                  aria-label="Rotate Left"
                  icon={<RotateLeftIcon />}
                  onClick={handleRotateLeft}
                  variant="outline"
                  mr={2}
                />
              </Tooltip>
              <Tooltip label="Rotate Image to the Right" aria-label="Rotate Right">
                <IconButton
                  aria-label="Rotate Right"
                  icon={<RotateRightIcon />}
                  onClick={handleRotateRight}
                  variant="outline"
                  mr={2}
                />
              </Tooltip>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FarmerProduceShowPanel>
  );
}
