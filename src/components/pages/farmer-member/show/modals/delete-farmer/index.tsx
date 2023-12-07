import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FARMER_DELETE } from "@static/events";
import React from "react";
import { useListener } from "react-gbus";

const DeleteFarmerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmDelete = () => {
    // Logic to delete the farmer
    onClose();
    // navigate to the previous page
  };

  const handleCancel = () => {
    onClose();
  };

  useListener(
    (f) => {
      console.log("FARMER_DELETE", f);
      onOpen();
    },
    [FARMER_DELETE]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Farmer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this farmer?</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFarmerModal;
