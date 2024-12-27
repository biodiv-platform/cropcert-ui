import { useDisclosure } from "@chakra-ui/react";
import { Lot } from "@interfaces/traceability";
import { axDispatchLotCoOperative } from "@services/lot.service";
import { LOT_FLAGS } from "@static/constants";
import { LOT_DISPATCH_FACTORY } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import LotCoDispatchForm from "./form";

export default function LotCoDispatchModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>(undefined);
  const [isDone, setIsDone] = useState(false);

  useListener(
    (lot: Lot) => {
      onOpen();
      setLot(lot);
      setIsDone(lot.coopStatus === LOT_FLAGS.DONE);
    },
    [LOT_DISPATCH_FACTORY]
  );

  const handleOnSubmit = async (values) => {
    const { success, data } = await axDispatchLotCoOperative({
      id: lot.id,
      ...values,
    });
    if (success) {
      update(data);
      onClose();
      setLot(undefined);
    }
  };

  const handleOnClose = () => {
    onClose();
    setLot(undefined);
  };

  return (
    <DialogRoot open={open} onOpenChange={handleOnClose} closeOnInteractOutside={false}>
      <DialogBackdrop />
      {lot && (
        <LotCoDispatchForm
          onSubmit={handleOnSubmit}
          onClose={handleOnClose}
          isDone={isDone}
          lot={lot}
        />
      )}
    </DialogRoot>
  );
}
