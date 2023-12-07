import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FARMER_EDIT } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import EditFarmerForm from "./form";

function EditFarmerModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [farmer, setFarmer] = useState(null);
  const [canWrite, setCanWrite] = useState(false);

  useListener(
    ({ farmer, hasAccess }) => {
      onOpen();
      console.log("farmer", farmer);
      setFarmer(farmer);
      setCanWrite(hasAccess);
    },
    [FARMER_EDIT]
  );

  const handleOnSubmit = () => {
    onClose();
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false} size="full">
      <ModalOverlay />
      {isOpen && (
        <EditFarmerForm
          isOpen={isOpen}
          onClose={handleOnClose}
          initialData={farmer}
          onSubmit={handleOnSubmit}
          canWrite={canWrite}
        />
      )}
    </Modal>
  );
}

export default EditFarmerModal;
