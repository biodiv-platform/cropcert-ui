import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";

import BatchCreateForm from "./form";

export default function BatchCreateModal({ update }) {
  const { isOpen, onClose } = useDisclosure();

  // useListener(onOpen, [BATCH_CREATE]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="2xl">
      <ModalOverlay />
      {isOpen && <BatchCreateForm update={update} onClose={onClose} />}
    </Modal>
  );
}
