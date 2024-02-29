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
import { CC_COLOR_MAPPING, locationType } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useListener } from "react-gbus";

const MultiMarkerMap = dynamic(() => import("./geojson-multi-marker-map"), { ssr: false });

const MultiMarkerMapModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [geojsonData, setGeojsonData] = useState([]);
  const [recordCount, setRecordCount] = useState({
    totalFarmer: 0,
    totalPlots: 0,
  });

  const { t } = useTranslation();

  const [fetchData, setFetchData] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["AllFarmerByUnion"],
    queryFn: () => axGetAllFarmerByUnion(5), // unionId is hardcoded
    enabled: fetchData,
    staleTime: 1000 * 60 * 60 * 24 * 2, // 2 days in milliseconds
    gcTime: 1000 * 60 * 60 * 24 * 20, // 20 days in milliseconds
  });

  const getFarmerCountAndPlots = (selected) => {
    const totalFarmer = selected.length;
    let totalPlots = 0;
    selected.forEach((farmer) => {
      totalPlots += farmer.location.type === "Point" ? 1 : farmer.location.coordinates.length;
    });
    return { totalFarmer, totalPlots };
  };

  useEffect(() => {
    if (data) {
      setGeojsonData(getSelectedFarmerMemberData(data.data));
      setRecordCount(getFarmerCountAndPlots(data.data));
    }
  }, [data]);

  const handleGetAllUnionFarmerData = () => {
    setFetchData(true);
    if (data) {
      setGeojsonData(getSelectedFarmerMemberData(data.data));
      setRecordCount(getFarmerCountAndPlots(data.data));
    }
  };

  const getSelectedFarmerMemberData = (selected) => {
    return (
      selected &&
      selected.map(({ location, farmerId, farmerName, cc, _id }) => ({
        type: "Feature",
        geometry: {
          type: location.type,
          coordinates: location.coordinates,
        },
        properties: {
          name: farmerName,
          _id: _id,
          farmerId: farmerId,
          cc: cc,
          noOfFarms: location.type === locationType.POINT ? 1 : location.coordinates.length, // update here in case of future expansion of polygon or other geojson types.
          color: CC_COLOR_MAPPING[cc],
        },
      }))
    );
  };

  const getCoordinatesFromFarmerMember = (selected) => {
    setGeojsonData(getSelectedFarmerMemberData(selected.selectedFarmerMember));
    setRecordCount(getFarmerCountAndPlots(selected.selectedFarmerMember));
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
          <ModalHeader flex={1} paddingBottom={1}>
            {t("traceability:farmer.farmer_modal_heading")}
          </ModalHeader>
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

          {geojsonData &&
            (isLoading ? (
              <Flex alignItems={"center"} gap={2}>
                <Spinner size="xs" />
                <Text>Loading...</Text>
              </Flex>
            ) : (
              <Flex direction={"column"}>
                <Box>
                  <Box>
                    {t("traceability:farmer.farmer_modal_total_farmer_selected")}:{" "}
                    {recordCount.totalFarmer}
                  </Box>
                  <Box>
                    {t("traceability:farmer.farmer_modal_total_farm_plots")}:{" "}
                    {recordCount.totalPlots}
                  </Box>
                </Box>
                <Box
                  width={"100%"}
                  height={{ base: "400", md: "400", lg: "650", xl: "810" }}
                  boxShadow="md"
                  p={4}
                  rounded={"md"}
                >
                  <MultiMarkerMap geojsonData={geojsonData} />
                </Box>
              </Flex>
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MultiMarkerMapModal;
