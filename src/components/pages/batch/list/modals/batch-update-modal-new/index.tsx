import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Batch } from "@interfaces/traceability";
import { BATCH_FLAGS } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import BatchUpdateForm from "./form";

export default function BatchUpdateModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [batch, setBatch] = useState<Required<Batch>>();
  const [isDone, setIsDone] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useListener(
    ({ batch, canWrite }) => {
      onOpen();
      setBatch(batch);
      setCanWrite(canWrite);
      setErrorMessage(undefined);
      setIsDone(batch?.columnStatus === BATCH_FLAGS.DONE);
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
      {isOpen && batch && (
        <BatchUpdateForm
          batch={batch}
          update={update}
          onClose={handleOnClose}
          canWrite={canWrite}
          errorMessage={errorMessage}
          isDone={isDone}
        />
      )}
    </Modal>
  );
}
