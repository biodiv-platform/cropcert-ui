import Container from "@components/@core/container";
import FactoryReportDryComponent from "@components/lot/report/factory-dry";
import withLocation from "@components/withLocation";
import { axGetFactoryReportById } from "@services/report.service";
import { hierarchicalRoles } from "@utils/auth.util";
import { isBrowser, ROLES } from "@utils/constants";
import React, { useEffect, useState } from "react";

function FactoryReportPageDry({ query }) {
  const lotId = query.id || -1;
  const reportId = query.reportId || -1;
  const [report, setReport] = useState();

  useEffect(() => {
    if (isBrowser) {
      setReport({ lotId });
      axGetFactoryReportById(reportId).then(({ data }) => setReport(data));
    }
  }, [query]);

  return (
    <Container roles={hierarchicalRoles(ROLES.UNION)}>
      <h1 className="eco--title">Factory Report: Lot #{lotId}</h1>
      {report && <FactoryReportDryComponent report={report} lotId={lotId} />}
    </Container>
  );
}

export default withLocation(FactoryReportPageDry);
