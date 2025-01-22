import { useDisclosure } from "@chakra-ui/react";
import { Batch } from "@interfaces/traceability";
import { BATCH_FLAGS } from "@static/constants";
import { BATCH_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import BatchUpdateForm from "./form";

export default function BatchUpdateModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
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
    <DialogRoot open={open} onOpenChange={onClose} size={"lg"}>
      <DialogBackdrop />
      {open && batch && (
        <BatchUpdateForm
          batch={batch}
          update={update}
          onClose={handleOnClose}
          canWrite={canWrite}
          errorMessage={errorMessage}
          isDone={isDone}
        />
      )}
    </DialogRoot>
  );
}
