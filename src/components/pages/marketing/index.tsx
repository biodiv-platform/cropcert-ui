import { EmailIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Checkbox, Spinner } from "@chakra-ui/react";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import PlainUnionSelect from "@components/@core/accesser/plain-union-select";
import { CoreGrid } from "@components/@core/layout";
import Table from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import { CC_EMAIL } from "@static/constants";
import React, { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import MarketingHeader from "./header";
import useMarketing from "./use-marketing";

export const columns = [
  {
    name: "Cooperative Name",
    selector: (row) => row.cooperativeName,
    width: "150px",
  },
  {
    name: "Weight",
    selector: (row) => row.highGradeWeight,
    width: "80px",
  },
  {
    name: "Quality Score",
    selector: (row) => row.qualityScores.toString() || "-",
    width: "110px",
  },
  {
    name: "Lot Name",
    selector: (row) => row.lotName,
    width: "240px",
  },
  {
    name: "Lot Id",
    selector: (row) => row.id,
    width: "100px",
    cell: (row) => `L-${row.id}`,
  },
  {
    name: "GRN",
    selector: (row) => row.grnNumber || "-",
  },
  {
    name: "Status",
    selector: (row) => row.lotStatus,
    cell: (row) => <Badge>{row.lotStatus}</Badge>,
  },
  {
    name: "Updated",
    selector: (row) => row.createdOn,
    maxWidth: "160px",
    cell: (row) => timeCell(row.createdOn),
    sortable: true,
  },
  {
    name: "Contact",
    sortable: true,
    width: "120px",
    cell: (r) => {
      const to = r.contact || CC_EMAIL;

      return (
        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<EmailIcon />}
          as="a"
          href={`mailto:${to}?subject=Inquiry on Lot ${r.lotName}&body=Hi ${r.manager},%0A%0A<your message>%0A%0ALot Information%0A%0ALot Name: ${r.lotName} (L-${r.id})%0ACooperative: ${r.cooperativeFullName} (${r.cooperativeName})%0AWeight: ${r.highGradeWeight}%0AStatus: ${r.lotStatus}`}
        >
          Inquire
        </Button>
      );
    },
  },
];

export default function MarketingPageComponent() {
  const { list, setCoCodes, loadMore, isLoading } = useMarketing();
  const [union, setUnion] = useState<any>();

  const [isFiltered, setIsFiltered] = useState(true);

  const dataList = useMemo(
    () => (isFiltered ? list.l.filter((r) => r.qualityScores?.[0] > 0) : list.l),
    [isFiltered, list]
  );

  return (
    <Box>
      <MarketingHeader />
      <style
        children={`body{ background-image:url(/assets/pattern-coffee.png); background-size: 150px}`}
      />

      <Box bg="white" p={4} border="1px solid" borderColor="gray.300" borderRadius="md" shadow="sm">
        <CoreGrid>
          <PlainUnionSelect onChange={setUnion} />
          <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />

          <Checkbox
            defaultIsChecked={true}
            onChange={(e) => setIsFiltered(e.target.checked)}
            mt={4}
          >
            with quality scores only
          </Checkbox>
        </CoreGrid>

        {isLoading ? (
          <Spinner />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadMore()}
            loader={<Spinner key="loader" />}
            hasMore={list.hasMore}
          >
            {dataList.length ? <Table data={dataList} columns={columns} /> : "No Lots Available"}
          </InfiniteScroll>
        )}
      </Box>
    </Box>
  );
}
