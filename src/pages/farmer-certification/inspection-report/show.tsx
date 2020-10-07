import ManageInspectionReportComponent from "@components/pages/farmer-certification/inspection-report/manage";
import { axGetInspectionReportById } from "@services/certification.service";
import React from "react";

function ManageInspectionReportPage({
  currentReport,
  previousReport,
  showCurrent,
  version,
  subVersion,
}) {
  return (
    <ManageInspectionReportComponent
      currentReport={currentReport}
      previousReport={previousReport}
      showCurrent={showCurrent}
      version={version}
      subVersion={subVersion}
    />
  );
}

ManageInspectionReportPage.getInitialProps = async (ctx) => {
  const cr = await axGetInspectionReportById(ctx.query.cid);
  const pr = await axGetInspectionReportById(ctx.query.pid);
  return {
    currentReport: cr.data?.inspection || {},
    previousReport: pr.data?.inspection,
    version: cr.data?.version,
    subVersion: cr.data?.subVersion,
    showCurrent: cr.success,
  };
};

export default ManageInspectionReportPage;
