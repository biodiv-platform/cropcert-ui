import Container from "@components/@core/container";
import Report from "@components/lot/report/report";
import { hierarchicalRoles } from "@utils/auth.util";
import { isBrowser, REPORT_TYPE, ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import { parse } from "query-string";
import React from "react";

const ReportListPage = () => {
  const reportType: string = isBrowser
    ? parse(location.search).type || REPORT_TYPE.GREEN
    : REPORT_TYPE.GREEN;

  return (
    <Container roles={hierarchicalRoles(ROLES.UNION)}>
      <Report reportType={reportType} />
    </Container>
  );
};

export default observer(ReportListPage);
