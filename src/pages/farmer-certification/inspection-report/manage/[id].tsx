import ManageInspectionReportComponent from "@components/pages/farmer-certification/inspection-report/manage";
import { axGetInspectionReportById } from "@services/certification.service";
import React from "react";

function ManageInspectionReportPage({ report, success }) {
  return success ? <ManageInspectionReportComponent report={report} /> : "404";
}

ManageInspectionReportPage.getInitialProps = async (ctx) => {
  const { success, data } = await axGetInspectionReportById(ctx.query.id);
  return { success, report: data };
};

export default ManageInspectionReportPage;
