import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/core";
import { axGetFactoryReportById } from "@services/report.service";
import { LOT_REPORT_FACTORY_WET } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { FactoryReport, Lot } from "types/traceability";

import FactoryReportWetModal from "./modal";

export default function FactoryReportWet({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [report, setReport] = useState<FactoryReport>({});
  const [canWrite, setCanWrite] = useState(false);

  useListener(({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
    onOpen();
    setLot(lot);
    setCanWrite(canWrite);
    axGetFactoryReportById(lot.factoryReportId).then(({ data }) => setReport(data));
  }, LOT_REPORT_FACTORY_WET);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="6xl">
      <ModalOverlay />
      <FactoryReportWetModal
        report={report}
        lot={lot}
        onClose={onClose}
        canWrite={canWrite}
        update={update}
      />
    </Modal>
  );
}
