import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { axGetFactoryReportById } from "@services/report.service";
import { LOT_REPORT_FACTORY_WET } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import FactoryReportWetModal from "./modal";

export default function FactoryReportWet({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>();
  const [report, setReport] = useState<any>();
  const [canWrite, setCanWrite] = useState(false);

  useListener(
    ({ lot, canWrite }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      axGetFactoryReportById(lot.factoryReportId).then(({ data }) => setReport(data));
    },
    [LOT_REPORT_FACTORY_WET]
  );

  const handleOnClose = () => {
    onClose();
    setLot(undefined);
    setReport(undefined);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false} size="6xl">
      <ModalOverlay />
      {lot && report && (
        <FactoryReportWetModal
          report={report}
          lot={lot}
          onClose={handleOnClose}
          canWrite={canWrite}
          update={update}
        />
      )}
    </Modal>
  );
}
