import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import React from "react";

export default function SubAccordionPanel({ column, index }) {
  const subAccordianColumns = [
    {
      name: "Field Name",
      selector: (row) => row["label"],
    },
    {
      name: "Value",
      selector: (row) => row["value"],
    },
  ];

  const columnStatus = {
    ADD: (
      <Box
        color="blue.500"
        background={"blue.100"}
        px={1}
        borderRadius={4}
        borderColor={"blue.300"}
        borderWidth={1}
        fontSize={"sm"}
      >
        To be done
      </Box>
    ),
    EDIT: (
      <Box
        color="yellow.500"
        background={"yellow.100"}
        px={1}
        borderRadius={4}
        borderColor={"yellow.300"}
        borderWidth={1}
        fontSize={"sm"}
      >
        In Progress
      </Box>
    ),
    DONE: (
      <Box
        color="green.500"
        background={"green.100"}
        px={1}
        borderRadius={4}
        borderColor={"green.300"}
        borderWidth={1}
        fontSize={"sm"}
      >
        Finalized
      </Box>
    ),
  };
  return (
    <Accordion allowToggle key={index} mb={4}>
      <AccordionItem boxShadow="md" bg="gray.100" mb={2} mx={2} borderRadius="md" borderWidth={0}>
        <h2>
          <AccordionButton>
            <Box
              as="h4"
              flex="1"
              textAlign="left"
              display={"flex"}
              gap={2}
              alignItems={"center"}
              justifyContent={"space-between"}
              pr={2}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Text>{column.columnName}</Text>
                <Text fontSize="xs" color={"gray.500"}>
                  {new Date(column.lastUpdatedAt).toLocaleString()}
                </Text>
              </Box>
              <Box>{columnStatus[column.columnStatus]}</Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} bg="white" p={6}>
          <DataTable
            keyField={column.modalFieldId}
            columns={subAccordianColumns}
            noHeader={true}
            data={column.fields.filter((f) => f.fieldType === "input")}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
