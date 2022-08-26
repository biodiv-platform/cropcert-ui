import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FactoryReport, Lot } from "@interfaces/traceability";
import { axGetFactoryReportById } from "@services/report.service";
import { LOT_REPORT_FACTORY_DRY } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import FactoryReportDryModal from "./modal";

export default function FactoryReportDry({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<Lot | undefined>();
  const [report, setReport] = useState<FactoryReport | undefined>();
  const [canWrite, setCanWrite] = useState(false);

  useListener(
    ({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      axGetFactoryReportById(lot.factoryReportId).then(({ data }) => setReport(data));
    },
    [LOT_REPORT_FACTORY_DRY]
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
        <FactoryReportDryModal
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
