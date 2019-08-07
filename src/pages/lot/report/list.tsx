import Container from "@components/@core/container";
import Report from "@components/lot/report/report";
import { isBrowser, REPORT_TYPE, ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import { parse } from "query-string";
import React from "react";

const MillingListPage = () => {
  const reportType = isBrowser
    ? parse(location.search).type || REPORT_TYPE.GREEN
    : REPORT_TYPE.GREEN;

  return (
    <Container roles={[ROLES.FACTORY, ROLES.UNION]}>
      <Report reportType={reportType} />
    </Container>
  );
};

export default observer(MillingListPage);
