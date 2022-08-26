import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { Cupping, Lot } from "@interfaces/traceability";
import { axOriginByLotId } from "@services/lot.service";
import { ROLES } from "@static/constants";
import { LOT_REPORT_CUPPING } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import CuppingReportForm from "./form";

export default function CuppingReportModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lot, setLot] = useState<any>();
  const [canWrite, setCanWrite] = useState(true);
  const [report, setReport] = useState<any>();
  const [origin, setOrigin] = useState<any>();

  const { user } = useGlobalState();
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

  const handleOnClose = () => {
    onClose();
    setLot(undefined);
    setOrigin(undefined);
    setReport(undefined);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false} size="6xl">
      <ModalOverlay />
      {origin && report && lot && (
        <CuppingReportForm
          report={report}
          onClose={handleOnClose}
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
