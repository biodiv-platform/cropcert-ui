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
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useListener } from "react-gbus";

const MultiMarkerMap = dynamic(() => import("./multi-marker-map"), { ssr: false });

const MultiMarkerMapModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const { t } = useTranslation();

  const [fetchData, setFetchData] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["AllFarmerByUnion"],
    queryFn: () => axGetAllFarmerByUnion(5),
    enabled: fetchData,
    staleTime: 1000 * 60 * 60 * 24 * 10, // 10 days in milliseconds
    gcTime: 1000 * 60 * 60 * 24 * 20, // 20 days in milliseconds
  });

  useEffect(() => {
    if (data) {
      setCoordinatesArray(getSelectedFarmerMemberData(data.data));
    }
  }, [data]);

  const handleGetAllUnionFarmerData = () => {
    setFetchData(true);
    if (data) {
      setCoordinatesArray(getSelectedFarmerMemberData(data.data));
    }
  };

  const getSelectedFarmerMemberData = (selected) => {
    return (
      selected &&
      selected.map(({ location, farmerId, farmerName, cc, _id }) => ({
        lat: location.coordinates[1],
        long: location.coordinates[0],
        name: farmerName,
        farmerId,
        color: CC_COLOR_MAPPING[cc],
        cc: cc,
        _id,
      }))
    );
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
          {error && <Text>Error loading data ...</Text>}

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
