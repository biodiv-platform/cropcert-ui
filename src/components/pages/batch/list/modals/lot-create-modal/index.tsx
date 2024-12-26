import { useDisclosure } from "@chakra-ui/react";
import { LOT_CREATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogRoot } from "@/components/ui/dialog";

import { LotCreateForm } from "./form";

export default function BatchUpdateModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
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
    <DialogRoot open={open} onOpenChange={onClose} size="lg">
      {/* closeOnOverlayClick={false} size="2xl" <ModalOverlay /> */}
      {data && <LotCreateForm update={update} onClose={handleOnClose} {...data} />}
    </DialogRoot>
  );
}
