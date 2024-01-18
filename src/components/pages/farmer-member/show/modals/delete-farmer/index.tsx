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
import { axDeleteFarmerById } from "@services/farmer.service";
import { FARMER_DELETE } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useListener } from "react-gbus";

const DeleteFarmerModal = () => {
  const [farmerId, setFarmerId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleConfirmDelete = async () => {
    try {
      // delete farmer
      const { success } = await axDeleteFarmerById(farmerId);

      if (success) {
        onClose();
        notification("Farmer Deleted", NotificationType.Success);

        // navigate to the previous page
        router.push("/farmer/list");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  useListener(
    (f) => {
      setFarmerId(f.farmerId);
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
