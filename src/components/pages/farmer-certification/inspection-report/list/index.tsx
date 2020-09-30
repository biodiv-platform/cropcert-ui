import { Box } from "@chakra-ui/core";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetInspectionReportsByCCIds } from "@services/certification.service";
import { ROLES } from "@static/constants";
import React, { useEffect, useState } from "react";

import { inspectionReportColumns } from "./data";

export default function InspectionReportListComponent() {
  const [co, setCo] = useState({} as any);
  const [ccs, setCCs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState([]);
  const [limit, setLimit] = useState(50);
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    if (ccCodes.length) {
      const { success, data } = await axGetInspectionReportsByCCIds(ccCodes, limit);
      if (success) {
        setReports(data);
      }
    } else {
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [ccCodes]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  return (
    <div>
      <PageHeading>📝 ICS Reports</PageHeading>
      <CoreGrid>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={() => setReports([])} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <Table data={reports} columns={inspectionReportColumns} />
    </div>
  );
}
