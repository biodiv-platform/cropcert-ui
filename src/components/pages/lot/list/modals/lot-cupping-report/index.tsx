import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/core";
import { axOriginByLotId } from "@services/lot.service";
import { ROLES } from "@static/constants";
import { LOT_REPORT_GREEN, LOT_REPORT_CUPPING } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { Lot, QualityReport } from "types/traceability";
import { User } from "types/user";

import CuppingReportForm from "./form";

export default function CuppingReportModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState({} as Lot);
  const [isDispatched, setIsDisapatched] = useState(true);
  const [report, setReport] = useState<QualityReport>({});
  const [origin, setOrigin] = useState();

  const user: User = useStoreState(state => state.user);
  const isReadOnly = !hasAccess(hierarchicalRoles(ROLES.UNION), user);

  useListener(({ lot, dispatched }: { lot: Lot; dispatched: boolean }) => {
    onOpen();
    setLot(lot);
    setIsDisapatched(dispatched);
    axOriginByLotId(lot.id).then(({ data }) => setOrigin(data));
    // TODO: add cupping report id from lot object (back-end)
    //axGetCuppingReportById(lot.greenAnalysisId).then(({ data }) => setReport(data));
  }, LOT_REPORT_CUPPING);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="6xl">
      <ModalOverlay />
      {origin && report && (
        <CuppingReportForm
          report={report}
          onClose={onClose}
          isDispatched={isDispatched}
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
