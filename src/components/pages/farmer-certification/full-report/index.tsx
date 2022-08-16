import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Spinner } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import Container from "@components/@core/container";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axListAllReports } from "@services/lot.service";
import { ROLES } from "@static/constants";
import { formattedTimeStamp, utc2local } from "@utils/basic.util";
import flat from "flat";
import j2x from "json-as-xlsx";
import React, { useEffect, useMemo, useState } from "react";

import { columns } from "./data";

export default function FullReportComponent() {
  const [list, setList] = useState([]);
  const [union, setUnion] = useState<any>();
  const [coCodes, setCoCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(true);
  const [filtered, setFiltered] = useState([]);

  const dataList = useMemo(() => (isFiltered ? filtered : list), [filtered, list]);

  const downloadXLS = () => {
    j2x([{ columns, content: dataList }], {
      fileName: `${formattedTimeStamp()}`,
    });
  };

  const getData = async () => {
    setIsLoading(true);
    const { success, data } = await axListAllReports(coCodes);
    if (success) {
      const flattned = data.map((d) => {
        const o = Object.entries(flat(d, { maxDepth: 2 }));
        return Object.fromEntries(
          o.map(([key, value]) => {
            let newValue = value;
            const newKey = key.replace(".", "_");

            if (value === null) {
              return [newKey, ""];
            }

            if (key.toLowerCase().includes("date")) {
              newValue = formattedTimeStamp(utc2local(value));
            }

            if (typeof value === "object") {
              newValue = JSON.stringify(value, null, 2);
            }

            if (typeof value === "boolean") {
              newValue = value ? "Yes" : "No";
            }

            return [newKey, newValue];
          })
        );
      });
      setList(flattned);
      setFiltered(flattned.filter((r) => r.inspectorName));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (coCodes.length > 0) {
      getData();
    }
  }, [coCodes]);

  return (
    <Container>
      <PageHeading
        actions={
          <Button colorScheme="blue" leftIcon={<DownloadIcon />} onClick={downloadXLS}>
            Download XLS
          </Button>
        }
      >
        📑 Report Generation
      </PageHeading>

      <CoreGrid>
        <Accesser toRole={ROLES.UNION} onChange={setUnion} onTouch={() => null} />
        <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />

        <Checkbox defaultChecked={true} onChange={(e) => setIsFiltered(e.target.checked)} mt={4}>
          with reports only
        </Checkbox>
      </CoreGrid>

      {isLoading ? (
        <Spinner />
      ) : dataList.length ? (
        <Table data={dataList} columns={columns} />
      ) : (
        "No farmers available"
      )}
    </Container>
  );
}
