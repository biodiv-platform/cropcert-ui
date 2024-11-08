import { Box } from "@chakra-ui/react";
import React from "react";
import DataTable from "react-data-table-component";

import useActionProps from "./get-action-props";

const Table = (props) =>
  props.data.length ? (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      className="white-box"
      id="scrollableDiv"
      overflow="auto"
      mb={4}
      ml={props?.ml}
    >
      {props.title && (
        <Box fontSize="md" px={3} pt={1} bg="blue.50" textAlign={"center"}>
          {props.title}
        </Box>
      )}
      {props.data.length > 0 && <DataTable striped={true} {...props} />}
    </Box>
  ) : null;

export { Table as default, useActionProps };
