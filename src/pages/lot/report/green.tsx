import Container from "@components/@core/container";
import GreenReport from "@components/lot/report/green";
import withLocation from "@components/withLocation";
import { axLotByLotId, axOriginByLotId } from "@services/lot.service";
import { isBrowser, ROLES } from "@utils/constants";
import React, { useEffect, useState } from "react";

function GreenReportPage({ query }) {
  const [lot, setLot] = useState(null as any);
  const [origin, setOrigin] = useState(null as any);
  const lotId = query.id || -1;

  useEffect(() => {
    if (isBrowser) {
      axLotByLotId(lotId).then(({ data }) => setLot(data));
      axOriginByLotId(lotId).then(({ data }) => setOrigin(data));
    }
  }, []);

  return (
    <Container roles={[ROLES.FACTORY, ROLES.UNION]}>
      {lot && origin && <GreenReport {...lot} {...origin} />}
    </Container>
  );
}

export default withLocation(GreenReportPage);
