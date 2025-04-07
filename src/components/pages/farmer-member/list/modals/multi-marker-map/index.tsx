import { Box, Button, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { axGetAllFarmerByUnion } from "@services/farmer.service";
import { CC_COLOR_MAPPING } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useListener } from "react-gbus";

const MultiMarkerMap = dynamic(() => import("./geojson-multi-marker-map"), { ssr: false });

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

const MultiMarkerMapModal = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { union } = useGlobalState();
  const [geojsonData, setGeojsonData] = useState([]);
  const [recordCount, setRecordCount] = useState({
    totalFarmer: 0,
    totalPlots: 0,
  });

  const { t } = useTranslation();

  const [fetchData, setFetchData] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["AllFarmerByUnion"],
    queryFn: () => axGetAllFarmerByUnion(union?.code),
    enabled: fetchData,
    staleTime: 1000 * 60 * 60 * 24 * 2, // 2 days in milliseconds
    gcTime: 1000 * 60 * 60 * 24 * 20, // 20 days in milliseconds
  });

  const getFarmerCountAndPlots = (selected) => {
    const totalFarmer = selected.length;
    let totalPlots = 0;
    selected.forEach((farmer) => {
      totalPlots += farmer.noOfFarmPlots;
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
      selected.map(({ centroid, noOfFarmPlots, farmerId, farmerName, cc, _id }) => ({
        type: "Feature",
        geometry: {
          type: centroid.type,
          coordinates: centroid.coordinates,
        },
        properties: {
          name: farmerName,
          _id: _id,
          farmerId: farmerId,
          cc: cc,
          noOfFarms: noOfFarmPlots,
          color: CC_COLOR_MAPPING[cc] ?? { insideColor: "#010101" },
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
    <DialogRoot open={open} onOpenChange={onClose} size="full">
      <DialogBackdrop />
      <DialogContent>
        <Flex>
          <DialogHeader flex={1} paddingBottom={1}>
            <DialogTitle> {t("traceability:farmer.farmer_modal_heading")}</DialogTitle>
          </DialogHeader>
          <Box width={"240px"}>
            <Flex alignItems={"center"}>
              {!isLoading && union?.code && (
                <Button
                  colorPalette="teal"
                  size="md"
                  mt={2}
                  marginX={"auto"}
                  onClick={handleGetAllUnionFarmerData}
                >
                  Get All Data
                </Button>
              )}
              <DialogCloseTrigger />
            </Flex>
          </Box>
        </Flex>
        <DialogBody>
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
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default MultiMarkerMapModal;
