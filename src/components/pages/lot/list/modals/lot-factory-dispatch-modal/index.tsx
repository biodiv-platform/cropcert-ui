import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { axDispatchLotFactory } from "@services/lot.service";
import { LOT_FACTORY_PROCESS } from "@static/events";
import notification from "@utils/notification";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { Lot } from "types/traceability";

import LotFactoryDispatchForm from "./form";

export default function LotFactoryDispatchModal({ update, unions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Modal isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false} size="3xl">
      <ModalOverlay />
      {lot && (
        <LotFactoryDispatchForm
          onSubmit={handleOnSubmit}
          canWrite={canWrite}
          unions={unions}
          onClose={handleOnClose}
          lot={lot}
        />
      )}
    </Modal>
  );
}
