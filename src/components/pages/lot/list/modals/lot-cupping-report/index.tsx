import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/core";
import { axOriginByLotId } from "@services/lot.service";
import { ROLES } from "@static/constants";
import { LOT_REPORT_CUPPING } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { Cupping, Lot, QualityReport } from "types/traceability";
import { User } from "types/user";

import CuppingReportForm from "./form";

export default function CuppingReportModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [canWrite, setCanWrite] = useState(true);
  const [report, setReport] = useState<QualityReport>({});
  const [origin, setOrigin] = useState();

  const user: User = useStoreState((state) => state.user);
  const isReadOnly = !hasAccess(hierarchicalRoles(ROLES.UNION), user);

  useListener(
    ({ lot, currentReport, canWrite }: { lot: Lot; currentReport: Cupping; canWrite: boolean }) => {
      onOpen();
      setLot(lot);
      setCanWrite(canWrite);
      setReport(currentReport || {});
      axOriginByLotId(lot.id).then(({ data }) => setOrigin(data));
    },
    [LOT_REPORT_CUPPING]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="6xl">
      <ModalOverlay />
      {origin && report && (
        <CuppingReportForm
          report={report}
          onClose={onClose}
          canWrite={canWrite}
          isReadOnly={isReadOnly}
          update={update}
          lot={lot}
          cupper={user.userName}
          {...origin}
        />
      )}
    </Modal>
  );
}
