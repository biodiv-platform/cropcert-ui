import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DRAW_MAP } from "@static/events";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useListener } from "react-gbus";

const MultiMarkerMap = dynamic(() => import("./multi-marker-map"), { ssr: false });

const MultiMarkerMapModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coordinatesArray, setCoordinatesArray] = useState([]);

  const getCoordinatesFromFarmerMember = (selected) => {
    setCoordinatesArray(
      selected.selectedFarmerMember.map(({ location, personalDetails }) => ({
        lat: location.coordinates[1],
        long: location.coordinates[0],
        name: personalDetails.farmer_name,
      }))
    );
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
        <ModalHeader>Farm Locations</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {coordinatesArray && (
            <Box width={"100%"} height={"100%"} boxShadow="md" p={4} rounded={"md"}>
              <MultiMarkerMap coordinatesArray={coordinatesArray} />
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MultiMarkerMapModal;
