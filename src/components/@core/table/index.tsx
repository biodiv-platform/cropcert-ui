import { Box } from "@chakra-ui/react";
import React from "react";
import DataTable from "react-data-table-component";

import Footer from "../container/footer";
import useActionProps from "./get-action-props";
import ManageColumnDropdown from "./manage-column-dropdown";

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
      ml={props?.ml}
      position={"relative"}
    >
      {props.title && (
        <Box fontSize="md" px={3} pt={1} bg="blue.50" textAlign={"center"}>
          {props.title}
        </Box>
      )}
      {props.data.length > 0 && <DataTable striped={true} {...props} />}

      {props.showManageColumnDropdown && (
        <ManageColumnDropdown
          columnList={props.columns}
          allColumns={props.allColumns}
          setVisibleColumns={props.setVisibleColumns}
        />
      )}
      {props.showFooter && <Footer />}
    </Box>
  ) : null;

export { Table as default, useActionProps };
