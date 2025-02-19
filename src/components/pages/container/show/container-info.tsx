import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import ContainerCell from "@components/@core/table/container-cell";
import tooltipCell from "@components/@core/table/tooltip-cell";
import dynamic from "next/dynamic";
import React from "react";

import ContainerShowPanel from "./panel";
import SubAccordionPanel from "./sub-panel";

const MultiMarkerMap = dynamic(
  () =>
    import("@components/pages/farmer-member/list/modals/multi-marker-map/geojson-multi-marker-map"),
  { ssr: false }
);

export default function ContainerInfo({ container, geojsonData }) {
  const basicInfoHeader = [
    {
      name: "#",
      selector: (row) => row["containerId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => <ContainerCell {...row} />,
    },
    {
      name: "Name",
      selector: (row) => row["containerName"],
      width: "280px",
    },
    {
      name: "Type",
      selector: (row) => row["type"]?.toUpperCase(),
      maxWidth: "100px",
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
    },
    {
      name: "Container Status",
      selector: (row) => row["containerStatus"],
      cell: ({ containerStatus }) => <Badge>{containerStatus?.split("_").join(" ")}</Badge>,
    },
    {
      name: "Created At",
      selector: (row) => row["createdAt"],
      cell: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      name: "Note",
      selector: (row) => row["note"],
      cell: (row) => (row.note ? tooltipCell(row.note) : "N/A"),
    },
  ];

  return (
    <ContainerShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <DataTable keyField="_id" columns={basicInfoHeader} noHeader={true} data={[container]} />
      <Stack my={4}>
        <Text as={"b"} pl={2}>
          Parameters:
        </Text>
        <Box>
          {container.modalFieldCombined &&
            container.modalFieldCombined.map(
              (column, index) =>
                (column.columnStatus === "ADD" ||
                  column.columnStatus === "EDIT" ||
                  column.columnStatus === "DONE") && (
                  <SubAccordionPanel key={index} column={column} index={index} />
                )
            )}
        </Box>
      </Stack>

      {geojsonData && (
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
            <MultiMarkerMap geojsonData={geojsonData} />
          </Box>
        </Stack>
      )}
    </ContainerShowPanel>
  );
}
