import { useDisclosure } from "@chakra-ui/react";
import { Lot } from "@interfaces/traceability";
import { axDispatchLotFactory } from "@services/lot.service";
import { LOT_FACTORY_PROCESS } from "@static/events";
import notification from "@utils/notification";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import LotFactoryDispatchForm from "./form";

export default function LotFactoryDispatchModal({ update, unions }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>();
  const [canWrite, setCanWrite] = useState(false);

  useListener(
    ({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
    },
    [LOT_FACTORY_PROCESS]
  );

  const handleOnSubmit = async (values) => {
    if (values.finalizeMillingStatus && !values.unionCode) {
      notification("Union Code is Required");
      return;
    }
    const { success, data } = await axDispatchLotFactory({
      id: lot.id,
      ...values,
    });
    if (success) {
      update(data);
      onClose();
    }
  };

  const handleOnClose = () => {
    onClose();
    setLot(undefined);
  };

  return (
    // size="3xl"
    <DialogRoot open={open} onOpenChange={handleOnClose} closeOnInteractOutside={false}>
      <DialogBackdrop />
      {lot && (
        <LotFactoryDispatchForm
          onSubmit={handleOnSubmit}
          canWrite={canWrite}
          unions={unions}
          onClose={handleOnClose}
          lot={lot}
        />
      )}
    </DialogRoot>
  );
}
