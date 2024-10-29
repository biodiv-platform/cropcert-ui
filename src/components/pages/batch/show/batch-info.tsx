import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import dynamic from "next/dynamic";
import React from "react";

import BatchShowPanel from "./panel";
import SubAccordionPanel from "./sub-panel";

const MultiMarkerMap = dynamic(
  () =>
    import("@components/pages/farmer-member/list/modals/multi-marker-map/geojson-multi-marker-map"),
  { ssr: false }
);

export default function BatchInfo({ batch, geojsonData }) {
  const batchColumns = [
    {
      name: "#",
      selector: (row) => row["batchId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `B-${row.batchId}`,
    },
    {
      name: "Name",
      selector: (row) => row["batchName"],
      width: "280px",
    },
    {
      name: "Type",
      selector: (row) => row["type"],
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: (row) => row["lastUpdatedAt"],
      maxWidth: "150px",
      cell: (row) => timeCell(row.lastUpdatedAt),
      sortable: true,
    },
    {
      name: "Lot ID",
      selector: (row) => row["lotId"],
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
    },
  ];

  return (
    <BatchShowPanel icon="🧺" title="Batch(s)">
      <DataTable keyField="batchId" columns={batchColumns} noHeader={true} data={[batch]} />

      <Stack my={4}>
        <Text variant={"title"} as={"b"} pl={2}>
          Parameters:
        </Text>
        <Box>
          {batch.modalFieldCombined &&
            batch.modalFieldCombined.map(
              (column, index) =>
                column.columnStatus === "ADD" ||
                column.columnStatus === "EDIT" ||
                column.columnStatus === "DONE" ||
                (column.columnStatus === "NOTAPPLICABLE" && (
                  <SubAccordionPanel key={index} column={column} index={index} />
                ))
            )}
        </Box>
      </Stack>

      {geojsonData && (
        <Stack direction={"column"} spacing={2} width={"full"} my={4} mb={8} height={"400px"}>
          <Box
            rounded="md"
            borderWidth={1}
            borderColor={"gray.200"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <MultiMarkerMap geojsonData={geojsonData} />
          </Box>
        </Stack>
      )}
    </BatchShowPanel>
  );
}
