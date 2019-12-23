import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/core";
import { axGetGreenReportById, axGetFactoryReportByLotId } from "@services/report.service";
import { ROLES } from "@static/constants";
import { LOT_REPORT_GREEN } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { Lot, FactoryReport, QualityReport } from "types/traceability";

import GreenReportForm from "./form";
import { axOriginByLotId } from "@services/lot.service";

export default function GreenReportModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [canWrite, setCanWrite] = useState(false);
  const [report, setReport] = useState<QualityReport>();
  const [factoryReport, setFactoryReport] = useState<FactoryReport>();
  const [origin, setOrigin] = useState();

  const user = useStoreState(state => state.user);
  const isReadOnly = !hasAccess(hierarchicalRoles(ROLES.UNION), user);

  useListener(({ lot, canWrite }: { lot: Lot; canWrite: boolean }) => {
    onOpen();
    setLot(lot);
    setCanWrite(canWrite);
    axOriginByLotId(lot.id).then(({ data }) => setOrigin(data));
    axGetFactoryReportByLotId(lot.id).then(({ data }) => setFactoryReport(data));
    axGetGreenReportById(lot.greenAnalysisId).then(({ data }) => setReport(data));
  }, LOT_REPORT_GREEN);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="6xl">
      <ModalOverlay />
      {origin && report && factoryReport && (
        <GreenReportForm
          report={report}
          onClose={onClose}
          canWrite={canWrite}
          update={update}
          lot={lot}
          factoryReport={factoryReport}
          {...origin}
        />
      )}
    </Modal>
  );
}
