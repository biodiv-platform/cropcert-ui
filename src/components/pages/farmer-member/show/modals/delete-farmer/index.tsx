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
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useListener } from "react-gbus";

const DeleteFarmerModal = () => {
  const [farmerId, setFarmerId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { t } = useTranslation();

  const handleConfirmDelete = async () => {
    try {
      // delete farmer
      const { success } = await axDeleteFarmerById(farmerId);

      if (success) {
        onClose();
        notification(t("traceability:farmer.delete_farmer_success"), NotificationType.Success);

        // navigate to the previous page
        router.push("/farmer/list");
      }
    } catch (err) {
      console.error(err);
      notification(t("traceability:farmer.delete_farmer_error"), NotificationType.Error);
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
        <ModalHeader>{t("traceability:farmer.delete_farmer_heading")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{t("traceability:farmer.delete_farmer_message")}</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
            {t("traceability:farmer.delete_farmer_confirm")}
          </Button>
          <Button onClick={handleCancel}>{t("traceability:farmer.delete_farmer_cancel")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFarmerModal;
