import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { LOT_CREATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { LotCreateForm } from "./form";

export default function BatchUpdateModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<{ batches; lotConfig; highestDate }>();

  useListener(
    ({ selected, ...props }) => {
      setData({
        batches: selected,
        highestDate: selected.reduce((acc, cv) => (cv.date > acc ? cv.date : acc), 0),
        lotConfig: props,
      });
      onOpen();
    },
    [LOT_CREATE]
  );

  const handleOnClose = () => {
    setData(undefined);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="2xl">
      <ModalOverlay />
      {data && <LotCreateForm update={update} onClose={handleOnClose} {...data} />}
    </Modal>
  );
}
