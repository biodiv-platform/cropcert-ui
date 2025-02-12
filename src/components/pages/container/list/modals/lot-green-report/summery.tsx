import DataTable from "@components/@core/table";
import React, { useEffect, useState } from "react";

export default function GreenReportSummery({ values }) {
  const [QGData, setQGData] = useState([] as any);
  const GRADE_KEYS = ["gradeAA", "gradeA", "gradeB", "gradeAB", "gradeC", "gradePB", "gradeTriage"];

  const qualityGradingSummeryHeader = GRADE_KEYS.map((k) => ({
    name: k.replace("grade", "Grade "),
    selector: (row) => row[k],
  }));

  useEffect(() => {
    const total = GRADE_KEYS.reduce((acc, k) => acc + values[k], 0);
    const gmsRow = GRADE_KEYS.reduce((o, k) => ({ ...o, [k]: `${values[k]}g` }), {});
    const persentageRow = GRADE_KEYS.reduce(
      (o, k) => ({ ...o, [k]: `${((values[k] * 100) / total).toFixed(2)}%` }),
      {}
    );
    setQGData([gmsRow, persentageRow]);
  }, [values]);

  return (
    <DataTable
      keyField="name"
      columns={qualityGradingSummeryHeader}
      noHeader={true}
      data={QGData}
    />
  );
}
