import Container from "@components/@core/container";
import CuppingReport from "@components/lot/report/cupping";
import withLocation from "@components/withLocation";
import { axLotByLotId, axOriginByLotId } from "@services/lot.service";
import { axGetCuppingReportById } from "@services/report.service";
import { hierarchicalRoles } from "@utils/auth.util";
import { isBrowser, ROLES } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import React, { useEffect, useState } from "react";

function CuppingReportPage({ query }) {
  const [lot, setLot] = useState(null as any);
  const [report, setReport] = useState(-1);
  const [origin, setOrigin] = useState(null as any);
  const lotId = query.id || -1;
  const reportId = query.reportId || -1;

  useEffect(() => {
    if (isBrowser) {
      axLotByLotId(lotId).then(({ data }) => setLot(data));
      axOriginByLotId(lotId).then(({ data }) => setOrigin(data));
      axGetCuppingReportById(reportId).then(({ data }) => setReport(data));
    }
  }, [query]);

  return (
    <Container roles={hierarchicalRoles(ROLES.UNION)}>
      {lot && origin && (
        <CuppingReport
          {...lot}
          {...origin}
          report={report}
          cupper={getUserKey("userName")}
        />
      )}
    </Container>
  );
}

export default withLocation(CuppingReportPage);
