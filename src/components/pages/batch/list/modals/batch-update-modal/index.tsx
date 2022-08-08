import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { BATCH_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { Batch } from "types/traceability";

import BatchUpdateForm from "./form";

export default function BatchUpdateModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [batch, setBatch] = useState<Required<Batch>>();

  useListener(
    (b: Required<Batch>) => {
      setBatch(b);
      onOpen();
    },
    [BATCH_UPDATE]
  );

  const handleOnClose = () => {
    onClose();
    setBatch(undefined);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="2xl">
      <ModalOverlay />
      {isOpen && batch && <BatchUpdateForm batch={batch} update={update} onClose={handleOnClose} />}
    </Modal>
  );
}
