import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { axGetAllFarmerByUnion } from "@services/farmer.service";
import { CC_COLOR_MAPPING } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useListener } from "react-gbus";

const MultiMarkerMap = dynamic(() => import("./multi-marker-map"), { ssr: false });

const MultiMarkerMapModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const getSelectedFarmerMemberData = (selected) => {
    return selected.map(({ location, personalDetails, farmerId }) => ({
      lat: location.coordinates[1],
      long: location.coordinates[0],
      name: personalDetails.farmerName,
      farmerId,
      color: CC_COLOR_MAPPING[personalDetails.cc],
      cc: personalDetails.cc,
    }));
  };

  const getCoordinatesFromFarmerMember = (selected) => {
    setCoordinatesArray(getSelectedFarmerMemberData(selected.selectedFarmerMember));
    onOpen();
  };

  useListener(
    (selectedFarmerMember) => {
      getCoordinatesFromFarmerMember(selectedFarmerMember);
    },
    [DRAW_MAP]
  );

  const handleGetAllUnionFarmerData = async () => {
    setIsLoading(true);
    const allFarmerData = await axGetAllFarmerByUnion(5); //TODO: remove hardcoding
    setCoordinatesArray(getSelectedFarmerMemberData(allFarmerData.data));
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="full">
      <ModalOverlay />
      <ModalContent>
        <Flex>
          <ModalHeader flex={1}>{t("traceability:farmer_member_modal_heading")}</ModalHeader>
          <Box width={"240px"}>
            <Flex alignItems={"center"}>
              {!isLoading && (
                <Button
                  colorScheme="teal"
                  size="md"
                  mt={2}
                  marginX={"auto"}
                  onClick={handleGetAllUnionFarmerData}
                >
                  Get All Data
                </Button>
              )}
              <ModalCloseButton />
            </Flex>
          </Box>
        </Flex>
        <ModalBody>
          {coordinatesArray &&
            (isLoading ? (
              <Flex alignItems={"center"} gap={2}>
                <Spinner size="xs" />
                <Text>Loading...</Text>
              </Flex>
            ) : (
              <Box
                width={"100%"}
                height={{ base: "400", md: "400", lg: "650", xl: "850" }}
                boxShadow="md"
                p={4}
                rounded={"md"}
              >
                <MultiMarkerMap coordinatesArray={coordinatesArray} />
              </Box>
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MultiMarkerMapModal;
