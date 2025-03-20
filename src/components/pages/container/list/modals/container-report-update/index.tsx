import { useDisclosure } from "@chakra-ui/react";
import { CONTAINER_FLAGS } from "@static/constants";
import { CONTAINER_REPORT_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import ContainerGRNForm from "./form";

export default function ContainerReportUpdate({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [container, setContainer] = useState<any>();
  const [isDone, setIsDone] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useListener(
    ({ container, canWrite }) => {
      onOpen();
      setContainer(container);
      setCanWrite(canWrite);
      setErrorMessage(undefined);
      setIsDone(container?.columnStatus === CONTAINER_FLAGS.DONE);
    },
    [CONTAINER_REPORT_UPDATE]
  );

  const handleOnClose = () => {
    onClose();
    setContainer(undefined);
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={handleOnClose}
      closeOnInteractOutside={false}
      size={"cover"}
    >
      <DialogBackdrop />
      {container && (
        <ContainerGRNForm
          onClose={handleOnClose}
          container={container}
          canWrite={canWrite}
          errorMessage={errorMessage}
          isDone={isDone}
          update={update}
        />
      )}
    </DialogRoot>
  );
}
