import { useDisclosure } from "@chakra-ui/react";
import { CONTAINER_CREATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogRoot } from "@/components/ui/dialog";

import { ContainerCreateForm } from "./form";

export default function LotUpdateModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<{ lots; containerConfig; latestDate }>();

  useListener(
    ({ selected, ...props }) => {
      setData({
        lots: selected,
        latestDate: selected.reduce((acc, cv) => (cv.date > acc ? cv.date : acc), 0),
        containerConfig: props,
      });
      onOpen();
    },
    [CONTAINER_CREATE]
  );

  const handleOnClose = () => {
    setData(undefined);
    onClose();
  };

  return (
    <DialogRoot open={open} onOpenChange={onClose} size="lg">
      {/* closeOnOverlayClick={false} size="2xl" <ModalOverlay /> */}
      {data && <ContainerCreateForm update={update} onClose={handleOnClose} {...data} />}
    </DialogRoot>
  );
}
