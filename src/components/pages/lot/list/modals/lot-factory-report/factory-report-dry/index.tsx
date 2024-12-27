import { useDisclosure } from "@chakra-ui/react";
import { FactoryReport, Lot } from "@interfaces/traceability";
import { axGetFactoryReportById } from "@services/report.service";
import { LOT_REPORT_FACTORY_DRY } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import FactoryReportDryModal from "./modal";

export default function FactoryReportDry({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
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
    // size="6xl"
    <DialogRoot open={open} onOpenChange={handleOnClose} closeOnInteractOutside={false}>
      <DialogBackdrop />
      {lot && report && (
        <FactoryReportDryModal
          report={report}
          lot={lot}
          onClose={handleOnClose}
          canWrite={canWrite}
          update={update}
        />
      )}
    </DialogRoot>
  );
}
