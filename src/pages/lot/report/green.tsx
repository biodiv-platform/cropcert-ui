import Container from "@components/@core/container";
import GreenReport from "@components/lot/report/green";
import withLocation from "@components/withLocation";
import { axLotByLotId, axOriginByLotId } from "@services/lot.service";
import { axGetGreenReportById } from "@services/report.service";
import { hierarchicalRoles } from "@utils/auth.util";
import { isBrowser, ROLES } from "@utils/constants";
import React, { useEffect, useState } from "react";

function GreenReportPage({ query }) {
  const [lot, setLot] = useState(null as any);
  const [report, setReport] = useState(-1);
  const [origin, setOrigin] = useState(null as any);
  const lotId = query.id || -1;
  const reportId = query.reportId || -1;

  useEffect(() => {
    if (isBrowser) {
      axLotByLotId(lotId).then(({ data }) => setLot(data));
      axOriginByLotId(lotId).then(({ data }) => setOrigin(data));
      axGetGreenReportById(reportId).then(({ data }) => setReport(data));
    }
  }, [query]);

  return (
    <Container roles={hierarchicalRoles(ROLES.UNION)}>
      {lot && origin && report && (
        <GreenReport report={report} {...lot} {...origin} />
      )}
    </Container>
  );
}

export default withLocation(GreenReportPage);
