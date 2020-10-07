import { Box, Checkbox, Input, Select, Stack } from "@chakra-ui/core";
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
  const [pendingReportOnly, setPendingReportOnly] = useState(true);
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    if (ccCodes.length) {
      const { success, data } = await axGetInspectionReportsByCCIds({
        ccCodes: ccCodes.toString(),
        limit,
        pendingReportOnly,
        firstName: query,
      });
      if (success) {
        setReports(data);
      }
    } else {
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [ccCodes, limit, query, pendingReportOnly]);

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

      <Stack mb={4} isInline={true} spacing={4}>
        <Input
          type="search"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          maxW="18rem"
          borderColor="gray.400"
        />
        <Select
          onChange={(e) => setLimit(Number(e.target.value))}
          maxW="10rem"
          borderColor="gray.400"
        >
          <option value={50} selected>
            50 Records
          </option>
          <option value={100}>100 Records</option>
        </Select>
        <Checkbox defaultIsChecked={true} onChange={(e) => setPendingReportOnly(e.target.checked)}>
          Pending Reports Only
        </Checkbox>
      </Stack>

      <Table data={reports} columns={inspectionReportColumns} />
    </div>
  );
}
