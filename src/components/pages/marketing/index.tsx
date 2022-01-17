import { EmailIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Spinner } from "@chakra-ui/react";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import PlainUnionSelect from "@components/@core/accesser/plain-union-select";
import { CoreGrid } from "@components/@core/layout";
import Table from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import MarketingHeader from "./header";
import useMarketing from "./use-marketing";

export const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "100px",
    cell: (row) => `L-${row.id}`,
  },
  {
    name: "Name",
    selector: (row) => row.lotName,
    width: "280px",
  },
  {
    name: "Weight",
    selector: (row) => row.highGradeWeight,
  },
  {
    name: "Status",
    selector: (row) => row.lotStatus,
    cell: (row) => <Badge>{row.lotStatus}</Badge>,
  },
  {
    name: "Quality Score",
    selector: (row) => row.qualityScores,
  },
  {
    name: "GRN",
    selector: (row) => row.grnNumber,
  },
  {
    name: "Last Updated",
    selector: (row) => row.createdOn,
    maxWidth: "150px",
    cell: (row) => timeCell(row.createdOn),
    sortable: true,
  },
  {
    name: "Contact",
    sortable: true,
    width: "120px",
    cell: (row) => (
      <Button
        size="sm"
        colorScheme="blue"
        leftIcon={<EmailIcon />}
        as="a"
        href={`mailto:contact@rwenzorimountaincoffee.org?subject=Inquiry on Lot ${row.lotName}`}
      >
        Inquire
      </Button>
    ),
  },
];

export default function MarketingPageComponent() {
  const { list, setCoCodes, loadMore, isLoading } = useMarketing();
  const [union, setUnion] = useState<any>();

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
            {list.l.length ? <Table data={list.l} columns={columns} /> : "No Lots Available"}
          </InfiniteScroll>
        )}
      </Box>
    </Box>
  );
}
