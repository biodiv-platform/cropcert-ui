import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Lot } from "@interfaces/traceability";
import { axUpdateGRN } from "@services/lot.service";
import { LOT_FLAGS } from "@static/constants";
import { LOT_REPORT_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import LotGRNForm from "./form";

export default function LotReportUpdate({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>();
  const [isDone, setIsDone] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useListener(
    ({ lot, canWrite }) => {
      console.log("lot report update");
      console.log(lot);
      console.log("canWrite");
      console.log(canWrite);
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      setErrorMessage(undefined);
      setIsDone(lot?.columnStatus === LOT_FLAGS.DONE);
    },
    [LOT_REPORT_UPDATE]
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
    <Modal isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false}>
      <ModalOverlay />
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
    </Modal>
  );
}
