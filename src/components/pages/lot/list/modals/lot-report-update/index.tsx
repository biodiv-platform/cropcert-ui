import { useDisclosure } from "@chakra-ui/react";
import { LOT_REPORT_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import LotGRNForm from "./form";

export default function LotReportUpdate({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>();
  const [isDone, setIsDone] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [canSplit, setCanSplit] = useState(false);

  useListener(
    ({ lot, canWrite, isDone }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      setErrorMessage(undefined);
      setIsDone(isDone);
      setCanSplit(!lot.lotId.includes("SL"));
    },
    [LOT_REPORT_UPDATE]
  );

  const handleOnClose = () => {
    onClose();
    setLot(undefined);
  };

  return (
    <DialogRoot open={open} onOpenChange={handleOnClose} closeOnInteractOutside={false} size={"xl"}>
      <DialogBackdrop />
      {lot && (
        <LotGRNForm
          onClose={handleOnClose}
          lot={lot}
          canWrite={canWrite}
          errorMessage={errorMessage}
          isDone={isDone}
          update={update}
          canSplit={canSplit}
        />
      )}
    </DialogRoot>
  );
}
