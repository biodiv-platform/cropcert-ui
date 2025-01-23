import { useDisclosure } from "@chakra-ui/react";
import React from "react";

import { DialogRoot } from "@/components/ui/dialog";

import BatchCreateForm from "./form";

export default function BatchCreateModal({ update }) {
  const { open, onClose } = useDisclosure();

  return (
    <DialogRoot open={open} onOpenChange={onClose} size="lg">
      {/*  closeOnOverlayClick={false}  size="2xl" <ModalOverlay /> */}
      {open && <BatchCreateForm update={update} onClose={onClose} />}
    </DialogRoot>
  );
}
