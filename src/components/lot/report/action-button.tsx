import { Add16, Edit16 } from "@carbon/icons-react";
import { REPORT_TYPE } from "@utils/constants";
import { Link } from "gatsby";
import React from "react";

export default function ActionButton(reportType, row) {
  switch (reportType) {
    case REPORT_TYPE.GREEN:
      const edit = row.greenAnalysisId ? true : false;
      return (
        <Link
          className={`icon-link ${edit ? "btn-orange" : "btn-green"}`}
          to={`/lot/report/${reportType}?id=${
            row.id
          }&reportId=${row.greenAnalysisId || -1}`}
        >
          {edit ? (
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

    case REPORT_TYPE.CUPPING:
      return (
        <Link
          className="icon-link btn-green"
          to={`/lot/report/${reportType}?id=${row.id}&reportId=-1`}
        >
          <Add16 /> Add
        </Link>
      );

    default:
      break;
  }
}
