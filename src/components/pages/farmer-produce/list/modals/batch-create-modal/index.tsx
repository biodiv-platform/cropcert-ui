import { useDisclosure } from "@chakra-ui/react";
import { BATCH_CREATE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import BatchCreateForm from "./form";

export default function BatchCreateModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<{ farmerProduceArr; batchConfig; highestDate }>();

  useListener(
    ({ selected, ...props }) => {
      setData({
        farmerProduceArr: selected,
        highestDate: selected.reduce((acc, cv) => (cv.date > acc ? cv.date : acc), 0),
        batchConfig: props,
      });
      onOpen();
    },
    [BATCH_CREATE]
  );

  return (
    <DialogRoot open={open} onOpenChange={onClose} closeOnInteractOutside={false} size="lg">
      <DialogBackdrop />
      {data && <BatchCreateForm update={update} onClose={onClose} {...data} />}
    </DialogRoot>
  );
}
