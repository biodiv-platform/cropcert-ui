import { useDisclosure } from "@chakra-ui/react";
import { Lot } from "@interfaces/traceability";
import { axUpdateGRN } from "@services/lot.service";
import { LOT_FLAGS } from "@static/constants";
import { LOT_GRN } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import LotGRNForm from "./form";

export default function LotGRNModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>();
  const [isDone, setIsDone] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useListener(
    ({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      setErrorMessage(undefined);
      setIsDone(lot.grnStatus === LOT_FLAGS.DONE);
    },
    [LOT_GRN]
  );

  const handleOnClose = () => {
    onClose();
    setLot(undefined);
  };

  const handleOnSubmit = async (values) => {
    const { success, data } = await axUpdateGRN({ id: lot.id, ...values });
    if (success) {
      update(data);
      onClose();
    } else {
      setErrorMessage(data);
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={handleOnClose} closeOnInteractOutside={false} size={"xl"}>
      <DialogBackdrop />
      {lot && (
        <LotGRNForm
          onSubmit={handleOnSubmit}
          onClose={handleOnClose}
          lot={lot}
          canWrite={canWrite}
          errorMessage={errorMessage}
          isDone={isDone}
        />
      )}
    </DialogRoot>
  );
}
