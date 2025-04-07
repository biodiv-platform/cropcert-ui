import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import dynamic from "next/dynamic";
import React from "react";

import BatchShowPanel from "./panel";
import SubAccordionPanel from "./sub-panel";

const FarmerMap = dynamic(
  () => import("@components/pages/farmer-member/map/geoJson-featureCollection-map"),
  { ssr: false }
);

export default function BatchInfo({ batch, geojsonData }) {
  const geojsonWithFeatColl = Array.isArray(geojsonData)
    ? {
        type: "FeatureCollection",
        features: geojsonData,
      }
    : geojsonData;
  const batchColumns = [
    {
      name: "#",
      selector: (row) => row["batchId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `${row.batchId}`,
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
    {
      name: "Note",
      selector: (row) => row["note"],
    },
  ];

  return (
    <BatchShowPanel icon="🧺" title="Batch(s)">
      <DataTable keyField="batchId" columns={batchColumns} noHeader={true} data={[batch]} />

      <Stack my={4}>
        <Text as={"b"} pl={2}>
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

      {geojsonWithFeatColl && (
        <Stack direction={"column"} gap={2} width={"full"} my={4} mb={8} height={"400px"}>
          <Box
            rounded="md"
            borderWidth={1}
            borderColor={"gray.200"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerMap geojson={geojsonWithFeatColl} setGeojson={null} mode={"view"} />
          </Box>
        </Stack>
      )}
    </BatchShowPanel>
  );
}
