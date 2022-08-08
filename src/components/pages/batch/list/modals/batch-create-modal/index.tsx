import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { BATCH_CREATE } from "@static/events";
import React from "react";
import { useListener } from "react-gbus";

import BatchCreateForm from "./form";

export default function BatchCreateModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useListener(onOpen, [BATCH_CREATE]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="2xl">
      <ModalOverlay />
      {isOpen && <BatchCreateForm update={update} onClose={onClose} />}
    </Modal>
  );
}
