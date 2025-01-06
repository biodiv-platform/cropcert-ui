import { Box, Input, Stack } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import Container from "@components/@core/container";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axGetInspectionReportsByCCIds } from "@services/certification.service";
import { ROLES } from "@static/constants";
import React, { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

import { inspectionReportColumns } from "./data";

export default function InspectionReportListComponent() {
  const [co, setCo] = useState({} as any);
  const [ccs, setCCs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const [limit, setLimit] = useState(50);
  const [pendingReportOnly, setPendingReportOnly] = useState(true);
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState<any>([]);

  const fetchReports = async () => {
    if (ccCodes.length) {
      const { success, data } = await axGetInspectionReportsByCCIds({
        ccCodes: ccCodes.toString(),
        limit,
        pendingReportOnly,
        offset: 0,
        firstName: query || undefined,
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
    <Container>
      <PageHeading>📝 ICS Reports</PageHeading>
      <CoreGrid>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={() => setReports([])} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <Stack mb={4} direction={"row"} gap={4}>
        <Input
          type="search"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          maxW="18rem"
          borderColor="gray.300"
        />
        <NativeSelectRoot>
          <NativeSelectField
            onChange={(e) => setLimit(Number(e.target.value))}
            maxW="10rem"
            borderColor="gray.300"
          >
            <option value={50} selected>
              50 Records
            </option>
            <option value={100}>100 Records</option>
          </NativeSelectField>
        </NativeSelectRoot>
        <Checkbox defaultChecked={true} onCheckedChange={(e) => setPendingReportOnly(!!e.checked)}>
          Pending Reports Only
        </Checkbox>
      </Stack>

      <Table data={reports} columns={inspectionReportColumns} />
    </Container>
  );
}
