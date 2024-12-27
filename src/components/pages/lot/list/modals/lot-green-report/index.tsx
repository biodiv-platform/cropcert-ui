import { useDisclosure } from "@chakra-ui/react";
import { FactoryReport, Lot, QualityReport } from "@interfaces/traceability";
import { axOriginByLotId } from "@services/lot.service";
import { axGetFactoryReportByLotId, axGetGreenReportById } from "@services/report.service";
import { LOT_REPORT_GREEN } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import GreenReportForm from "./form";

export default function GreenReportModal({ update }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [canWrite, setCanWrite] = useState(false);
  const [report, setReport] = useState<QualityReport>();
  const [factoryReport, setFactoryReport] = useState<FactoryReport>();
  const [origin, setOrigin] = useState<any>();

  useListener(
    ({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      axOriginByLotId(lot.id).then(({ data }) => setOrigin(data));
      axGetFactoryReportByLotId(lot.id).then(({ data }) => setFactoryReport(data));
      axGetGreenReportById(lot.greenAnalysisId).then(({ data }) => setReport(data));
    },
    [LOT_REPORT_GREEN]
  );

  const handleOnClose = () => {
    onClose();
    setReport(undefined);
    setFactoryReport(undefined);
    setOrigin(undefined);
  };

  return (
    //size="6xl"
    <DialogRoot open={open} onOpenChange={handleOnClose} closeOnInteractOutside={false}>
      <DialogBackdrop />
      {origin && report && factoryReport && (
        <GreenReportForm
          report={report}
          onClose={handleOnClose}
          canWrite={canWrite}
          update={update}
          lot={lot}
          factoryReport={factoryReport}
          {...origin}
        />
      )}
    </DialogRoot>
  );
}
