import { useDisclosure } from "@chakra-ui/react";
import { Batch } from "@interfaces/traceability";
import { BATCH_UPDATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogRoot } from "@/components/ui/dialog";

import BatchUpdateForm from "./form";

export default function BatchUpdateModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [batch, setBatch] = useState<Required<Batch>>();

  useListener(
    (b: Required<Batch>) => {
      setBatch(b);
      onOpen();
    },
    [BATCH_UPDATE]
  );

  const handleOnClose = () => {
    onClose();
    setBatch(undefined);
  };

  return (
    <DialogRoot open={open} onOpenChange={onClose}>
      {/*closeOnOverlayClick={false}  size="2xl" <ModalOverlay /> */}
      {open && batch && <BatchUpdateForm batch={batch} update={update} onClose={handleOnClose} />}
    </DialogRoot>
  );
}
