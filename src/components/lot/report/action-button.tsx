import { Add16, Edit16 } from "@carbon/icons-react";
import { REPORT_TYPE } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import { Link } from "gatsby";
import React from "react";

export default function ActionButton(reportType, row) {
  let isEdit = false;
  let reportId = -1;

  switch (reportType) {
    case REPORT_TYPE.GREEN:
      if (row.greenAnalysisId) {
        isEdit = true;
        reportId = row.greenAnalysisId;
      }
      break;

    case REPORT_TYPE.CUPPING:
      const userEmail = getUserKey("email");
      for (const cuppingReport of row.cuppingReports) {
        if (cuppingReport.cupper === userEmail) {
          isEdit = true;
          reportId = cuppingReport.id;
        }
      }
      break;

    default:
      break;
  }

  return (
    <Link
      className={`icon-link ${isEdit ? "btn-orange" : "btn-green"}`}
      to={`/lot/report/${reportType}?id=${row.id}&reportId=${reportId}`}
    >
      {isEdit ? (
        <>
          <Edit16 /> Edit
        </>
      ) : (
        <>
          <Add16 /> Add
        </>
      )}
    </Link>
  );
}
