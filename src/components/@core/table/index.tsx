import { Box } from "@chakra-ui/core";
import React from "react";
import DataTable from "react-data-table-component";

import useActionProps from "./get-action-props";

const theme = {
  title: {
    height: 0,
  },
};

const Table = (props: any) =>
  props.data.length ? (
    <Box bg="white" border="1px solid" borderColor="gray.400" borderRadius="md">
      {props.data.length > 0 && <DataTable data={props.data} customTheme={theme} {...props} />}
    </Box>
  ) : null;

export { Table as default, useActionProps };
